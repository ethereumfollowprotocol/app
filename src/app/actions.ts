'use server'

import { cookies } from 'next/headers'
import webpush, {
  type PushSubscription, // Use native type
  type PushSubscription as SerializablePushSubscription, // Keep alias if used elsewhere
} from 'web-push'
import redisClient from '#/lib/redis' // Assuming ioredis client

// --- Constants ---
const SUBSCRIPTION_COOKIE = 'push_subscription_id'
const SUBSCRIPTION_PREFIX = 'push:subscription:' // Key -> Subscription JSON String
const ALL_SUBSCRIPTIONS_KEY = 'push:all_subscriptions' // Set -> {subId1, subId2}
// --- Renamed/New Constants ---
const ACCOUNT_DATA_PREFIX = 'account:data:' // Key -> AccountData JSON String (e.g., account:data:subId1 -> {"address":"0x123...", "name": "nick", ...})
const SUBS_BY_ADDRESS_PREFIX = 'address:subscriptions:' // Key -> Set of Sub IDs (e.g., address:subscriptions:0x123... -> {subId1, subId5})
const ACCOUNT_DATA_EXPIRATION_SECONDS = 60 * 60 * 24 * 30 // 30 days (align with subscription?)
const ADDRESS_INDEX_EXPIRATION_SECONDS = 60 * 60 * 24 * 35 // Slightly longer than account data?

// --- VAPID Setup (keep existing) ---
if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.error('ERROR: VAPID keys missing.')
} else {
  try {
    const vapidSubject = 'https://efp.app' // Keep your subject
    webpush.setVapidDetails(vapidSubject, process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY)
    console.log('VAPID details set successfully.')
  } catch (error) {
    console.error('Error setting VAPID details:', error)
  }
}

// --- Types ---
interface ActionResult {
  success: boolean
  error?: string
}
interface SubscribeResult extends ActionResult {
  subscriptionId?: string
}
// Your Account Data structure
interface AccountData {
  address: string
  name?: string | null
  avatar?: string | null
}
// Define the structure for the push payload, based on your SW's needs
interface PushPayload {
  title: string // e.g., "New EFP Update"
  body: string // e.g., "nick.eth followed you"
  badge?: string | null // Use avatar URL here
  data: {
    address: string // The address initiating the action (for click handler)
    [key: string]: any // Allow other data if needed by SW later
  }
}

// --- Refactored Unsubscribe Logic (Updated for Address Index) ---
async function removeSubscriptionData(subscriptionId: string): Promise<void> {
  if (!subscriptionId) return
  console.log(`Attempting to remove data for subscription ${subscriptionId}`)
  try {
    const subscriptionKey = `${SUBSCRIPTION_PREFIX}${subscriptionId}`
    const accountDataKey = `${ACCOUNT_DATA_PREFIX}${subscriptionId}` // Use new prefix

    // 1. Get the account data associated with this subscription (if any)
    const accountDataJson = await redisClient.get(accountDataKey)
    const accountData = accountDataJson ? (JSON.parse(accountDataJson) as AccountData) : null
    const lowerCaseAddress = accountData?.address?.toLowerCase()

    // 2. Prepare deletion promises
    const promises: Promise<any>[] = [
      redisClient.del(subscriptionKey),
      redisClient.del(accountDataKey), // Delete account data too
      redisClient.srem(ALL_SUBSCRIPTIONS_KEY, subscriptionId),
    ]

    // 3. If an address was associated, remove subId from the address index set
    if (lowerCaseAddress) {
      const addressIndexKey = `${SUBS_BY_ADDRESS_PREFIX}${lowerCaseAddress}`
      console.log(`Removing ${subscriptionId} from address index ${addressIndexKey}`)
      promises.push(redisClient.srem(addressIndexKey, subscriptionId))
    }

    await Promise.all(promises)
    console.log(`Successfully removed data for subscription ${subscriptionId}.`)
  } catch (error) {
    console.error(`Error removing data for subscription ${subscriptionId}:`, error)
  }
}

