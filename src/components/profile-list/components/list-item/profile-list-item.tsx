import React from 'react'
import type { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'

import ProfileListItemDetails from './details'
// import { resolveEnsProfile } from '#/utils/ens'
import type { ENSProfile } from '#/types/requests'
import FollowButton from '#/components/follow-button'
import type { ProfileStatsType, TagsDropdownPositionType } from '#/types/common'
import TopEightAddButton from '#/components/top-eight/components/top-eight-add-button'
import { fetchAccount } from '#/api/fetch-account'
import Image from 'next/image'

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
  }) => {
    const { data: fetchedEnsProfile, isLoading: isEnsProfileLoading } = useQuery({
      queryKey: ['ens metadata', address],
      queryFn: async () => (ensProfile ? ensProfile : (await fetchAccount(address))?.ens),
    })

    const profileName = fetchedEnsProfile?.name
    const profileAvatar = fetchedEnsProfile?.avatar
    const headerImage = fetchedEnsProfile?.records?.header

    return (
      <div className='hover:bg-text/5 relative flex items-center justify-between rounded-sm px-5 transition-all sm:h-20'>
        {headerImage && (
          <Image
            src={headerImage}
            alt='header'
            width={600}
            height={200}
            className='absolute top-0 left-0 z-0 h-full w-full object-cover opacity-25'
          />
        )}
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
          <FollowButton isBlockedBy={isBlockedBy} address={address} />
        )}
      </div>
    )
  }
)

ProfileListItem.displayName = 'ProfileListItem'

export default ProfileListItem
