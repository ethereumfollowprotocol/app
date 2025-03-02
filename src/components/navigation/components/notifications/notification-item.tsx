import React from 'react'
import { useTranslation } from 'react-i18next'
import type { NotificationItemType } from '#/types/requests'
import { Avatar, FollowIcon, truncateAddress } from '@encrypteddegen/identity-kit'

import { cn } from '#/lib/utilities'
import Tag from 'public/assets/icons/ui/tag.svg'
import Block from 'public/assets/icons/ui/cross.svg'
import Mute from 'public/assets/icons/ui/volume-mute.svg'
import { formatTimeDiff } from '#/utils/format/format-time'

export type NotificationItemAction = 'follow' | 'unfollow' | 'tag' | 'untag' | 'block' | 'unblock' | 'mute' | 'unmute'

interface NotificationItemProps {
  action: NotificationItemAction
  notifications: NotificationItemType[]
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notifications, action }) => {
  const { t } = useTranslation()

  if (!notifications[0]) return null

  const timeDiff = (new Date().getTime() - new Date(notifications[0].updated_at).getTime()) / 1000

  const Icon = {
    follow: FollowIcon,
    unfollow: FollowIcon,
    tag: Tag,
    untag: Tag,
    block: Block,
    unblock: Block,
    mute: Mute,
    unmute: Mute,
  }[action]

  const style = {
    follow: 'bg-primary',
    unfollow: 'bg-[#D4D4D4]',
    tag: 'bg-[#D4D4D4]',
    untag: 'bg-[#D4D4D4]',
    block: 'bg-deletion',
    unblock: 'bg-primary',
    mute: 'bg-deletion',
    unmute: 'bg-primary',
  }[action]

  return (
    <div className={cn('flex w-full items-center justify-between gap-1 rounded-sm p-3 sm:w-[520px]', style + '/30')}>
      <div className='flex items-center gap-2'>
        <div className={`text-dark-grey flex h-10 w-10 items-center justify-center rounded-full ${style}`}>
          <Icon className='text-dark-grey h-auto w-5' height={24} width={24} />
        </div>
        <div className='flex w-full max-w-1/2 flex-nowrap items-center gap-1 overflow-hidden sm:max-w-[410px]'>
          {notifications.length === 1 ? (
            <>
              <NotificationProfile
                address={notifications[0].address}
                name={notifications[0].name}
                avatar={notifications[0].avatar}
              />
            </>
          ) : (
            <p className='text-sm font-medium text-nowrap'>{notifications.length} people</p>
          )}
          <p className='text-sm font-medium'> {t(`notifications.${action}`)}</p>
          {notifications.length > 1 && (
            <>
              <div className='flex max-w-1/4 flex-nowrap items-center gap-1 overflow-hidden sm:max-w-[220px]'>
                &#40;
                {notifications.slice(0, 3).map((notification) => (
                  <div className='flex flex-nowrap items-center gap-0' key={notification.address}>
                    <NotificationProfile
                      address={notification.address}
                      name={notification.name}
                      avatar={notification.avatar}
                    />
                    <p>,</p>
                  </div>
                ))}
                &#41;
              </div>
              <p>...</p>
            </>
          )}
        </div>
      </div>
      <p className='text-text-neutral text-sm font-semibold'>{formatTimeDiff(timeDiff)}</p>
    </div>
  )
}

export const NotificationProfile = ({
  address,
  name,
  avatar,
}: {
  address: string
  name?: string | null
  avatar?: string | null
}) => {
  return (
    <div className='flex flex-nowrap items-center gap-1'>
      <Avatar address={address} name={name} src={avatar} className='h-5 w-5 overflow-hidden rounded-full' />
      <p className='overflow-hidden text-sm text-ellipsis whitespace-nowrap'>
        {name || truncateAddress(address as `0x${string}`)}
      </p>
    </div>
  )
}

export default NotificationItem
