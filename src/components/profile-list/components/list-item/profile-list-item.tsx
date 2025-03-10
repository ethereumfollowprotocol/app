import React from 'react'
import type { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'
import type { InitialFollowingState } from '@encrypteddegen/identity-kit'

import { isLinkValid } from '#/utils/validity'
import ProfileListItemDetails from './details'
import { fetchAccount } from '#/api/fetch-account'
import type { ENSProfile } from '#/types/requests'
import FollowButton from '#/components/follow-button'
import ImageWithFallback from '#/components/image-with-fallback'
import type { ProfileStatsType, TagsDropdownPositionType } from '#/types/common'
import TopEightAddButton from '#/components/top-eight/components/top-eight-add-button'

export interface ProfileListItemProps {
  address: Address
  ensProfile?: ENSProfile
  showFollowsYouBadges?: boolean
  showTags?: boolean
  tags: string[]
  counts?: ProfileStatsType
  canEditTags?: boolean
  isBlockedList?: boolean
  isBlockedBy?: boolean
  isTopEight?: boolean
  tagsDropdownPosition?: TagsDropdownPositionType
  initialFollowState?: InitialFollowingState
}

const ProfileListItem: React.FC<ProfileListItemProps> = React.memo(
  ({
    address,
    ensProfile,
    showFollowsYouBadges,
    showTags,
    tags,
    counts,
    canEditTags,
    isBlockedList,
    isBlockedBy,
    isTopEight,
    tagsDropdownPosition,
    initialFollowState,
  }) => {
    const { data: fetchedEnsProfile, isLoading: isEnsProfileLoading } = useQuery({
      queryKey: ['ens metadata', address],
      queryFn: async () => (ensProfile ? ensProfile : (await fetchAccount(address))?.ens),
    })

    const profileName = fetchedEnsProfile?.name
    const profileAvatar = fetchedEnsProfile?.avatar
    const headerImage = isLinkValid(fetchedEnsProfile?.records?.header) ? fetchedEnsProfile?.records?.header : undefined

    return (
      <div className='hover:bg-text/5 relative'>
        {headerImage && (
          <ImageWithFallback
            src={headerImage}
            fallback={undefined}
            alt='header'
            width={600}
            height={200}
            className='absolute top-0 left-0 h-full w-full object-cover opacity-25'
          />
        )}
        <div className='z-10 flex h-20 items-center justify-between rounded-sm px-5 transition-all'>
          {/* Left section: Avatar, Name, and Tags */}
          <ProfileListItemDetails
            address={address}
            avatarUrl={profileAvatar}
            name={profileName}
            counts={counts}
            showFollowsYouBadges={showFollowsYouBadges}
            tags={tags}
            showTags={showTags}
            canEditTags={canEditTags}
            isEnsProfileLoading={isEnsProfileLoading}
            isBlockedList={isBlockedList}
            tagsDropdownPosition={tagsDropdownPosition}
          />
          {/* Right section: Follow Button */}
          {isTopEight ? (
            <TopEightAddButton address={address} tags={tags} />
          ) : (
            <FollowButton isBlockedBy={isBlockedBy} address={address} initialState={initialFollowState} />
          )}
        </div>
      </div>
    )
  }
)

ProfileListItem.displayName = 'ProfileListItem'

export default ProfileListItem
