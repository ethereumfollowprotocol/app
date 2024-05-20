import type { Address } from 'viem'
import { FollowListItem } from './follow-list-item'

interface FollowListProfile {
  address: Address
  tags: string[]
}

interface FollowTableProps {
  listClassName?: string
  listItemClassName?: string
  profiles: FollowListProfile[]
  showFollowsYouBadges: boolean // Prop to handle showing "Follows you" badges in the FollowList
  showTags: boolean
}

export function FollowList({
  listClassName = '',
  listItemClassName = '',
  profiles,
  showFollowsYouBadges,
  showTags
}: FollowTableProps) {
  return (
    <div className={`flex flex-col min-w-max ${listClassName}`}>
      {profiles.map(({ address, tags }) => {
        return (
          <FollowListItem
            className={listItemClassName}
            key={address}
            profileAddress={address}
            showFollowsYouBadges={showFollowsYouBadges}
            showTags={showTags}
            tags={tags}
          />
        )
      })}
    </div>
  )
}
