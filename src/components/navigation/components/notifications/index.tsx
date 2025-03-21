import React from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import { cn } from '#/lib/utilities'
import Bell from 'public/assets/icons/ui/bell.svg'
import { useNotifications } from '#/hooks/use-notifications'
import NotificationItemLoading from './notifcation-item-loading'
import NotificationItem, { type NotificationItemAction } from './notification-item'

const Notifications = () => {
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()
  const { notifications, isLoading, isOpen, setIsOpen, newNotifications } = useNotifications()
  const clickAwayRef = useClickAway<HTMLDivElement>(() => setIsOpen(false))

  if (!userAddress) return null

  return (
    <div className='group/notifications relative z-10' ref={clickAwayRef}>
      <div className='relative transition-transform hover:scale-110' onClick={() => setIsOpen(!isOpen)}>
        <Bell className={cn('h-auto w-9 cursor-pointer', isOpen && 'text-primary-selected')} />
        {newNotifications > 0 && (
          <span className='bg-primary text-dark-grey absolute -top-1.5 -right-1.5 flex h-5 w-fit min-w-5 items-center justify-center rounded-full px-1 text-sm font-bold'>
            {newNotifications}
          </span>
        )}
      </div>
      {!isOpen && (
        <div className='absolute -top-1 left-[66px] hidden w-fit opacity-0 transition-all transition-discrete group-hover/notifications:hidden group-hover/notifications:opacity-100 sm:group-hover/notifications:block starting:opacity-0'>
          <p className='bg-neutral shadow-small text-text rounded-sm px-4 py-2 text-lg font-semibold text-nowrap capitalize'>
            {t('notifications title')}
          </p>
        </div>
      )}
      <div
        className={cn(
          'absolute top-12 -right-14 w-fit opacity-0 transition-all transition-discrete sm:-top-2 sm:-right-[566px]',
          isOpen ? 'block opacity-100 starting:opacity-0' : 'hidden opacity-0'
        )}
      >
        <div className='bg-neutral shadow-medium flex max-h-[70vh] w-[96vw] flex-col gap-2 overflow-y-scroll rounded-sm p-2 sm:w-fit'>
          {notifications?.map((item, index) =>
            Object.entries(item.notifications).map(([key, value]) =>
              value ? (
                <NotificationItem
                  key={`${index}-${key}`}
                  isNew={item.isNew}
                  notifications={value}
                  action={key as NotificationItemAction}
                  onClose={() => setIsOpen(false)}
                />
              ) : null
            )
          )}
          {isLoading && new Array(5).fill(null).map((_, index) => <NotificationItemLoading key={index} />)}
          {!isLoading && notifications?.flatMap((item) => Object.values(item.notifications).flat()).length === 0 && (
            <div className='flex h-44 w-full items-center justify-center sm:w-[520px]'>
              <p className='text-text-neutral'>No notifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifications
