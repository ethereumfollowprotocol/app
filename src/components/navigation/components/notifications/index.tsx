import React from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import Bell from 'public/assets/icons/ui/bell.svg'
import { useNotifications } from '#/hooks/use-notifications'
import NotificationItem, { type NotificationItemAction } from './notification-item'
import { useClickAway } from '@uidotdev/usehooks'

const Notifications = () => {
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()
  const { notifications, isLoading, isOpen, setIsOpen } = useNotifications()
  const clickAwayRef = useClickAway<HTMLDivElement>(() => setIsOpen(false))

  if (!userAddress) return null

  return (
    <div className='group/notifications relative z-10' ref={clickAwayRef}>
      <Bell
        className='h-auto w-9 cursor-pointer transition-transform hover:scale-110'
        onClick={() => setIsOpen(!isOpen)}
      />
      {!isOpen && (
        <div className='absolute -top-1 left-[66px] hidden w-fit opacity-0 transition-all transition-discrete group-hover/notifications:hidden group-hover/notifications:opacity-100 sm:group-hover/notifications:block starting:opacity-0'>
          <p className='bg-neutral shadow-small text-text rounded-sm px-4 py-2 text-lg font-semibold text-nowrap capitalize'>
            {t('notifications')}
          </p>
        </div>
      )}
      <div
        className={cn(
          'absolute top-12 -right-14 w-fit opacity-0 transition-all transition-discrete sm:-top-2 sm:-right-[566px]',
          isOpen ? 'block opacity-100 starting:opacity-0' : 'hidden opacity-0'
        )}
      >
        <div className='bg-neutral shadow-medium flex w-[95vw] flex-col gap-2 rounded-sm p-2 sm:w-fit'>
          {notifications?.map((item, index) =>
            Object.entries(item.notifications).map(([key, value]) =>
              value ? (
                <NotificationItem
                  key={`${index}-${key}`}
                  notifications={value}
                  action={key as NotificationItemAction}
                />
              ) : null
            )
          )}
          {isLoading}
        </div>
      </div>
    </div>
  )
}

export default Notifications
