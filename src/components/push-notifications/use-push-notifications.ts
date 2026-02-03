import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchAccount } from '@encrypteddegen/identity-kit'
import type { PushSubscription as SerializablePushSubscription } from 'web-push'
import {
  getSubscriptionForCurrentUser,
  sendNotification,
  storeAddressForSubscription,
  subscribeUser,
  unsubscribeUser,
} from '#/app/actions'

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

  const { address: connectedAddress } = useAccount()
  const { data: account } = useQuery({
    queryKey: ['account', connectedAddress],
    queryFn: async () => {
      if (!connectedAddress) return null

      const account = await fetchAccount(connectedAddress)
      return account
    },
  })

  const connectWebSocket = (accountData: { address: string; name?: string | null; avatar?: string | null }) => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          if (registration.active) {
            console.log(`Sending account data to Service Worker:`, accountData)
            registration.active.postMessage({
              type: 'CONNECT_WEBSOCKET',
              payload: { accountData },
            })
          }
        })
        .catch((error) => console.error('SW ready Error:', error))
    }
  }

  const disconnectWebSocket = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          if (registration.active) {
            console.log(`Disconnecting websocket`)
            registration.active.postMessage({
              type: 'DISCONNECT_WEBSOCKET',
            })
          }
        })
        .catch((error) => console.error('SW disconnect Error:', error))
    }
  }

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

          console.log('Service worker registered')
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
          const serverSub = await getSubscriptionForCurrentUser()

          if (serverSub) {
            console.log('Found subscription on server but not in browser - re-subscribing user')

            // automatically re-subscribe the user
            await subscribeToPush()
          } else {
            console.log('No subscription found')
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
      console.log('Subscribing user to push notifications...')

      if (!registrationInstance) {
        console.log('No service worker registration found, attempting to get it')
        const registration = await navigator.serviceWorker.ready
        setRegistrationInstance(registration)
      }

      const registration = registrationInstance || (await navigator.serviceWorker.ready)

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      })

      // Convert to format for sending to server
      const serializedSub = JSON.parse(JSON.stringify(sub)) as SerializablePushSubscription
      // Store on server with cookie reference
      const result = await subscribeUser(serializedSub)

      if (result.success) {
        if (account?.address) {
          const accountData = {
            address: account.address,
            name: account.ens?.name,
            avatar: account.ens?.avatar,
          }
          connectWebSocket(accountData)
        }

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
      await unsubscribeUser()
      console.log('Unsubscribed from server')

      // Close websocket connection
      disconnectWebSocket()

      setSubscription(null)
    } catch (error) {
      console.error('Error unsubscribing:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function sendPushNotification(title: string, message: string) {
    try {
      console.log('Sending notification...')
      const result = await sendNotification(title, message, account?.ens?.avatar)

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

  useEffect(() => {
    if (!registrationInstance) {
      return disconnectWebSocket()
    }

    const address = account?.address
    if (!address) {
      disconnectWebSocket()
      return
    }

    const accountData = {
      address: address,
      name: account?.ens?.name,
      avatar: account?.ens?.avatar,
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          if (registration.active) {
            console.log(`Sending account data to Service Worker:`, accountData)
            registration.active.postMessage({
              type: 'CONNECT_WEBSOCKET',
              payload: { accountData: accountData },
            })
          }
        })
        .catch((error) => console.error('SW ready Error:', error))
    }

    const storeAddress = async () => {
      console.log(`Calling server action to store account data:`, accountData)
      const result = await storeAddressForSubscription(accountData)
      if (result.success) {
        console.log('Account data successfully stored via server action.')
      } else {
        console.error('Failed to store account data via server action:', result.error)
      }
    }

    storeAddress()
  }, [account?.address, registrationInstance])

  return {
    isSupported,
    subscription,
    isLoading,
    subscribeToPush,
    unsubscribeFromPush,
    sendPushNotification,
  }
}
