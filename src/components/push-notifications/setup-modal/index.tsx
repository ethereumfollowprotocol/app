import { useEffect, useState } from 'react'
import { useIsClient } from '@encrypteddegen/identity-kit'
import SetupBrowser from './setup-browser'
import EnableNotifications from './enable-notifications'

interface PushNotificationSetupModalProps {
  subscribeToPush: () => Promise<void>
  sendPushNotification: (message: string) => Promise<void>
  isSupported: boolean
  isLoading: boolean
  subscription: PushSubscription | null
}

const PushNotificationSetupModal: React.FC<PushNotificationSetupModalProps> = ({
  subscribeToPush,
  sendPushNotification,
  isSupported,
  isLoading,
  subscription,
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false)

  const isClient = useIsClient()

  useEffect(() => {
    if (!isClient) return

    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(ios)
    setIsMobile(ios || /Android/i.test(navigator.userAgent))
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

    setIsFirstTimeUser(localStorage.getItem('has_seen_setup_modal') !== 'true')
  }, [isClient])

  if (!isFirstTimeUser) return null

  if (isStandalone || !isMobile) {
    return (
      <EnableNotifications
        isSupported={isSupported}
        subscribeToPush={subscribeToPush}
        sendPushNotification={sendPushNotification}
        subscription={subscription}
        isLoading={isLoading}
      />
    )
  }

  if (isMobile) {
    return <SetupBrowser isIOS={isIOS} />
  }

  return null
}

export default PushNotificationSetupModal
