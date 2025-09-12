import React from 'react'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { type InitialFollowingState, isLinkValid, ProfileTooltip } from 'ethereum-identity-kit'

import ProfileListItemDetails from './details'
import { fetchAccount } from '#/api/fetch-account'
import type { ENSProfile } from '#/types/requests'
import FollowButton from '#/components/follow-button'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import type { ProfileStatsType, TagsDropdownPositionType } from '#/types/common'
import TopEightAddButton from '#/components/top-eight/components/top-eight-add-button'

export interface ProfileListItemProps {
  address: Address
  ensProfile?: ENSProfile
  showFollowsYouBadges?: boolean
  showTags?: boolean
  tags: string[]
  counts?: ProfileStatsType
  canEditTags?: boolean
  isBlockedList?: boolean
  isBlockedBy?: boolean
  isTopEight?: boolean
  tagsDropdownPosition?: TagsDropdownPositionType
  initialFollowState?: InitialFollowingState
}

const ProfileListItem: React.FC<ProfileListItemProps> = React.memo(
  ({
    address,
    ensProfile,
    showFollowsYouBadges,
    showTags,
    tags,
    counts,
    canEditTags,
    isBlockedList,
    isBlockedBy,
    isTopEight,
    tagsDropdownPosition,
    initialFollowState,
  }) => {
    const { data: fetchedAccount, isLoading } = useQuery({
      queryKey: ['account', address],
      queryFn: async () => await fetchAccount(address),
    })
    const router = useRouter()
    const { address: connectedAddress } = useAccount()
    const { selectedList } = useEFPProfile()

    const isEnsProfileLoading = ensProfile ? false : isLoading
    const fetchedEnsProfile = ensProfile ?? fetchedAccount?.ens

    const profileName = fetchedEnsProfile?.name
    const profileAvatar = fetchedEnsProfile?.avatar
    const headerImage = isLinkValid(fetchedEnsProfile?.records?.header) ? fetchedEnsProfile?.records?.header : undefined

    return (
      <ProfileTooltip
        addressOrName={address}
        showDelay={1000}
        connectedAddress={connectedAddress}
        selectedList={selectedList}
        showFollowerState={showFollowsYouBadges}
        showFollowButton={false}
        showBio={true}
        showSocials={true}
        showStatus={true}
        horizontalOffset={12}
        onStatClick={({ addressOrName, stat }) => {
          router.push(`/${addressOrName}?tab=${stat}&ssr=false`)
        }}
        onProfileClick={(addressOrName: Address | string) => {
          router.push(`/${addressOrName}?ssr=false`)
        }}
      >
        <div className='hover:bg-text/5 relative'>
          {headerImage && (
            <Image
              src={headerImage}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
              alt='header'
              width={600}
              height={200}
              className='absolute top-0 left-0 h-full w-full object-cover opacity-25'
            />
          )}
          <div className='z-10 flex h-20 items-center justify-between rounded-sm px-5 transition-all'>
            {/* Left section: Avatar, Name, and Tags */}
            <ProfileListItemDetails
              address={address}
              avatarUrl={profileAvatar}
              name={profileName}
              counts={counts}
              showFollowsYouBadges={showFollowsYouBadges}
              tags={tags}
              showTags={showTags}
              canEditTags={canEditTags}
              isEnsProfileLoading={isEnsProfileLoading}
              isBlockedList={isBlockedList}
              tagsDropdownPosition={tagsDropdownPosition}
            />
            {/* Right section: Follow Button */}
            {isTopEight ? (
              <TopEightAddButton address={address} tags={tags} />
            ) : (
              <FollowButton isBlockedBy={isBlockedBy} address={address} initialState={initialFollowState} />
            )}
          </div>
        </div>
      </ProfileTooltip>
    )
  }
)

ProfileListItem.displayName = 'ProfileListItem'

export default ProfileListItem
