import React from 'react'
import type { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'

import ProfileListItemDetails from './details'
import { resolveEnsProfile } from '#/utils/ens'
import type { ENSProfile } from '#/types/requests'
import FollowButton from '#/components/follow-button'
import type { ProfileStatsType, TagsDropdownPositionType } from '#/types/common'

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
    tagsDropdownPosition,
  }) => {
    const { data: fetchedEnsProfile, isLoading: isEnsProfileLoading } = useQuery({
      queryKey: ['ens metadata', address],
      queryFn: async () => (ensProfile ? ensProfile : await resolveEnsProfile(address)),
    })

    const profileName = fetchedEnsProfile?.name
    const profileAvatar = fetchedEnsProfile?.avatar

    return (
      <div className='flex items-center justify-between hover:bg-text/5 transition-all p-1.5 2xl:p-2 rounded-xl'>
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
        <FollowButton isBlockedBy={isBlockedBy} address={address} />
      </div>
    )
  }
)

ProfileListItem.displayName = 'ProfileListItem'

export default ProfileListItem
