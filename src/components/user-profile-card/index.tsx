'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { ProfileCard } from 'ethereum-identity-kit'

import { cn } from '#/lib/utilities'
import Achievements from './components/achievements'
import FollowButton from '#/components/follow-button'
import ENSRecordsModal from '#/components/ens-records-modal'
import ThreeDotMenu from './components/three-dot-menu'
import { useProfileCard } from './hooks/use-profile-card'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import LoadingProfileCard from './components/loading-profile-card'
import type { ProfileDetailsResponse, StatsResponse } from '#/types/requests'

interface UserProfileCardProps {
  profileList?: number | null
  isResponsive?: boolean
  hideFollowButton?: boolean
  profile?: ProfileDetailsResponse | null
  isLoading?: boolean
  isStatsLoading?: boolean
  stats?: StatsResponse | null
  showMoreOptions?: boolean
  openBlockModal?: () => void
  openListSettingsModal?: () => void
  isRecommended?: boolean
  refetchProfile?: () => void
  refetchStats?: () => void
  openQrCodeModal?: () => void
  displayAchievements?: boolean
  className?: string
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  stats,
  profile,
  isLoading,
  profileList,
  hideFollowButton,
  showMoreOptions,
  openBlockModal,
  openListSettingsModal,
  isRecommended,
  refetchProfile,
  refetchStats,
  openQrCodeModal,
  isStatsLoading,
  displayAchievements = true,
  className,
}) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { address: connectedAddress } = useAccount()
  const { selectedList } = useEFPProfile()
  const [ensRecordsOpen, setEnsRecordsOpen] = useState(false)
  const { followState, profileName, isConnectedUserCard } = useProfileCard(profile)
  const ensRecordsName = profile?.ens?.name ?? profileName

  return (
    <div className={cn('bg-neutral flex w-[364px] flex-col gap-4 rounded-sm pb-3', className)}>
      {isLoading ? (
        <LoadingProfileCard hideFollowButton={true} className='bg-neutral' />
      ) : profile?.address ? (
        <>
          <ProfileCard
            list={profileList}
            connectedAddress={connectedAddress}
            onStatClick={({ stat }) => {
              router.push(`/${profile.address}?tab=${stat}&ssr=false`)
            }}
            showFollowerState={true}
            showFollowButton={!hideFollowButton}
            addressOrName={profile.address}
            onProfileClick={(addressOrName) => {
              router.push(`/${addressOrName}?ssr=false`)
            }}
            selectedList={selectedList}
            className='bg-neutral'
            extraOptions={{
              openListSettings: openListSettingsModal,
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
              nameMenu: (
                <ThreeDotMenu
                  address={profile.address}
                  profileList={profileList}
                  primaryList={Number(profile.primary_list)}
                  profileName={profileName}
                  showMoreOptions={!!showMoreOptions}
                  isConnectedUserCard={isConnectedUserCard}
                  followState={followState}
                  openBlockModal={openBlockModal}
                  openQrCodeModal={openQrCodeModal}
                  openListSettingsModal={openListSettingsModal}
                />
              ),
              customFollowButton: isConnectedUserCard ? undefined : (
                <div className='mt-16'>
                  <FollowButton address={profile.address} />
                </div>
              ),
            }}
            style={{
              width: '100%',
              zIndex: 10,
            }}
          />
          {ensRecordsOpen && <ENSRecordsModal name={ensRecordsName} onClose={() => setEnsRecordsOpen(false)} />}
        </>
      ) : (
        <div className={cn('relative z-10 flex flex-col rounded-sm', isRecommended ? 'bg-neutral' : 'glass-card')}>
          {isRecommended ? (
            <div className='mx-auto flex h-[436px] w-3/4 flex-col items-center justify-center gap-4'>
              <p className='px-8 text-xl font-bold'>{t('connect to see more')}</p>
              {/* <ConnectWalletButton /> */}
            </div>
          ) : (
            <div className='3xl:text-xl flex h-[360px] w-full items-center justify-center text-lg font-bold italic'>
              {t('profile error')}
            </div>
          )}
        </div>
      )}
      {!isRecommended && displayAchievements && (
        <Achievements profile={profile} list={profileList} isLoading={!!isLoading} />
      )}
    </div>
  )
}

export default UserProfileCard
