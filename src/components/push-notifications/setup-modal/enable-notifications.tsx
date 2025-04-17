import { useState } from 'react'
import { cn } from '#/lib/utilities'
import Modal from '#/components/modal'
import PrimaryButton from '#/components/buttons/primary-button'

interface EnableNotificationsProps {
  subscribeToPush: () => Promise<void>
  sendPushNotification: (message: string) => Promise<void>
  isSupported: boolean
  isLoading: boolean
  subscription: PushSubscription | null
}

const EnableNotifications: React.FC<EnableNotificationsProps> = ({
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
    <Modal onCancel={onClose} closeButtonClassName='top-4 right-4'>
      <div className='flex w-96 flex-col gap-4 p-2'>
        <h1 className='text-2xl font-bold'>Push Notifications</h1>
        <p className='text-center'>
          This app supports push notifications. <br /> Do you want to enable them?
        </p>
        <div className='mt-2 flex gap-2'>
          <button className='bg-tertiary hover:bg-nav-item w-1/2 rounded-sm font-bold' onClick={onClose}>
            No thanks
          </button>
          <PrimaryButton
            label={isLoading ? 'Enabling...' : 'Yes, enable'}
            disabled={isLoading}
            className={cn('w-1/2', isLoading && 'italic')}
            onClick={async () => {
              await subscribeToPush()
              sendPushNotification(`You are now subscribed to push notifications`)
              onClose()
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default EnableNotifications
