import { Box } from '@radix-ui/themes'
import { FollowListItem } from './follow-list-item'
import type { Address } from 'viem'

interface FollowTableProps {
  listClassName?: string
  listItemClassName?: string
  profileAddresses: Address[]
  showAddTag: boolean
  showFollowsYouBadges: boolean // Prop to handle showing "Follows you" badges in the FollowList
  showTags: boolean
}

export function FollowList({
  listClassName = '',
  listItemClassName = '',
  profileAddresses,
  showAddTag = false,
  showFollowsYouBadges = false,
  showTags = false
}: FollowTableProps) {
  return (
    <Box className={`flex flex-col min-w-max ${listClassName}`}>
      {profileAddresses.map(address => {
        return (
          <FollowListItem
            className={listItemClassName}
            key={address}
            profileAddress={address}
            showAddTag={showAddTag}
            showFollowsYouBadges={showFollowsYouBadges}
            showTags={showTags}
          />
        )
      })}
    </Box>
  )
}
