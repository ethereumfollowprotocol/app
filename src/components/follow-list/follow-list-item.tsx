import type { Address } from 'viem'
import { useEnsProfile } from '#/hooks/use-ens-profile'
import { FollowButton } from '#/components/follow-button'
import { FollowListItemName } from './follow-list-item-name'
import { FollowListItemTags } from './follow-list-item-tags'

export interface FollowListItemProps {
  className?: string
  profileAddress: Address
  showFollowsYouBadges?: boolean
  showTags?: boolean
  tags: string[]
  isEditor?: boolean
}

export function FollowListItem({
  className = '',
  profileAddress,
  showFollowsYouBadges,
  showTags,
  tags,
  isEditor
}: FollowListItemProps) {
  const { data: ensProfile } = useEnsProfile(profileAddress)

  const profileName = ensProfile?.name
  const profileAvatar = ensProfile?.avatar

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Left section: Avatar and Name */}
      <FollowListItemName
        address={profileAddress}
        avatarUrl={profileAvatar}
        className='flex-none w-fit' // Fixed width for consistent layout
        name={profileName}
        showFollowsYouBadges={showFollowsYouBadges}
        isEditor={isEditor}
      />

      {/* Middle section: Tags (conditionally displayed) */}
      {showTags && tags.length > 0 && (
        <FollowListItemTags
          address={profileAddress}
          className='flex w-fit items-center'
          tags={tags}
        />
      )}

      {/* Right section: Follow Button with consistent width */}
      <FollowButton address={profileAddress} className='rounded-xl w-[107px]' />
    </div>
  )
}
