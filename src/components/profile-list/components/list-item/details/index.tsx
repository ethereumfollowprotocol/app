'use client'

import { useTranslation } from 'react-i18next'
import { usePathname, useRouter } from 'next/navigation'
import type { Address, GetEnsAvatarReturnType } from 'viem'

import Tags from '../../tags'
import { cn } from '#/lib/utilities'
import { Avatar } from '#/components/avatar'
import { useCart } from '#/hooks/use-cart'
import useFollowerState from '#/hooks/use-follower-state'
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
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()
  const { getTagsFromCartByAddress } = useCart()
  const { followers, followersIsLoading } = useEFPProfile()
  const { followerTag } = useFollowerState({ address, showFollowerBadge: showFollowsYouBadges })

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
      className='flex items-center gap-2 p-0 sm:gap-3'
      style={{
        width: isBlockedList ? 'calc(100% - 132px)' : 'calc(100% - 120px)',
      }}
    >
      <div className={cn('flex items-center gap-2 p-0 sm:gap-3', counts ? 'w-2/3' : 'w-full')}>
        {isEnsProfileLoading ? (
          <LoadingCell className='h-[45px] w-[45px] min-w-[45px] rounded-full 2xl:h-[50px] 2xl:w-[50px] 2xl:min-w-[50px]' />
        ) : (
          <Avatar
            name={name || address}
            avatarUrl={avatarUrl}
            size='h-[45px] w-[45px] 2xl:h-[50px] cursor-pointer 2xl:w-[50px] hover:opacity-80 transition-all hover:scale-110'
            onClick={() => router.push(`/${address || name}`)}
          />
        )}
        <div
          className='flex flex-col gap-[2px] md:flex-row md:gap-3 xl:gap-2 2xl:gap-3'
          style={{
            width: counts ? '80%' : 'calc(100% - 60px)',
          }}
        >
          <div
            className={cn(
              'relative flex flex-col items-start justify-center tabular-nums',
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
            {showFollowsYouBadges && (
              <div
                className={`text-darkGrey w-fit max-w-full rounded-full bg-zinc-300 px-2 py-[3px] text-center text-[10px] font-bold ${followerTag.className}`}
              >
                {t(followerTag.text)}
              </div>
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