// --- Core Push Sending Logic (sendPushToOne remains the same) ---
async function sendPushToOne(
  subscription: PushSubscription,
  payload: string,
  subscriptionIdForCleanup: string
): Promise<ActionResult> {
  // ... (Implementation from previous answer is fine) ...
  try {
    await webpush.sendNotification(subscription, payload)
    return { success: true }
  } catch (error: any) {
    console.error(
      `Failed sending push to endpoint associated with ${subscriptionIdForCleanup}:`,
      error.statusCode || error
    )
    if (error.statusCode === 410 || error.statusCode === 404) {
      console.log(`Subscription ${subscriptionIdForCleanup} is invalid or expired. Removing.`)
      await removeSubscriptionData(subscriptionIdForCleanup)
      return { success: false, error: `Subscription expired or invalid (Code: ${error.statusCode})` }
    }
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

// --- New Server Actions for Triggering Push ---
export async function triggerPushNotificationById(
  subscriptionId: string,
  payloadData: PushPayload
): Promise<ActionResult> {
  // ... (Implementation from previous answer is fine) ...
  if (!subscriptionId) return { success: false, error: 'Missing subscriptionId' }
  if (!payloadData) return { success: false, error: 'Missing payloadData' }
  try {
    const subscriptionKey = `${SUBSCRIPTION_PREFIX}${subscriptionId}`
    const subscriptionJson = await redisClient.get(subscriptionKey)
    if (!subscriptionJson) {
      console.log(`triggerPushNotificationById: Subscription not found in Redis for ID: ${subscriptionId}`)
      await redisClient.srem(ALL_SUBSCRIPTIONS_KEY, subscriptionId) // Clean up set
      return { success: false, error: 'Subscription not found' }
    }
    const subscription = JSON.parse(subscriptionJson) as PushSubscription
    const payload = JSON.stringify(payloadData)
    return await sendPushToOne(subscription, payload, subscriptionId)
  } catch (error) {
    console.error(`Error triggering push for subscription ${subscriptionId}:`, error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function triggerPushNotificationToAll(
  payloadData: PushPayload
): Promise<{ total: number; successes: number; failures: number; errors: any[] }> {
  // ... (Implementation from previous answer is fine, using sendPushToOne) ...
  if (!payloadData) throw new Error('Missing payloadData')
  let successes = 0
  let failures = 0
  const errors: any[] = []
  let subscriptionIds: string[] = []
  try {
    subscriptionIds = await redisClient.smembers(ALL_SUBSCRIPTIONS_KEY)
    if (!subscriptionIds || subscriptionIds.length === 0) {
      console.log('triggerPushNotificationToAll: No subscriptions found.')
      return { total: 0, successes: 0, failures: 0, errors: [] }
    }
    const payload = JSON.stringify(payloadData)
    const sendPromises: Promise<ActionResult>[] = []
    for (const id of subscriptionIds) {
      const subJson = await redisClient.get(`${SUBSCRIPTION_PREFIX}${id}`)
      if (subJson) {
        try {
          const subscription = JSON.parse(subJson) as PushSubscription
          const sendPromise = sendPushToOne(subscription, payload, id).then((result) => {
            if (result.success) successes++
            else failures++
            if (result.error) errors.push({ id, error: result.error })
            return result
          })
          sendPromises.push(sendPromise)
        } catch (parseError) {
          console.error(`Error parsing subscription ${id}:`, parseError)
          failures++
          errors.push({ id, error: 'Parse error' })
          await removeSubscriptionData(id)
        }
      } else {
        console.warn(`Sub ID ${id} in set but not in Redis key. Removing.`)
        await redisClient.srem(ALL_SUBSCRIPTIONS_KEY, id)
        failures++
        errors.push({ id, error: 'Subscription data missing' })
      }
    }
    await Promise.all(sendPromises)
    console.log(`Push broadcast results: Total=${subscriptionIds.length}, Successes=${successes}, Failures=${failures}`)
    return { total: subscriptionIds.length, successes, failures, errors }
  } catch (error) {
    console.error('Error during triggerPushNotificationToAll:', error)
    return { total: subscriptionIds.length, successes, failures, errors: [...errors, { generalError: String(error) }] }
  }
}

// --- Existing Functions (Modified / Kept) ---

// subscribeUser remains the same
export async function subscribeUser(sub: SerializablePushSubscription): Promise<SubscribeResult> {
  // ... (Implementation from your code is fine) ...
  if (!sub || !sub.endpoint) return { success: false, error: 'Invalid subscription object' }
  try {
    const subscriptionId = crypto.randomUUID()
    const subscriptionKey = `${SUBSCRIPTION_PREFIX}${subscriptionId}`
    await redisClient.set(subscriptionKey, JSON.stringify(sub))
    await redisClient.sadd(ALL_SUBSCRIPTIONS_KEY, subscriptionId)
    const cookieStore = await cookies()
    cookieStore.set(SUBSCRIPTION_COOKIE, subscriptionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
    })
    console.log(`Subscription ${subscriptionId} saved.`)
    return { success: true, subscriptionId }
  } catch (error) {
    console.error('Failed to save subscription:', error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

// getSubscriptionForCurrentUser remains the same
export async function getSubscriptionForCurrentUser(): Promise<SerializablePushSubscription | null> {
  // ... (Implementation from your code is fine, includes cleanup) ...
  try {
    const cookieStore = await cookies()
    const subscriptionId = cookieStore.get(SUBSCRIPTION_COOKIE)?.value
    if (!subscriptionId) return null
    const subscriptionKey = `${SUBSCRIPTION_PREFIX}${subscriptionId}`
    const subscriptionJson = await redisClient.get(subscriptionKey)
    if (!subscriptionJson) {
      console.log('Stale subscription cookie found, cleaning up.')
      cookieStore.delete(SUBSCRIPTION_COOKIE)
      await redisClient.srem(ALL_SUBSCRIPTIONS_KEY, subscriptionId)
      return null
    }
    return JSON.parse(subscriptionJson) as SerializablePushSubscription
  } catch (error) {
    console.error('Error getting subscription for current user:', error)
    return null
  }
}

// unsubscribeUser uses removeSubscriptionData
export async function unsubscribeUser(): Promise<ActionResult> {
  // ... (Implementation from previous answer using removeSubscriptionData is fine) ...
  try {
    const cookieStore = await cookies()
    const subscriptionId = cookieStore.get(SUBSCRIPTION_COOKIE)?.value
    if (!subscriptionId) {
      console.log('No subscription cookie for unsubscribe.')
      return { success: true }
    }
    await removeSubscriptionData(subscriptionId)
    cookieStore.delete(SUBSCRIPTION_COOKIE)
    console.log(`Unsubscribed ${subscriptionId} based on cookie.`)
    return { success: true }
  } catch (error) {
    console.error('Error unsubscribing:', error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

// sendNotification - Keep or remove based on whether UI needs to trigger pushes
export async function sendNotification(
  title: string,
  message: string,
  userAvatar?: string | null
): Promise<ActionResult> {
  // ... (Implementation from your code is fine, maybe add warning) ...
  console.warn(
    "FYI: 'sendNotification' action sends only based on cookie. Use 'triggerPushNotificationById' or 'triggerPushNotificationToAll' for backend events."
  )
  const currentUserSub = await getSubscriptionForCurrentUser()
  if (!currentUserSub) return { success: false, error: 'No subscription found for current user' }
  const payloadData: PushPayload = {
    title: title,
    body: message,
    badge: userAvatar, // Use badge for avatar
    data: { address: 'N/A' }, // Need a way to know sender address here if needed
  }
  const cookieStore = await cookies()
  const subscriptionId = cookieStore.get(SUBSCRIPTION_COOKIE)?.value
  if (!subscriptionId) return { success: false, error: 'Subscription ID cookie missing' }
  return await sendPushToOne(currentUserSub as PushSubscription, JSON.stringify(payloadData), subscriptionId)
}

// --- Updated Store/Get Account Data ---
// Renamed and updated to manage the address index set
export async function storeAccountDataForSubscription(accountData: AccountData): Promise<ActionResult> {
  if (!accountData?.address) {
    return { success: false, error: 'Invalid account data provided (missing address)' }
  }
  const lowerCaseAddress = accountData.address.toLowerCase() // Normalize address

  try {
    const cookieStore = await cookies()
    const subscriptionId = cookieStore.get(SUBSCRIPTION_COOKIE)?.value
    if (!subscriptionId) {
      console.warn('Cannot store account data: No subscription cookie found.')
      return { success: false, error: 'No active subscription found' }
    }

    const accountDataKey = `${ACCOUNT_DATA_PREFIX}${subscriptionId}`
    const addressIndexKey = `${SUBS_BY_ADDRESS_PREFIX}${lowerCaseAddress}`

    // Handle potential address change for this subscription ID
    const oldAccountDataJson = await redisClient.get(accountDataKey)
    if (oldAccountDataJson) {
      try {
        const oldAccountData = JSON.parse(oldAccountDataJson) as AccountData
        const oldLowerCaseAddress = oldAccountData?.address?.toLowerCase()
        if (oldLowerCaseAddress && oldLowerCaseAddress !== lowerCaseAddress) {
          const oldAddressIndexKey = `${SUBS_BY_ADDRESS_PREFIX}${oldLowerCaseAddress}`
          console.log(`Account address changed for ${subscriptionId}. Removing from old index: ${oldAddressIndexKey}`)
          await redisClient.srem(oldAddressIndexKey, subscriptionId)
        }
      } catch (e) {
        console.error('Error processing old account data', e)
      }
    }

    // Store new account data JSON
    await redisClient.set(accountDataKey, JSON.stringify(accountData), 'EX', ACCOUNT_DATA_EXPIRATION_SECONDS)

    // Add subscription ID to the new address index set
    await redisClient.sadd(addressIndexKey, subscriptionId)
    await redisClient.expire(addressIndexKey, ADDRESS_INDEX_EXPIRATION_SECONDS)

    console.log(`Stored/Updated account data for sub ${subscriptionId}: ${accountData.address}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to store account data for subscription:', error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

// Renamed function - may not be needed by client/SW now, but useful internally/backend
export async function getAccountDataForSubscription(): Promise<AccountData | null> {
  try {
    const cookieStore = await cookies()
    const subscriptionId = cookieStore.get(SUBSCRIPTION_COOKIE)?.value
    if (!subscriptionId) return null
    const accountDataKey = `${ACCOUNT_DATA_PREFIX}${subscriptionId}`
    const storedDataJson = await redisClient.get(accountDataKey)
    if (!storedDataJson) return null
    return JSON.parse(storedDataJson) as AccountData
  } catch (error) {
    console.error('Error getting account data for subscription:', error)
    return null
  }
}
