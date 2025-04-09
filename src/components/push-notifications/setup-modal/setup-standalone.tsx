import { useState } from 'react'
import Modal from '#/components/modal'

interface SetupStandaloneProps {
  subscribeToPush: () => Promise<void>
  sendPushNotification: (message: string) => Promise<void>
  isSupported: boolean
  isLoading: boolean
  subscription: PushSubscription | null
}

const SetupStandalone: React.FC<SetupStandaloneProps> = ({
  subscribeToPush,
  sendPushNotification,
  isSupported,
  isLoading,
  subscription,
}) => {
  const [open, setOpen] = useState(true)

  const onClose = () => {
    setOpen(false)
    localStorage.setItem('has_seen_setup_modal', 'true')
  }

  if (!isSupported || subscription || !open) return null

  return (
    <Modal onCancel={onClose}>
      <p>This app supports push notifications. Do you want to enable them?</p>
      <div className='flex gap-2'>
        <button className='bg-neutral' onClick={onClose}>
          No thanks
        </button>
        <button
          className='bg-primary'
          onClick={async () => {
            await subscribeToPush()
            sendPushNotification(`You are now subscribed to push notifications`)
            onClose()
          }}
        >
          {isLoading ? 'Enabling...' : 'Enable Push Notifications'}
        </button>
      </div>
    </Modal>
  )
}

export default SetupStandalone
