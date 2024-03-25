import { Box } from '@radix-ui/themes'
import { FollowButton } from '#/components/follow-button'
import { FollowListItemName } from './follow-list-item-name'
import { FollowListItemTags } from './follow-list-item-tags'
import { useEnsProfile } from '#/hooks/use-ens-profile'
import type { Address } from 'viem'

export interface FollowListItemProps {
  className?: string
  profileAddress: Address
  showFollowsYouBadges: boolean
  showTags: boolean
  showAddTag: boolean // Prop to handle showing add tag button in the FollowList
  tags: string[]
}

export function FollowListItem({
  className = '',
  profileAddress,
  showFollowsYouBadges,
  showTags,
  showAddTag,
  tags
}: FollowListItemProps) {
  const { data: ensProfile } = useEnsProfile(profileAddress)
  const profileName = ensProfile?.name
  const profileAvatar = ensProfile?.avatar

  return (
    <Box className={`flex items-center justify-between ${className}`}>
      {/* Left section: Avatar and Name */}
      <FollowListItemName
        address={profileAddress}
        avatarUrl={profileAvatar}
        className='flex-none w-56' // Fixed width for consistent layout
        name={profileName}
        showFollowsYouBadges={showFollowsYouBadges}
      />

      {/* Middle section: Tags (conditionally displayed) */}
      {showTags && (
        <FollowListItemTags
          address={profileAddress}
          className='flex items-center'
          showAddTag={showAddTag}
          tags={tags}
        />
      )}

      {/* Right section: Follow Button with consistent width */}
      <FollowButton address={profileAddress} className='rounded-xl' />
    </Box>
  )
}
