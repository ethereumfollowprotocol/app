import { Box } from '@radix-ui/themes'
import { FollowButton } from '#/components/follow-button'
import { FollowListItemName } from './follow-list-item-name'
import { FollowListItemTags } from './follow-list-item-tags'
import type { FollowListProfile } from '.'
import { useEnsProfile } from '#/hooks/use-ens-profile'

export interface FollowListItemProps {
  className?: string
  profile: FollowListProfile
  showFollowsYouBadges: boolean
  showTags: boolean
  showAddTag: boolean // Prop to handle showing add tag button in the FollowList
  tags: string[]
}

export function FollowListItem({
  className = '',
  profile,
  showFollowsYouBadges,
  showTags,
  showAddTag,
  tags
}: FollowListItemProps) {
  const { data: ensProfile } = useEnsProfile(profile.address)
  const profileName = ensProfile?.name
  const profileAvatar = ensProfile?.avatar

  return (
    <Box className={`flex items-center justify-between ${className}`}>
      {/* Left section: Avatar and Name */}
      <FollowListItemName
        address={profile.address}
        name={profileName}
        showFollowsYouBadges={showFollowsYouBadges}
        avatarUrl={profileAvatar}
        className='flex-none w-56' // Fixed width for consistent layout
      />

      {/* Middle section: Tags (conditionally displayed) */}
      {showTags && (
        <FollowListItemTags
          address={profile.address}
          tags={tags}
          className='flex items-center'
          showAddTag={showAddTag}
        />
      )}

      {/* Right section: Follow Button with consistent width */}
      <FollowButton address={profile.address} className='rounded-xl' />
    </Box>
  )
}
