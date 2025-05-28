import type { Address } from 'viem'

import { cn } from '#/lib/utilities'
import type { ENSProfile } from '#/types/requests'
import type { ProfileStatsType } from '#/types/common'
import LoadingRow from './components/list-item/loading-list-item'
import ProfileListItem from './components/list-item/profile-list-item'
import type { InitialFollowingState } from '@encrypteddegen/identity-kit'

export interface ProfileListProfile {
  address: Address
  ens?: ENSProfile
  tags: string[]
  counts?: ProfileStatsType
}

interface ProfileListProps {
  className?: string
  profiles?: ProfileListProfile[]
  showFollowsYouBadges?: boolean // Handle showing "Follows you" badges in the ProfileList
  showTags?: boolean
  loadingRows?: number
  isLoading: boolean
  isLoadingMore?: boolean
  canEditTags?: boolean
  isBlockedList?: boolean // If the list is displaying blocked and blocked by profiles
  isBlockedBy?: boolean // Used to handle the "Block Back" on FollowButton
  isTopEight?: boolean
  initialFollowState?: InitialFollowingState
}

const ProfileList: React.FC<ProfileListProps> = ({
  className,
  profiles,
  showFollowsYouBadges,
  showTags,
  loadingRows = 7,
  isLoading,
  isLoadingMore,
  canEditTags,
  isBlockedList,
  isBlockedBy,
  isTopEight,
  initialFollowState,
}) => {
  const displayLoadingRows = isLoadingMore || isLoading
  const isShortList = (profiles?.length || 0) <= 3
  const isEmpty = !isLoading && (profiles?.length || 0) === 0

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-0',
        !isEmpty && isShortList && showTags && canEditTags ? 'pb-32' : 'pb-0',
        className
      )}
    >
      {profiles?.map(({ address, tags, ens, counts }, index) => (
        <ProfileListItem
          key={address + tags.join(',')}
          address={address}
          ensProfile={ens}
          showFollowsYouBadges={showFollowsYouBadges}
          showTags={showTags}
          tags={tags}
          counts={counts}
          canEditTags={canEditTags}
          isBlockedList={isBlockedList}
          isBlockedBy={isBlockedBy}
          isTopEight={isTopEight}
          initialFollowState={initialFollowState}
          tagsDropdownPosition={
            (index === profiles.length - 1 || index === profiles.length - 2) && index >= 2 ? 'top' : 'bottom'
          }
        />
      ))}
      {displayLoadingRows && new Array(loadingRows).fill(1).map((_, i) => <LoadingRow key={i} showTags={showTags} />)}
    </div>
  )
}

export default ProfileList
