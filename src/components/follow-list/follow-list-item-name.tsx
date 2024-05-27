'use client'

import Link from 'next/link'
import type { Address, GetEnsAvatarReturnType } from 'viem'

import { Avatar } from '#/components/avatar'
import { truncateAddress } from '#/lib/utilities'
import { useFollowState } from '#/hooks/use-follow-state'
import { useTranslation } from 'react-i18next'

interface FollowListItemNameProps {
  address: Address
  avatarUrl?: string | GetEnsAvatarReturnType
  className?: string
  name?: string
  showFollowsYouBadges?: boolean
}

export function Name({ name, address }: { name?: string; address: Address }) {
  return (
    <Link href={`/${name || address}`}>
      <p className='font-bold sm:text-lg  hover:opacity-75 transition-opacity'>
        {name || truncateAddress(address)}
      </p>
    </Link>
  )
}

export function FollowListItemName({
  address,
  name,
  showFollowsYouBadges,
  avatarUrl,
  className = ''
}: FollowListItemNameProps) {
  const { t } = useTranslation()
  const isFollower = useFollowState(address) === 'follows'
  return (
    <div className={`flex gap-3 ${className}`}>
      <Avatar
        name={name || address}
        avatarUrl={avatarUrl}
        size='h-[45px] w-[45px] md:h-[50px] md:w-[50px]'
      />
      <div className='flex flex-col justify-center tabular-nums relative'>
        <Name name={name} address={address} />
        {/* Badge will appear below the name, but the name stays centered */}
        {showFollowsYouBadges && isFollower && (
          <div className='font-bold text-[8px] self-start mt-1 bg-grey text-darkGrey absolute -bottom-2 left-0'>
            {t('profile card.follows you')}
          </div>
        )}
      </div>
    </div>
  )
}
