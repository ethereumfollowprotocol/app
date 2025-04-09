'use server'

import { cookies } from 'next/headers'
import webpush, { type PushSubscription as SerializablePushSubscription } from 'web-push'
import Redis from 'ioredis'

// Create Redis client
let redis: Redis | undefined

// Initialize Redis client
function getRedisClient() {
  if (redis) return redis

  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

  redis = new Redis(redisUrl, {
    connectTimeout: 10000, // 10 seconds
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => {
      // Exponential backoff
      return Math.min(times * 50, 2000) // Max 2 seconds
    },
  })

  redis.on('error', (err) => {
    console.error('Redis connection error:', err)
  })

  return redis
}

// Key for storing subscription IDs in cookies
const SUBSCRIPTION_COOKIE = 'push_subscription_id'
// Prefix for subscription keys in Redis
const SUBSCRIPTION_PREFIX = 'push:subscription:'
// Key for the set of all subscriptions
const ALL_SUBSCRIPTIONS_KEY = 'push:all_subscriptions'

// Ensure VAPID keys are configured in your environment variables
if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.error('ERROR: VAPID keys missing. Set NEXT_PUBLIC_VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY env vars.')
  console.log('You can generate keys using: npx web-push generate-vapid-keys')
} else {
  try {
    webpush.setVapidDetails('https://efp.app', process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY)
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
    const redis = getRedisClient()

    console.log('Saving subscription:', sub.endpoint, 'with ID:', subscriptionId)

    // Store the subscription with its ID as the key in Redis
    // We need to stringify the object since Redis expects strings
    await redis.set(`${SUBSCRIPTION_PREFIX}${subscriptionId}`, JSON.stringify(sub))

    // Add to a set of all subscriptions for easier retrieval
    await redis.sadd(ALL_SUBSCRIPTIONS_KEY, subscriptionId)

    // Store the ID in a cookie
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
    const redis = getRedisClient()

    // Retrieve subscription by ID from Redis
    const subscriptionJson = await redis.get(`${SUBSCRIPTION_PREFIX}${subscriptionId}`)

    if (!subscriptionJson) {
      console.log('Subscription not found for ID:', subscriptionId)
      // Clean up cookie since subscription doesn't exist
      cookieStore.delete(SUBSCRIPTION_COOKIE)
      // Remove from the set of all subscriptions
      await redis.srem(ALL_SUBSCRIPTIONS_KEY, subscriptionId)
      return null
    }

    // Parse the JSON string back into an object
    return JSON.parse(subscriptionJson) as SerializablePushSubscription
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
    const redis = getRedisClient()

    // Delete the subscription from Redis
    await redis.del(`${SUBSCRIPTION_PREFIX}${subscriptionId}`)
    // Remove from the set of all subscriptions
    await redis.srem(ALL_SUBSCRIPTIONS_KEY, subscriptionId)

    // Remove the cookie
    cookieStore.delete(SUBSCRIPTION_COOKIE)

    return { success: true }
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

// Add function to send notification to all subscribers
export async function sendNotificationToAll(message: string, userAvatar?: string | null) {
  try {
    const redis = getRedisClient()

    // Get all subscription IDs from the set
    const subscriptionIds = await redis.smembers(ALL_SUBSCRIPTIONS_KEY)

    if (!subscriptionIds || subscriptionIds.length === 0) {
      return { success: false, message: 'No subscriptions found' }
    }

    console.log(`Preparing to send notifications to ${subscriptionIds.length} subscribers`)

    const results = await Promise.allSettled(
      subscriptionIds.map(async (id) => {
        // Get subscription from Redis
        const subscriptionJson = await redis.get(`${SUBSCRIPTION_PREFIX}${id}`)

        if (!subscriptionJson) {
          // Remove invalid ID from the set
          await redis.srem(ALL_SUBSCRIPTIONS_KEY, id)
          return { id, status: 'error', message: 'Subscription not found' }
        }

        // Parse the subscription JSON
        const subscription = JSON.parse(subscriptionJson) as SerializablePushSubscription

        try {
          await webpush.sendNotification(
            subscription,
            JSON.stringify({
              title: 'Ethereum Follow Protocol',
              body: message,
              icon: userAvatar ? userAvatar : '/assets/android-chrome-192x192.png',
              badge: userAvatar ? '/assets/android-chrome-192x192.png' : undefined,
            })
          )
          return { id, status: 'success' }
        } catch (error: any) {
          // Handle expired or invalid subscriptions
          if (error.statusCode === 410 || error.statusCode === 404) {
            // Remove expired subscription
            await redis.del(`${SUBSCRIPTION_PREFIX}${id}`)
            await redis.srem(ALL_SUBSCRIPTIONS_KEY, id)
            return { id, status: 'expired', message: 'Subscription expired' }
          }
          return { id, status: 'error', message: error.message || 'Unknown error' }
        }
      })
    )

    const successful = results.filter((r) => r.status === 'fulfilled' && r.value.status === 'success').length
    const failed = results.filter((r) => r.status === 'fulfilled' && r.value.status === 'error').length
    const expired = results.filter((r) => r.status === 'fulfilled' && r.value.status === 'expired').length

    console.log(`Notification sending complete - Success: ${successful}, Failed: ${failed}, Expired: ${expired}`)

    return {
      success: successful > 0,
      stats: { successful, failed, expired, total: subscriptionIds.length },
    }
  } catch (error) {
    console.error('Error in bulk notification sending:', error)
    return { success: false, error: String(error) }
  }
}
