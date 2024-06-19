import type { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'

import { resolveENSProfile } from '#/utils/resolveENS'
import { FollowButton } from '#/components/follow-button'
import { FollowListItemName } from './follow-list-item-name'
import type { ENSProfile } from '#/types/requests'

export interface FollowListItemProps {
  className?: string
  address: Address
  ensProfile?: ENSProfile
  showFollowsYouBadges?: boolean
  showTags?: boolean
  tags: string[]
  canEditTags?: boolean
}

export function FollowListItem({
  className = '',
  address,
  ensProfile,
  showFollowsYouBadges,
  showTags,
  tags,
  canEditTags
}: FollowListItemProps) {
  const { data: fetchedEnsProfile, isLoading: isEnsProfileLoading } = useQuery({
    queryKey: ['ens metadata', address],
    queryFn: async () => await resolveENSProfile(address)
  })

  const profileName = ensProfile ? ensProfile.name : fetchedEnsProfile?.name
  const profileAvatar = fetchedEnsProfile?.avatar
  // const profileName = ensProfile ? ensProfile.name : fetchedEnsProfile?.name
  // const profileAvatar = ensProfile ? ensProfile.avatar ? fetchedEnsProfile?.avatar

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Left section: Avatar, Name, and Tags */}
      <FollowListItemName
        address={address}
        avatarUrl={profileAvatar}
        name={profileName}
        showFollowsYouBadges={showFollowsYouBadges}
        showTags={showTags}
        tags={tags}
        canEditTags={canEditTags}
        isEnsProfileLoading={isEnsProfileLoading}
      />
      {/* Right section: Follow Button with consistent width */}
      <FollowButton address={address} className='rounded-xl w-[107px]' />
    </div>
  )
}
