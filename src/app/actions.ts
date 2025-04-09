'use server'

import { cookies } from 'next/headers'
import webpush, { type PushSubscription as SerializablePushSubscription } from 'web-push'

// Key for storing subscription IDs in cookies
const SUBSCRIPTION_COOKIE = 'push_subscription_id'

// FIXME: In-memory storage is still used here, but we're adding cookie persistence
// In a production app, replace this with a database or KV store
const subscriptions = new Map<string, SerializablePushSubscription>()

// Ensure VAPID keys are configured in your environment variables
if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.error('ERROR: VAPID keys missing. Set NEXT_PUBLIC_VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY env vars.')
  console.log('You can generate keys using: npx web-push generate-vapid-keys')
} else {
  try {
    webpush.setVapidDetails(
      'https://efp.app', // <<<--- REPLACE THIS WITH YOUR EMAIL
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    )
    console.log('VAPID details set successfully.')
  } catch (error) {
    console.error('Error setting VAPID details:', error)
  }
}

export async function subscribeUser(sub: SerializablePushSubscription) {
  if (!sub || !sub.endpoint) {
    console.error('Invalid subscription object received.')
    return { success: false, error: 'Invalid subscription object' }
  }

  try {
    // Generate a unique ID for this subscription
    const subscriptionId = crypto.randomUUID()

    console.log('Saving subscription:', sub.endpoint, 'with ID:', subscriptionId)

    // Store the subscription with its ID as the key
    subscriptions.set(subscriptionId, sub)
    // Note: In production, store this in a database or KV store instead
    // await db.pushSubscriptions.upsert({
    //   where: { id: subscriptionId },
    //   update: { endpoint: sub.endpoint, keys: sub.keys },
    //   create: { id: subscriptionId, endpoint: sub.endpoint, keys: sub.keys }
    // })

    // Store the ID in a cookie - using cookies() correctly
    const cookieStore = await cookies()
    cookieStore.set(SUBSCRIPTION_COOKIE, subscriptionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    return { success: true, subscriptionId }
  } catch (error) {
    console.error('Failed to save subscription:', error)
    return { success: false, error: String(error) }
  }
}

export async function getSubscriptionForCurrentUser() {
  try {
    const cookieStore = await cookies()
    const subscriptionId = cookieStore.get(SUBSCRIPTION_COOKIE)?.value

    if (!subscriptionId) {
      console.log('No subscription cookie found')
      return null
    }

    console.log('Found subscription ID in cookie:', subscriptionId)

    // Retrieve subscription by ID
    const subscription = subscriptions.get(subscriptionId)
    // In production, retrieve from database:
    // const subscription = await db.pushSubscriptions.findUnique({ where: { id: subscriptionId } })

    if (!subscription) {
      console.log('Subscription not found for ID:', subscriptionId)
      // Clean up cookie since subscription doesn't exist
      cookieStore.delete(SUBSCRIPTION_COOKIE)
      return null
    }

    return subscription
  } catch (error) {
    console.error('Error getting subscription for current user:', error)
    return null
  }
}

export async function unsubscribeUser() {
  try {
    const cookieStore = await cookies()
    const subscriptionId = cookieStore.get(SUBSCRIPTION_COOKIE)?.value

    if (!subscriptionId) {
      console.log('No subscription cookie found for unsubscribe')
      return { success: false, error: 'No subscription found' }
    }

    console.log('Unsubscribing ID:', subscriptionId)

    // Delete the subscription
    const deleted = subscriptions.delete(subscriptionId)
    // In production:
    // await db.pushSubscriptions.delete({ where: { id: subscriptionId } })

    // Remove the cookie
    cookieStore.delete(SUBSCRIPTION_COOKIE)

    return { success: true, deleted }
  } catch (error) {
    console.error('Error unsubscribing:', error)
    return { success: false, error: String(error) }
  }
}

export async function sendNotification(message: string, userAvatar?: string | null) {
  try {
    // First try to get the current user's subscription
    const currentUserSub = await getSubscriptionForCurrentUser()

    if (currentUserSub) {
      try {
        await webpush.sendNotification(
          currentUserSub,
          JSON.stringify({
            title: 'Ethereum Follow Protocol',
            body: message,
            icon: userAvatar ? userAvatar : '/assets/android-chrome-192x192.png',
            badge: userAvatar ? '/assets/android-chrome-192x192.png' : undefined,
          })
        )
        return { success: true }
      } catch (error: any) {
        // Handle expired subscription
        if (error.statusCode === 410 || error.statusCode === 404) {
          console.log('Subscription expired, removing')
          await unsubscribeUser()
        }

        throw error
      }
    }

    return { success: false, message: 'No subscriptions found' }
  } catch (error) {
    console.error('Failed to send notification:', error)
    return { success: false, error: String(error) }
  }
}
