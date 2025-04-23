let socket = null
let currentWsUrl = null
let lastKnownAccount = null
let reconnectInterval = 5000
const maxReconnectInterval = 60000
let reconnectTimeoutId = null

async function fetchAddressFromApi() {
  console.log('Attempting to fetch account data')
  try {
    const response = await fetch('/api/address', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Successfully fetched account data:', data)
      return data
    } else if (response.status === 404) {
      console.log('No account data found via API for this user.')
      return null
    } else {
      console.error(`Failed to fetch account data: ${response.status} ${response.statusText}`)
      return null
    }
  } catch (error) {
    console.error('Network error fetching account data:', error)
    return null
  }
}

function disconnectWebSocket() {
  if (reconnectTimeoutId) {
    clearTimeout(reconnectTimeoutId)
    reconnectTimeoutId = null
  }

  if (socket) {
    console.log('Manually disconnecting existing WebSocket.')
    socket.onclose = null
    socket.close()
    socket = null
    currentWsUrl = null
  }
}

function connectWebSocket(accountData) {
  if (!accountData || !accountData.address) {
    console.error('Cannot connect WebSocket without a valid account data object including an address.')
    return
  }

  const newWsUrl = `wss://efp-events.up.railway.app/?address=${encodeURIComponent(accountData.address)}`

  if (socket && socket.readyState === WebSocket.OPEN && currentWsUrl === newWsUrl) {
    console.log(`Already connected to WebSocket: ${newWsUrl}`)
    return
  }

  if (socket) {
    console.log('Disconnecting previous WebSocket connection before starting new one.')
    disconnectWebSocket()
  }

  console.log(`Attempting to connect WebSocket: ${newWsUrl}`)
  currentWsUrl = newWsUrl
  lastKnownAccount = accountData

  socket = new WebSocket(currentWsUrl)

  socket.onopen = () => {
    console.log('WebSocket connection established:', currentWsUrl)
    reconnectInterval = 5000
    if (reconnectTimeoutId) {
      clearTimeout(reconnectTimeoutId)
      reconnectTimeoutId = null
    }
  }

  socket.onmessage = (event) => {
    try {
      const messageData = JSON.parse(event.data)
      const notificationTitle = 'New EFP Update'

      const getMessageAction = () => {
        if (messageData.action === 'tag') {
          if (messageData.tag === 'block') return 'block'
          if (messageData.tag === 'mute') return 'mute'
        } else if (messageData.action === 'untag') {
          if (messageData.tag === 'block') return 'unblock'
          if (messageData.tag === 'mute') return 'unmute'
        }

        return messageData.action
      }
      const messageAction = getMessageAction()
      const actions = {
        follow: 'followed you',
        unfollow: 'unfollowed you',
        block: 'blocked you',
        unblock: 'unblocked you',
        mute: 'muted you',
        unmute: 'unmuted you',
        tag: `tagged you with ${messageData.tag}`,
        untag: `removed the tag ${messageData.tag}`,
      }

      const notificationBody = `${messageData.name || `${messageData.address.slice(0, 6)}...${messageData.address.slice(-4)}`} ${actions[messageAction]}.`

      const notificationOptions = {
        body: notificationBody,
        badge: lastKnownAccount.avatar,
        data: { ...(messageData.data || {}), address: messageData.address },
        tag: `address-${messageData.address}-${Date.now()}`,
      }

      self.registration.showNotification(notificationTitle, notificationOptions)
    } catch (e) {
      console.error('Failed to handle WebSocket message:', e)
      self.registration.showNotification('Update Received', {
        body: `Check the app for details regarding ${lastKnownAccount.address}.`,
      })
    }
  }

  socket.onerror = (error) => {
    console.error('WebSocket error:', error)
  }

  socket.onclose = (event) => {
    console.log(
      `WebSocket closed. Code: ${event.code}. Reconnecting to ${currentWsUrl} in ${reconnectInterval / 1000}s...`
    )
    socket = null

    if (lastKnownAccount) {
      console.log(`Attempting reconnect using last known account data:`, lastKnownAccount)
      if (reconnectTimeoutId) clearTimeout(reconnectTimeoutId)

      reconnectTimeoutId = setTimeout(() => connectWebSocket(lastKnownAccount), reconnectInterval)
      reconnectInterval = Math.min(reconnectInterval * 2, maxReconnectInterval)
    } else {
      console.log('No in-memory account data for reconnect, attempting to fetch from API...')
      if (reconnectTimeoutId) clearTimeout(reconnectTimeoutId)

      reconnectTimeoutId = setTimeout(() => {
        fetchAddressFromApi().then((fetchedAccountData) => {
          if (fetchedAccountData) {
            connectWebSocket(fetchedAccountData)
          } else {
            console.log('API fetch failed during reconnect attempt, stopping reconnect cycle.')
            reconnectInterval = 5000
          }
        })
      }, reconnectInterval)

      reconnectInterval = Math.min(reconnectInterval * 2, maxReconnectInterval)
    }
  }
}

self.addEventListener('install', () => {
  console.log('Service Worker installing.')
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.')
  event.waitUntil(
    clients
      .claim()
      .then(() => {
        console.log('Attempting to fetch initial account data from API on activation.')
        return fetchAddressFromApi()
      })
      .then((fetchedAccountData) => {
        if (fetchedAccountData) {
          connectWebSocket(fetchedAccountData)
        } else {
          console.log('No account data fetched on activation. Waiting for client message.')
        }
      })
      .catch((err) => {
        console.error('Error during activation fetch/connect:', err)
      })
  )
})

self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data.payload)

  if (event.data && event.data.type === 'CONNECT_WEBSOCKET' && !!event.data.payload?.accountData.address) {
    const accountData = event.data.payload.accountData
    console.log(`Received instruction via message to connect WebSocket for account:`, accountData)

    connectWebSocket(accountData)
  } else if (event.data && event.data.type === 'DISCONNECT_WEBSOCKET') {
    console.log('Received instruction via message to disconnect WebSocket.')
    disconnectWebSocket()
    lastKnownAccount = null
  }
})

self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/assets/icons/icon-192x192.png',
      badge: data.badge,
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification)
  event.notification.close()

  const notificationData = event.notification.data || {}
  const addr = notificationData.address || (lastKnownAccount ? lastKnownAccount.address : null)
  const urlToOpen = addr ? `https://efp.app/${addr}` : 'https://efp.app/'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(urlToOpen) && 'focus' in client) {
          return client.focus()
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(urlToOpen)
      }
    })
  )
})
