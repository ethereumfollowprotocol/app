'use client'

import React, { useState, type Dispatch, type SetStateAction } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useWindowSize } from '@uidotdev/usehooks'
import { FullWidthProfile } from 'ethereum-identity-kit'

import FollowButton from '../follow-button'
import ENSRecordsModal from '#/components/ens-records-modal'
import type { StatsResponse } from '#/types/requests'
import useFollowingState from '#/hooks/use-following-state'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import type { ProfileDetailsResponse } from '#/types/requests'
import ThreeDotMenu from '../user-profile-card/components/three-dot-menu'

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
  setFetchFreshProfile?: Dispatch<SetStateAction<boolean>> | ((state: boolean) => void)
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
  refetchStats,
  className,
  setFetchFreshProfile,
}) => {
  const router = useRouter()
  const { width } = useWindowSize()
  const { selectedList } = useEFPProfile()
  const { address: userAddress } = useAccount()
  const [ensRecordsOpen, setEnsRecordsOpen] = useState(false)

  const { followingState } = useFollowingState({ address: profile?.address })
  const ensRecordsName = profile?.ens?.name ?? (addressOrName.endsWith('.eth') ? addressOrName : undefined)

  return (
    <>
      <FullWidthProfile
        addressOrName={addressOrName}
        connectedAddress={userAddress}
        list={profileList}
        selectedList={selectedList?.toString()}
        onProfileClick={(addressOrName: string) => {
          router.push(`/${addressOrName}?ssr=false`)
        }}
        onStatClick={({ addressOrName, stat }: { addressOrName: string; stat: string }) => {
          router.push(`/${addressOrName}?tab=${stat}`)
        }}
        className={className}
        style={{
          paddingBottom: width && width < 768 ? '20px' : '110px',
        }}
        showFollowButton={profile?.address ? true : false}
        showFollowerState={true}
        extraOptions={{
          role: role,
          onEditProfileClick: () => setEnsRecordsOpen(true),
          prefetched: {
            profile: {
              data: profile ?? undefined,
              isLoading: !!isLoading,
              refetch: refetchProfile ?? (() => {}),
            },
            stats: {
              data: stats ?? undefined,
              isLoading: !!isStatsLoading,
              refetch: refetchStats ?? (() => {}),
            },
          },
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
          customFollowButton: isMyProfile ? undefined : <FollowButton address={profile?.address} />,
        }}
      />
      {ensRecordsOpen && (
        <ENSRecordsModal
          name={ensRecordsName}
          onClose={() => setEnsRecordsOpen(false)}
          setFetchFreshProfile={setFetchFreshProfile}
        />
      )}
    </>
  )
}

export default UserProfile
