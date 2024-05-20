import Link from 'next/link'
import type { Address } from 'viem'

import { Avatar } from '#/components/avatar'
import { truncateAddress } from '#/lib/utilities'
import { useFollowState } from '#/hooks/use-follow-state'

interface FollowListItemNameProps {
  address: Address
  avatarUrl?: string
  className?: string
  name?: string
  showFollowsYouBadges: boolean
}

export function Name({ name, address }: { name?: string; address: Address }) {
  return (
    <Link href={`/${name || address}`}>
      <p className='font-bold xl:text-lg lg:text-md text-sm hover:text-pink-400'>
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
  const isFollower = useFollowState(address) === 'follows'
  return (
    <div className={`flex gap-2 ${className}`}>
      <Avatar name={name || address} avatarUrl={avatarUrl} />
      <div className='flex flex-col justify-center tabular-nums relative'>
        <Name name={name} address={address} />
        {/* Badge will appear below the name, but the name stays centered */}
        {showFollowsYouBadges && isFollower && (
          <div className='font-bold text-[8px] self-start mt-1 bg-grey text-darkGrey absolute -bottom-2 left-0'>
            Follows you
          </div>
        )}
      </div>
    </div>
  )
}
