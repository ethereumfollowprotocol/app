import { Box } from '@radix-ui/themes'
import { FollowListItem } from './follow-list-item'
import type { Address } from 'viem'

export interface FollowListProfile {
  address: Address
  tags: string[]
}

interface FollowTableProps {
  profiles: FollowListProfile[]
  showFollowsYouBadges?: boolean // Prop to handle showing "Follows you" badges in the FollowList
  showTags?: boolean
  listClassName?: string
  listItemClassName?: string
}

export function FollowList({
  listClassName = '',
  listItemClassName = '',
  profiles,
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
            showFollowsYouBadges={showFollowsYouBadges}
            showTags={showTags}
          />
        )
      })}
    </Box>
  )
}
