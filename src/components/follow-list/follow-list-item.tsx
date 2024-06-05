import type { Address } from 'viem'
import type { ENSProfile } from '#/lib/types'
import { FollowButton } from '#/components/follow-button'
import { FollowListItemName } from './follow-list-item-name'
import { useEnsProfile } from '#/hooks/use-ens-profile'

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
  const { data: fetchedEnsProfile } = useEnsProfile(address)

  const profileName = ensProfile ? ensProfile.name : fetchedEnsProfile?.name
  const profileAvatar = ensProfile ? ensProfile.avatar : fetchedEnsProfile?.avatar

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Left section: Avatar and Name */}
      <FollowListItemName
        address={address}
        avatarUrl={profileAvatar}
        name={profileName}
        showFollowsYouBadges={showFollowsYouBadges}
        showTags={showTags}
        tags={tags}
        canEditTags={canEditTags}
      />

      {/* Middle section: Tags (conditionally displayed) */}
      {/* {showTags && tags.length > 0 && (
        <FollowListItemTags
          address={profileAddress}
          className='flex w-fit items-center'
          tags={tags}
        />
      )} */}

      {/* Right section: Follow Button with consistent width */}
      <FollowButton address={address} className='rounded-xl w-[107px]' />
    </div>
  )
}
