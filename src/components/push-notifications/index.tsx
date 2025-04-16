'use client'

import { useClickAway } from '@uidotdev/usehooks'
import { cn } from '#/lib/utilities'
import { usePushNotifications } from './use-push-notifications'
import LoadingCell from '#/components/loaders/loading-cell'
import Bell from 'public/assets/icons/ui/bell.svg'
import Check from 'public/assets/icons/ui/check.svg'
import BellSlash from 'public/assets/icons/ui/bell-slash.svg'
import ArrowRight from 'public/assets/icons/ui/arrow-right.svg'
import ArrowLeft from 'public/assets/icons/ui/arrow-left.svg'
// import PushNotificationSetupModal from './setup-modal'

const subscriptionOptions = {
  subscribed: {
    label: 'On',
    icon: Bell,
  },
  unsubscribed: {
    label: 'Off',
    icon: BellSlash,
  },
}

interface PushNotificationsProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const PushNotifications: React.FC<PushNotificationsProps> = ({ open, setOpen }) => {
  const clickAwayPushNotificationsRef = useClickAway<HTMLDivElement>(() => setOpen(false))
  const { isSupported, isLoading, subscription, subscribeToPush, unsubscribeFromPush, sendPushNotification } =
    usePushNotifications()

  const activeOption = subscription ? subscriptionOptions.subscribed : subscriptionOptions.unsubscribed

  return (
    <>
      {/* <PushNotificationSetupModal
        subscribeToPush={subscribeToPush}
        sendPushNotification={sendPushNotification}
        isSupported={isSupported}
        isLoading={isLoading}
        subscription={subscription}
      /> */}
      <div
        ref={clickAwayPushNotificationsRef}
        className={cn('group relative h-full w-full cursor-pointer', !isSupported && 'hidden')}
      >
        <div
          onClick={() => setOpen(!open)}
          className='group-hover:bg-nav-item flex w-full cursor-pointer items-center justify-between rounded-sm p-4 transition-opacity'
        >
          {isLoading ? (
            <LoadingCell className='h-6 w-24' />
          ) : (
            <div className='flex items-center justify-end gap-2'>
              {activeOption.icon && <activeOption.icon className='h-6 w-6' />}
              <p className='font-bold capitalize'>Push Notifications</p>
            </div>
          )}
          <ArrowRight />
        </div>
        <div
          className={cn(
            'absolute -top-[116px] -right-full z-50 block h-full w-full transition-all transition-discrete group-hover:block sm:top-0 sm:left-full sm:w-fit sm:pl-2 sm:transition-normal',
            open ? 'block' : 'hidden'
          )}
        >
          <div className='bg-neutral shadow-medium flex h-screen max-h-[80vh] w-full flex-col gap-2 rounded-sm sm:h-auto sm:max-h-[50vh] sm:w-56'>
            <div
              onClick={() => {
                setOpen(false)
              }}
              className='hover:bg-nav-item flex w-full cursor-pointer items-center justify-between rounded-sm p-4 transition-opacity sm:hidden'
            >
              <ArrowLeft className='text-xl' />
              <p className='font-bold'>Back</p>
            </div>
            {Object.values(subscriptionOptions).map((item) => (
              <div
                className='hover:bg-nav-item relative flex w-full items-center gap-2 rounded-sm p-4 pl-8'
                key={item.label}
                onClick={() => {
                  if (item.label === 'On') {
                    subscribeToPush().then(() => {
                      sendPushNotification(`You are now subscribed to push notifications`)
                    })
                  } else {
                    unsubscribeFromPush()
                  }

                  setOpen(false)
                }}
              >
                {activeOption.label === item.label && (
                  <Check className='absolute top-5 left-2.5 h-4 w-4 text-green-500' />
                )}
                <item.icon className='h-6 w-6' suppressHydrationWarning />
                <p className='font-bold text-nowrap capitalize'>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PushNotifications
