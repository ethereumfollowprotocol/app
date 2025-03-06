import React from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import type { NotificationItemType } from '#/types/requests'
import { FollowIcon, truncateAddress } from '@encrypteddegen/identity-kit'

import { cn } from '#/lib/utilities'
import { Avatar } from '#/components/avatar'
import Tag from 'public/assets/icons/ui/tag.svg'
import Block from 'public/assets/icons/ui/cross.svg'
import Mute from 'public/assets/icons/ui/volume-mute.svg'
import { formatTimeDiff } from '#/utils/format/format-time'

export type NotificationItemAction = 'follow' | 'unfollow' | 'tag' | 'untag' | 'block' | 'unblock' | 'mute' | 'unmute'

interface NotificationItemProps {
  action: NotificationItemAction
  notifications: NotificationItemType[]
  isNew: boolean
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notifications, action, isNew }) => {
  const router = useRouter()
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
    follow: 'bg-primary/30',
    unfollow: 'bg-zinc-300/30',
    tag: 'bg-zinc-300/30',
    untag: 'bg-zinc-300/30',
    block: 'bg-deletion/30',
    unblock: 'bg-primary/30',
    mute: 'bg-deletion/30',
    unmute: 'bg-primary/30',
  }[action]

  const displayedAvatars = notifications.slice(0, 3)
  const displayedNames = notifications.slice(0, 2)

  return (
    <div
      className={cn(
        'relative flex h-16 w-full items-center justify-between gap-1 rounded-sm px-3 py-2 sm:w-[520px]',
        style
      )}
    >
      <div className='flex max-w-[90%] items-center gap-2 sm:max-w-full'>
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full',
            (action === 'follow' || action === 'unfollow') && 'pl-0.5',
            style.replace('/30', '')
          )}
        >
          <Icon className='text-dark-grey h-auto w-5' height={24} width={24} />
        </div>
        <div className='flex w-[85%] items-center justify-start gap-2 sm:w-[410px]'>
          <div className='flex'>
            {displayedAvatars.map((profile, index) => (
              <Avatar
                key={profile.address}
                size={`w-8 h-8 rounded-full shadow-sm cursor-pointer hover:scale-125 transition-all ${index === 0 ? 'z-0' : `-ml-[18px] z-${index * 10}`}`}
                avatarUrl={profile.avatar}
                name={profile.name || profile.address}
                onClick={() => router.push(`/${profile.address}?ssr=false`)}
              />
            ))}
          </div>
          <p
            className='text-text-neutral notification-item-text overflow-hidden text-left text-xs font-medium break-keep sm:text-sm'
            style={{ width: 'calc(100% - 70px)' }}
          >
            {displayedNames?.map((profile, index) => (
              <span key={profile.address}>
                <span
                  onClick={() => router.push(`/${profile.address}?ssr=false`)}
                  className='cursor-pointer transition-all hover:underline hover:opacity-80'
                >
                  {`${profile.name || truncateAddress(profile.address)}`}
                </span>
                {`${notifications.length === 2 ? (index === 0 ? ' and ' : ' ') : notifications.length === 1 ? ' ' : ', '}`}
              </span>
            ))}
            {notifications.length > 2 &&
              `${t('and')} ${notifications.length - 2} ${notifications.length - 2 > 1 ? t('others') : t('other')} `}
            {t(`notifications.${action}`)}
          </p>
        </div>
      </div>
      <p className='text-text-neutral text-sm font-semibold'>{formatTimeDiff(timeDiff)}</p>
      {isNew && <span className='bg-primary absolute -top-1 -right-1 flex h-4 w-4 rounded-full' />}
    </div>
  )
}

export default NotificationItem
