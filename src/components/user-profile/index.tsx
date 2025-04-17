import React from 'react'
import { useAccount } from 'wagmi'
import { useWindowSize } from '@uidotdev/usehooks'
import { UserProfile as UserProfileComponent } from 'ethereum-identity-kit'

import FollowButton from '../follow-button'
import type { StatsResponse } from '#/types/requests'
import useFollowingState from '#/hooks/use-following-state'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import type { ProfileDetailsResponse } from '#/types/requests'
import ThreeDotMenu from '../user-profile-card/components/three-dot-menu'
import { useRouter } from 'next/navigation'

interface UserProfileCardProps {
  addressOrName: string
  isMyProfile?: boolean
  profileList?: number | null
  profile?: ProfileDetailsResponse | null
  isLoading: boolean
  isStatsLoading?: boolean
  stats?: StatsResponse | null
  role?: string
  openBlockModal?: () => void
  openListSettingsModal?: () => void
  refetchProfile?: () => void
  refetchStats?: () => void
  openQrCodeModal?: () => void
  className?: string
}

const UserProfile: React.FC<UserProfileCardProps> = ({
  addressOrName,
  isMyProfile,
  profileList,
  profile,
  isLoading,
  isStatsLoading,
  stats,
  role,
  openBlockModal,
  openQrCodeModal,
  openListSettingsModal,
  refetchProfile,
  className,
}) => {
  const router = useRouter()
  const { width } = useWindowSize()
  const { selectedList } = useEFPProfile()
  const { address: userAddress } = useAccount()

  const { followingState } = useFollowingState({ address: profile?.address })

  return (
    <UserProfileComponent
      addressOrName={addressOrName}
      connectedAddress={userAddress}
      list={profileList}
      selectedList={selectedList?.toString()}
      onProfileClick={(addressOrName) => {
        router.push(`/${addressOrName}?ssr=false`)
      }}
      onStatClick={({ addressOrName, stat }) => {
        router.push(`/${addressOrName}?tab=${stat}`)
      }}
      role={role}
      className={className}
      style={{
        paddingBottom: width && width > 768 ? '110px' : '20px',
      }}
      options={{
        profileData: profile ?? undefined,
        statsData: stats ?? undefined,
        prefetchedProfileLoading: isLoading,
        prefetchedStatsLoading: isStatsLoading,
        nameMenu: profile?.address ? (
          <ThreeDotMenu
            address={profile.address}
            profileList={profileList}
            primaryList={Number(profile?.primary_list)}
            profileName={profile?.ens?.name}
            isConnectedUserCard={isMyProfile ?? false}
            showMoreOptions={true}
            followState={followingState}
            openBlockModal={openBlockModal}
            openQrCodeModal={openQrCodeModal}
            openListSettingsModal={openListSettingsModal}
          />
        ) : null,
        openListSettings: openListSettingsModal,
        refetchProfileData: refetchProfile,
        followButton: profile?.address ? <FollowButton address={profile?.address} /> : null,
      }}
    />
  )
}

export default UserProfile
