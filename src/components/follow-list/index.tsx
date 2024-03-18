import type { FollowerResponse, FollowingResponse } from '#/api/requests'
import { Box } from '@radix-ui/themes'
import { FollowListItem } from './follow-list-item'

interface FollowTableProps {
  profiles: (FollowerResponse | FollowingResponse)[]
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
        // Condense profile data
        const condensedProfile = {
          address: profile.address,
          name: profile.ens?.name,
          avatarUrl: profile.ens?.avatar,
          tags: profile.tags || []
        }

        return (
          <FollowListItem
            profile={condensedProfile}
            showFollowsYouBadge={showFollowsYouBadge}
            showTags={showTags}
            key={condensedProfile.address}
            className={listItemClassName}
          />
        )
      })}
    </Box>
  )
}
