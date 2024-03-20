import { Box } from '@radix-ui/themes'
import { FollowListItem } from './follow-list-item'
import type { Address } from 'viem'

export interface FollowListProfile {
  address: Address
  tags: string[]
}

interface FollowTableProps {
  listClassName?: string
  listItemClassName?: string
  profiles: FollowListProfile[]
  showAddTag: boolean
  showFollowsYouBadges: boolean // Prop to handle showing "Follows you" badges in the FollowList
  showTags: boolean
}

export function FollowList({
  listClassName = '',
  listItemClassName = '',
  profiles,
  showAddTag = false,
  showFollowsYouBadges = false,
  showTags = false
}: FollowTableProps) {
  return (
    <Box className={`flex flex-col min-w-max ${listClassName}`}>
      {profiles.map(profile => {
        return (
          <FollowListItem
            className={listItemClassName}
            key={profile.address}
            profile={profile}
            showAddTag={showAddTag}
            showFollowsYouBadges={showFollowsYouBadges}
            showTags={showTags}
          />
        )
      })}
    </Box>
  )
}
