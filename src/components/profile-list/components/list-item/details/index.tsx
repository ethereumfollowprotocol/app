'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'
import type { Address, GetEnsAvatarReturnType } from 'viem'

import Tags from '../../tags'
import { cn } from '#/lib/utilities'
import { useCart } from '#/hooks/use-cart'
import { Avatar } from '#/components/avatar'
import FollowsYou from '#/components/follows-you'
import LoadingCell from '../../../../loaders/loading-cell'
import ProfileListItemName from './profile-list-item-name'
import ProfileListItemCounts from './profile-list-item-counts'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import type { ProfileStatsType, TagsDropdownPositionType } from '#/types/common'

interface ProfileListItemDetailsProps {
  address: Address
  avatarUrl?: string | GetEnsAvatarReturnType
  counts?: ProfileStatsType
  name?: string | null
  showFollowsYouBadges?: boolean
  showTags?: boolean
  tags: string[]
  canEditTags?: boolean
  tagsDropdownPosition?: TagsDropdownPositionType
  isEnsProfileLoading?: boolean
  isBlockedList?: boolean
}

const ProfileListItemDetails: React.FC<ProfileListItemDetailsProps> = ({
  name,
  tags,
  counts,
  address,
  showTags,
  avatarUrl,
  showFollowsYouBadges,
  canEditTags,
  tagsDropdownPosition,
  isEnsProfileLoading,
  isBlockedList,
}) => {
  const pathname = usePathname()
  const { address: userAddress } = useAccount()
  const { getTagsFromCartByAddress } = useCart()
  const { followers, followersIsLoading, selectedList } = useEFPProfile()

  const isCart = pathname.includes('/cart')
  const tagsFromCart = getTagsFromCartByAddress(address)
  const isFollowersEmpty = !followersIsLoading && followers.length === 0

  const displayedTags = [
    ...new Set(
      [...tags, ...(canEditTags ? tagsFromCart : [])].filter((tag) =>
        isBlockedList ? ['block', 'mute'].includes(tag) : true
      )
    ),
  ]

  return (
    <div
      className='relative flex items-center gap-2 p-0 sm:gap-3'
      style={{
        width: isBlockedList ? 'calc(100% - 132px)' : 'calc(100% - 120px)',
      }}
    >
      <div className={cn('flex items-center gap-2 p-0 sm:gap-3', counts ? 'w-2/3' : 'w-full')}>
        {isEnsProfileLoading ? (
          <LoadingCell className='h-[45px] w-[45px] min-w-[45px] rounded-full 2xl:h-[50px] 2xl:w-[50px] 2xl:min-w-[50px]' />
        ) : (
          <Link href={`/${address || name}`}>
            <Avatar
              name={name || address}
              avatarUrl={avatarUrl}
              size='h-[45px] w-[45px] z-10 2xl:h-[50px] cursor-pointer 2xl:w-[50px] hover:opacity-80 transition-all hover:scale-110'
            />
          </Link>
        )}
        <div
          className='flex flex-col gap-1 sm:gap-2 md:flex-row md:items-center'
          style={{
            width: counts ? '80%' : 'calc(100% - 60px)',
          }}
        >
          <div
            className={cn(
              'relative flex flex-col tabular-nums sm:flex-row sm:items-center sm:gap-0.5 md:flex-col md:items-start md:justify-center',
              isCart
                ? 'md:w-52 md:min-w-52'
                : !isBlockedList && showTags
                  ? displayedTags.length > 0
                    ? 'xl:max-w-[55%] 2xl:max-w-[60%]'
                    : '3xs:max-w-[70%] xxs:max-w-[90%] max-w-[70%]'
                  : 'max-w-full'
            )}
          >
            <ProfileListItemName
              name={name}
              address={address}
              showTags={showTags}
              isCart={isCart}
              isLoading={isEnsProfileLoading}
            />
            {showFollowsYouBadges && userAddress && (
              <FollowsYou addressOrName={address} connectedAddress={userAddress} list={selectedList} />
            )}
          </div>
          <Tags
            profiles={[{ address, tags }]}
            showTags={showTags}
            canEditTags={canEditTags}
            isBlockedList={isBlockedList}
            dropdownPosition={tagsDropdownPosition}
          />
        </div>
      </div>
      <ProfileListItemCounts counts={counts} isFollowersEmpty={isFollowersEmpty} address={address} />
    </div>
  )
}

export default ProfileListItemDetails
