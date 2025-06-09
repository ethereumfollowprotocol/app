'use server'

import { cookies } from 'next/headers'
import webpush, { type PushSubscription as SerializablePushSubscription } from 'web-push'
import redisClient from '#/lib/redis'

const SUBSCRIPTION_COOKIE = 'push_subscription_id'
const SUBSCRIPTION_PREFIX = 'push:subscription:'
const ALL_SUBSCRIPTIONS_KEY = 'push:all_subscriptions'
const WEBSOCKET_ADDRESS_PREFIX = 'websocket:address:'
const ADDRESS_EXPIRATION_SECONDS = 60 * 60 * 24 * 30 // 30 days

if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.error('ERROR: VAPID keys missing. Set NEXT_PUBLIC_VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY env vars.')
} else {
  try {
    const vapidSubject = 'https://efp.app'
    webpush.setVapidDetails(vapidSubject, process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY)
    console.log('VAPID details set successfully.')
  } catch (error) {
    console.error('Error setting VAPID details:', error)
  }
}

interface ActionResult {
  success: boolean
  error?: string
}

interface SubscribeResult extends ActionResult {
  subscriptionId?: string
}

export async function subscribeUser(sub: SerializablePushSubscription): Promise<SubscribeResult> {
  if (!sub || !sub.endpoint) {
    console.error('Invalid subscription object received.')
    return { success: false, error: 'Invalid subscription object' }
  }

  try {
    const subscriptionId = crypto.randomUUID()
    const subscriptionKey = `${SUBSCRIPTION_PREFIX}${subscriptionId}`

    // Store the subscription
    await redisClient.set(subscriptionKey, JSON.stringify(sub))
    await redisClient.sadd(ALL_SUBSCRIPTIONS_KEY, subscriptionId)

    // Store the ID in a cookie
    const cookieStore = await cookies()
    cookieStore.set(SUBSCRIPTION_COOKIE, subscriptionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
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

export async function getSubscriptionForCurrentUser(): Promise<SerializablePushSubscription | null> {
  try {
    const cookieStore = await cookies()
    const subscriptionId = cookieStore.get(SUBSCRIPTION_COOKIE)?.value

    if (!subscriptionId) {
      console.log('No subscription found.')
      return null
    }

    const subscriptionKey = `${SUBSCRIPTION_PREFIX}${subscriptionId}`
    const subscriptionJson = await redisClient.get(subscriptionKey)

    if (!subscriptionJson) {
      console.log('Subscription not found in Redis for ID:', subscriptionId)

      // Clean up cookie and set if subscription doesn't exist
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

export async function unsubscribeUser(): Promise<ActionResult> {
  try {
    const cookieStore = await cookies()
    const subscriptionId = cookieStore.get(SUBSCRIPTION_COOKIE)?.value

    if (!subscriptionId) {
      console.log('No subscription cookie found for unsubscribe')
      return { success: true }
    }

    const subscriptionKey = `${SUBSCRIPTION_PREFIX}${subscriptionId}`
    const addressKey = `${WEBSOCKET_ADDRESS_PREFIX}${subscriptionId}`

    // Delete subscription, address, and remove from set
    const delSubPromise = redisClient.del(subscriptionKey)
    const delAddrPromise = redisClient.del(addressKey) // Also delete the address
    const sremPromise = redisClient.srem(ALL_SUBSCRIPTIONS_KEY, subscriptionId)

    await Promise.all([delSubPromise, delAddrPromise, sremPromise])

    // Remove the cookie
    cookieStore.delete(SUBSCRIPTION_COOKIE)

    console.log(`Unsubscribed ${subscriptionId}`)
    return { success: true }
  } catch (error) {
    console.error('Error unsubscribing:', error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function sendNotification(
  title: string,
  message: string,
  userAvatar?: string | null
): Promise<ActionResult> {
  // Using a type assertion for the subscription object from web-push
  let typedSub: webpush.PushSubscription | null = null
  try {
    const currentUserSub = await getSubscriptionForCurrentUser()

    if (currentUserSub) {
      typedSub = currentUserSub as webpush.PushSubscription

      const payload = JSON.stringify({
        title: title,
        body: message,
        icon: '/assets/icons/icon-192x192.png',
        badge: userAvatar,
      })

      await webpush.sendNotification(typedSub, payload)
      console.log(`Notification sent to subscription associated with cookie.`)
      return { success: true }
    } else {
      console.log('No current user subscription found to send notification.')
      return { success: false, error: 'No subscription found for current user' }
    }
  } catch (error: any) {
    console.error('Failed to send notification:', error)
    // Handle expired subscription (410 Gone or 404 Not Found)
    if (typedSub && (error.statusCode === 410 || error.statusCode === 404)) {
      console.log(
        `Subscription associated with cookie (${typedSub.endpoint.substring(0, 30)}...) appears expired or invalid. Removing.`
      )

      // Attempt to clean up the expired subscription
      await unsubscribeUser()
      return { success: false, error: `Subscription expired or invalid (Code: ${error.statusCode})` }
    }

    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function storeAddressForSubscription(accountData: {
  address: string
  name?: string | null
  avatar?: string | null
}): Promise<ActionResult> {
  if (!accountData || typeof accountData.address !== 'string' || !accountData.address) {
    return { success: false, error: 'Invalid account data provided' }
  }
  try {
    const cookieStore = await cookies()
    const subscriptionId = cookieStore.get(SUBSCRIPTION_COOKIE)?.value

    if (!subscriptionId) {
      console.warn('Cannot store account data: No subscription cookie found.')
      return { success: false, error: 'No active subscription found to associate account data with' }
    }

    // Optional: Verify the subscription still exists in Redis before storing address?
    // const subExists = await redisClient.exists(`${SUBSCRIPTION_PREFIX}${subscriptionId}`);
    // if (!subExists) {
    //    console.warn(`Subscription ${subscriptionId} not found in Redis. Cannot store address.`);
    //    cookieStore.delete(SUBSCRIPTION_COOKIE); // Clean up bad cookie
    //    return { success: false, error: 'Subscription not found' };
    // }

    const addressKey = `${WEBSOCKET_ADDRESS_PREFIX}${subscriptionId}`
    // Store the entire account object as a JSON string
    await redisClient.set(addressKey, JSON.stringify(accountData), 'EX', ADDRESS_EXPIRATION_SECONDS)

    console.log(`Stored WebSocket account data for subscription ${subscriptionId}:`, accountData)
    return { success: true }
  } catch (error) {
    console.error('Failed to store account data for subscription:', error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function getAddressForSubscription(): Promise<{
  address: string
  name?: string | null
  avatar?: string | null
} | null> {
  try {
    const cookieStore = await cookies()
    const subscriptionId = cookieStore.get(SUBSCRIPTION_COOKIE)?.value

    if (!subscriptionId) {
      console.log('No subscription cookie found for getting account data')
      return null
    }

    const addressKey = `${WEBSOCKET_ADDRESS_PREFIX}${subscriptionId}`
    const storedDataJson = await redisClient.get(addressKey)

    if (!storedDataJson) {
      console.log('No account data found for subscription ID:', subscriptionId)
      return null
    }

    // Parse the JSON string back into an object
    const storedData = JSON.parse(storedDataJson) as {
      address: string
      name?: string | null
      avatar?: string | null
    }
    return storedData
  } catch (error) {
    console.error('Error getting account data for subscription:', error)
    // If parsing fails or any other error, return null
    return null
  }
}
