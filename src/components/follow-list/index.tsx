import { Box } from '@radix-ui/themes'
import { FollowListItem } from './follow-list-item'
import type { Address } from 'viem'

export interface FollowListProfile {
  address: Address
  name?: string
  avatarUrl?: string
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
  profiles,
  showFollowsYouBadge = false,
  showTags = false,
  listClassName = '',
  listItemClassName = ''
}: FollowTableProps) {
  return (
    <Box className={`flex flex-col ${listClassName}`}>
      {profiles.map(profile => {
        return (
          <FollowListItem
            profile={profile}
            showFollowsYouBadge={showFollowsYouBadge}
            showTags={showTags}
            key={profile.address}
            className={listItemClassName}
          />
        )
      })}
    </Box>
  )
}
