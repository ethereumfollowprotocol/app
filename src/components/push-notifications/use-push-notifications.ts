import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { fetchAccount } from 'ethereum-identity-kit'
import type { PushSubscription as SerializablePushSubscription } from 'web-push'

import { truncateAddress } from '#/lib/utilities'
import type { NotificationItemType } from '#/types/requests'
import { getSubscriptionForCurrentUser, sendNotification, subscribeUser, unsubscribeUser } from '#/app/actions'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [registrationInstance, setRegistrationInstance] = useState<ServiceWorkerRegistration | null>(null)

  const { t } = useTranslation()
  const { address: connectedAddress } = useAccount()
  const { data: account } = useQuery({
    queryKey: ['account', connectedAddress],
    queryFn: async () => {
      if (!connectedAddress) return null

      const account = await fetchAccount(connectedAddress)
      return account
    },
  })

  useEffect(() => {
    async function checkExistingSubscription() {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          setIsSupported(true)
          setIsLoading(true)

          console.log('Registering service worker...')
          // Register service worker - ensure this path is correct
          const registration = await navigator.serviceWorker.register('/service-worker.js', {
            scope: '/',
            updateViaCache: 'none',
          })

          console.log('Service worker registered:', registration)
          setRegistrationInstance(registration)

          // First check the browser for subscription
          console.log('Checking for existing browser subscription...')
          const browserSub = await registration.pushManager.getSubscription()

          if (browserSub) {
            console.log('Browser has existing push subscription')
            setSubscription(browserSub)
            setIsLoading(false)
            return
          }

          // If no browser subscription, check redis cache
          console.log('No browser subscription, checking redis cache...')
          const serverSub = await getSubscriptionForCurrentUser()

          if (serverSub) {
            console.log('Found subscription on server but not in browser - re-subscribing user')

            // automatically re-subscribe the user
            await subscribeToPush()
          } else {
            console.log('No subscription found on server either')
          }

          setIsLoading(false)
        } catch (error) {
          console.error('Error during service worker setup:', error)
          setIsLoading(false)
        }
      } else {
        console.log('Push notifications not supported in this browser')
        setIsLoading(false)
        setIsSupported(false)
      }
    }

    checkExistingSubscription()
  }, [])

  async function subscribeToPush() {
    try {
      setIsLoading(true)
      console.log('Starting subscription process...')

      if (!registrationInstance) {
        console.log('No service worker registration found, attempting to get it')
        const registration = await navigator.serviceWorker.ready
        setRegistrationInstance(registration)
      }

      console.log('Using VAPID key:', process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)

      const registration = registrationInstance || (await navigator.serviceWorker.ready)
      console.log('Requesting push subscription with registration:', registration)

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      })

      console.log('Browser push subscription created:', sub)

      // Convert to format for sending to server
      const serializedSub = JSON.parse(JSON.stringify(sub)) as SerializablePushSubscription
      console.log('Serialized subscription to send to server:', serializedSub)

      // Store on server with cookie reference
      const result = await subscribeUser(serializedSub)

      if (result.success) {
        setSubscription(sub)
        console.log('Successfully subscribed to push notifications')
      } else {
        console.error('Failed to save subscription on server:', result.error)
      }
    } catch (error) {
      console.error('Error subscribing to push notifications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function unsubscribeFromPush() {
    try {
      setIsLoading(true)
      console.log('Unsubscribing from push notifications...')

      if (subscription) {
        // First unsubscribe in the browser
        await subscription.unsubscribe()
        console.log('Unsubscribed in browser')
      }

      // Then remove from server (uses cookie to find subscription)
      const result = await unsubscribeUser()
      console.log('Server unsubscribe result:', result)

      setSubscription(null)
    } catch (error) {
      console.error('Error unsubscribing:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function sendPushNotification(message: string) {
    try {
      console.log('Sending notification...')
      const result = await sendNotification(message, account?.ens?.avatar)

      if (result.success) {
        console.log('Notification sent successfully')
      } else {
        console.error('Failed to send notification:', result.error)
        await subscribeToPush()
      }
    } catch (error) {
      console.error('Error sending notification:', error)
    }
  }

  let webSocket: WebSocket | null = null
  useEffect(() => {
    if (!account?.address) return

    // Close any existing websocket connection before opening a new one
    if (webSocket) {
      webSocket.close()
      webSocket = null
    }

    // Open a new websocket connection
    const ws = new WebSocket(`ws://efp-events.up.railway.app/?address=${account?.address}`)
    webSocket = ws

    ws.onopen = () => {
      console.log('Connected to notifications service')
    }

    // Handle incoming messages from the websocket
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as NotificationItemType

      const restrictAction = Object.entries({
        blocked: data.action === 'tag' && data.tag === 'block',
        unblocked: data.action === 'untag' && data.tag === 'block',
        muted: data.action === 'tag' && data.tag === 'mute',
        unmuted: data.action === 'untag' && data.tag === 'mute',
      })
        .filter(([_, value]) => !!value)
        .map(([key]) => key)[0]

      const action = restrictAction || data.action

      const message = `${data.name ? data.name : truncateAddress(data.address)} ${t(`notifications.${action}`)} ${action === 'tag' || action === 'untag' ? `"${data.tag}"` : ''}`
      sendPushNotification(message)
    }

    ws.onclose = () => {
      console.log('Notifications service connection closed')
    }

    return () => {
      ws.close()
    }
  }, [account?.address])

  return {
    isSupported,
    subscription,
    isLoading,
    subscribeToPush,
    unsubscribeFromPush,
    sendPushNotification,
  }
}
