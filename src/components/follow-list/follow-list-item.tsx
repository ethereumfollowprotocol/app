import { Box } from '@radix-ui/themes'
import { FollowButton } from '#/components/follow-button'
import { FollowListItemName } from './follow-list-item-name'
import { FollowListItemTags } from './follow-list-item-tags'
import type { FollowListProfile } from '.'

export interface FollowListItemProps {
  profile: FollowListProfile
  showFollowsYouBadge: boolean
  showTags: boolean
  className?: string
  tableRowClassName?: string
}

export function FollowListItem({
  profile,
  showFollowsYouBadge,
  showTags,
  className = ''
}: FollowListItemProps) {
  return (
    <Box className={`flex items-center justify-between ${className}`}>
      {/* Left section: Avatar and Name */}
      <FollowListItemName
        name={profile.name || profile.address}
        address={profile.address}
        showFollowsYouBadge={showFollowsYouBadge}
        avatarUrl={profile.avatarUrl}
        className='flex-none w-56' // Fixed width for consistent layout
      />

      {/* Middle section: Tags (conditionally displayed) */}
      {showTags && (
        <FollowListItemTags
          address={profile.address}
          tags={profile.tags}
          className='flex items-start'
        />
      )}

      {/* Right section: Follow Button with consistent width */}
      <FollowButton address={profile.address} />
    </Box>
  )
}
