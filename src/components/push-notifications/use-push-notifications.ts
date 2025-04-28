'use client' // Ensure this is a client component

import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchAccount } from 'ethereum-identity-kit'
import type { PushSubscription as SerializablePushSubscription } from 'web-push'
import {
  getSubscriptionForCurrentUser,
  sendNotification,
  storeAccountDataForSubscription,
  subscribeUser,
  unsubscribeUser,
} from '#/app/actions' // Adjust import path

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

  useEffect(() => {
    // checkExistingSubscription function remains the same
    async function checkExistingSubscription() {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          setIsSupported(true)
          setIsLoading(true)
          console.log('Registering service worker...')
          const registration = await navigator.serviceWorker.register('/service-worker.js', {
            scope: '/',
            updateViaCache: 'none',
          })
          console.log('Service worker registered')
          setRegistrationInstance(registration)

          console.log('Checking for existing browser subscription...')
          const browserSub = await registration.pushManager.getSubscription()
          if (browserSub) {
            console.log('Browser has existing push subscription')
            setSubscription(browserSub)
            setIsLoading(false)
            return
          }

          const serverSub = await getSubscriptionForCurrentUser()
          if (serverSub) {
            console.log('Found subscription on server but not in browser - attempting re-subscribe')
            // Attempt re-subscription (might need user interaction if permission revoked)
            await subscribeToPush() // Re-subscribe flow will handle setting state
          } else {
            console.log('No existing subscription found.')
          }
          setIsLoading(false)
        } catch (error) {
          console.error('Error during service worker setup:', error)
          setIsLoading(false)
        }
      } else {
        console.log('Push notifications not supported.')
        setIsLoading(false)
        setIsSupported(false)
      }
    }
    checkExistingSubscription()
  }, []) // Removed dependency array, runs once on mount

  async function subscribeToPush() {
    // ... (subscribe logic remains the same, calling subscribeUser action) ...
    try {
      setIsLoading(true)
      console.log('Subscribing user to push notifications...')
      const reg = registrationInstance || (await navigator.serviceWorker.ready)
      if (!registrationInstance) setRegistrationInstance(reg) // Store if fetched here

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      })

      const serializedSub = JSON.parse(JSON.stringify(sub)) as SerializablePushSubscription
      const result = await subscribeUser(serializedSub)

      if (result.success) {
        setSubscription(sub)
        console.log('Successfully subscribed to push notifications')
        // --- Send initial account data after successful subscription ---
        if (account?.address) {
          const accountData = { address: account.address, name: account.ens?.name, avatar: account.ens?.avatar }
          await storeAccountDataForSubscription(accountData) // Store data associated with new sub
        }
      } else {
        console.error('Failed to save subscription on server:', result.error)
      }
    } catch (error) {
      console.error('Error subscribing to push notifications:', error)
      // Handle potential permission denial errors gracefully
    } finally {
      setIsLoading(false)
    }
  }

  async function unsubscribeFromPush() {
    // ... (unsubscribe logic remains the same, calling unsubscribeUser action) ...
    try {
      setIsLoading(true)
      console.log('Unsubscribing from push notifications...')
      if (subscription) {
        await subscription.unsubscribe()
        console.log('Unsubscribed in browser')
      }
      await unsubscribeUser() // Removes from server & cleans up data via removeSubscriptionData
      console.log('Unsubscribed from server')
      setSubscription(null)
    } catch (error) {
      console.error('Error unsubscribing:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // sendPushNotification function remains the same (for UI testing)

  useEffect(() => {
    // This effect now only stores the latest account data when the address changes
    // It no longer interacts with the Service Worker directly via postMessage
    if (!account?.address || !subscription) {
      // Don't store if not connected or not subscribed
      return
    }

    const accountData = {
      address: account.address,
      name: account.ens?.name,
      avatar: account.ens?.avatar,
    }

    const storeData = async () => {
      console.log(`Calling server action to store/update account data:`, accountData)
      // Use renamed action
      const result = await storeAccountDataForSubscription(accountData)
      if (result.success) {
        console.log('Account data successfully stored/updated via server action.')
      } else {
        console.error('Failed to store/update account data via server action:', result.error)
      }
    }

    storeData()
    // Depend on address and whether subscription exists
  }, [account?.address, account?.ens?.name, account?.ens?.avatar, subscription])

  return {
    isSupported,
    subscription,
    isLoading,
    subscribeToPush,
    unsubscribeFromPush,
    sendNotification, // Keep for testing
  }
}
