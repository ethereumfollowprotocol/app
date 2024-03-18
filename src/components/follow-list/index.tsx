import { Box } from '@radix-ui/themes'
import { FollowListItem } from './follow-list-item'
import type { Address } from 'viem'

export interface FollowListProfile {
  address: Address
  avatarUrl?: string
  name?: string
  tags: string[]
}

interface FollowTableProps {
  profiles: FollowListProfile[]
  showFollowsYouBadge?: boolean
  showTags?: boolean
  listClassName?: string
  listItemClassName?: string
}

export function FollowList({
  listClassName = '',
  listItemClassName = '',
  profiles,
  showFollowsYouBadge = false,
  showTags = false
}: FollowTableProps) {
  return (
    <Box className={`flex flex-col ${listClassName}`}>
      {profiles.map(profile => {
        return (
          <FollowListItem
            className={listItemClassName}
            key={profile.address}
            profile={profile}
            showFollowsYouBadge={showFollowsYouBadge}
            showTags={showTags}
          />
        )
      })}
    </Box>
  )
}
