console.log('Service Worker loading. Standard Push API Mode.')

// --- Service Worker Event Listeners ---

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.')
  // Use skipWaiting to activate the new SW immediately
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.')
  // Use clients.claim() to take control of existing clients
  event.waitUntil(clients.claim())
  // NO WebSocket connection needed on activation
})

// Listener for the standard 'push' event
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.')

  // Define default structure matching PushPayload (actions.ts) but with defaults
  let payload = {
    title: 'EFP Update',
    body: 'You have a new update.',
    badge: '/assets/logo.png', // Default badge/icon
    icon: '/assets/icons/icon-192x192.png', // Default icon if badge fails or not used
    data: { address: null, url: 'https://efp.app/' }, // Default data
  }

  try {
    if (event.data) {
      const parsedData = event.data.json()
      // Merge received data, ensuring data object exists
      payload = {
        ...payload,
        ...parsedData,
        data: {
          ...payload.data, // Keep default URL unless overridden
          ...(parsedData.data || {}), // Merge data object
        },
        // Use badge from payload if present, otherwise keep default
        badge: parsedData.badge || payload.badge,
        icon: parsedData.icon || payload.icon, // Allow overriding icon too
      }
      console.log('[Service Worker] Push payload parsed:', payload)
    } else {
      console.log('[Service Worker] Push event received but no data payload.')
    }
  } catch (e) {
    console.error('[Service Worker] Error parsing push data:', e)
    payload.body = event.data ? event.data.text() : 'Error processing notification data.'
  }

  // Use parsed or default values to show notification
  const title = payload.title
  const options = {
    body: payload.body,
    icon: payload.icon, // Standard icon field
    badge: payload.badge, // Badge field (often for monochrome icons)
    data: payload.data, // Pass data to notificationclick event
    tag: `efp-update-${payload.data?.address || Date.now()}`, // Tag based on address if available
  }

  const notificationPromise = self.registration.showNotification(title, options)
  event.waitUntil(notificationPromise)
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click Received.', event.notification)
  event.notification.close()

  // Construct URL based on address in notification data
  const notificationData = event.notification.data || {}
  const targetAddress = notificationData.address // Get address from push payload data
  // Use data.url if provided, otherwise construct from address, fallback to base URL
  const urlToOpen = notificationData.url || (targetAddress ? `https://efp.app/${targetAddress}` : 'https://efp.app/')

  console.log(`[Service Worker] Handling click, opening: ${urlToOpen}`)

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        // Attempt to focus existing window/tab if URL matches
        if (client.url === urlToOpen && 'focus' in client) {
          console.log('[Service Worker] Focusing existing client.')
          return client.focus()
        }
      }
      // Otherwise, open a new window
      if (clients.openWindow) {
        console.log('[Service Worker] Opening new window.')
        return clients.openWindow(urlToOpen)
      }
    })
  )
})

// Optional: Handle subscription changes
self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('[Service Worker] Push subscription changed. Re-subscription might be needed.')
  // TODO: Implement logic to re-subscribe and update the backend automatically
  // Example: event.waitUntil( self.registration.pushManager.subscribe(options).then(...) );
})
