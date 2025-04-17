self.addEventListener('push', function (event) {
  if (event.data) {
    try {
      const data = event.data.json()
      const options = {
        body: data.body,
        icon: data.icon || 'https://efp.app/assets/logo.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: '2',
        },
      }
      event.waitUntil(self.registration.showNotification(data.title, options))
    } catch (error) {
      console.error('Error showing notification:', error)
    }
  }
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  event.waitUntil(clients.openWindow('https://efp.app'))
})
