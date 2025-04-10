'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { ProfileCard } from 'ethereum-identity-kit'

import { cn } from '#/lib/utilities'
import Achievements from './components/achievements'
import FollowButton from '#/components/follow-button'
import ThreeDotMenu from './components/three-dot-menu'
import { useProfileCard } from './hooks/use-profile-card'
import EnsLogo from 'public/assets/icons/socials/ens.svg'
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
  const { selectedList } = useEFPProfile()
  const { address: connectedAddress } = useAccount()
  const { followState, profileName, isConnectedUserCard } = useProfileCard(profile)

  return (
    <div className={cn('bg-neutral flex w-[364px] flex-col gap-4 rounded-sm pb-3', className)}>
      {isLoading ? (
        <LoadingProfileCard hideFollowButton={true} className='bg-neutral' />
      ) : profile?.address ? (
        <ProfileCard
          list={profileList}
          onStatClick={({ stat }) => {
            router.push(`/${profile.address}?tab=${stat}&ssr=false`)
          }}
          showFollowerState={true}
          addressOrName={profile.address}
          connectedAddress={connectedAddress}
          onProfileClick={() => {
            router.push(`/${profile.address}?ssr=false`)
          }}
          selectedList={selectedList}
          className='bg-neutral'
          options={{
            openListSettings: openListSettingsModal,
            profileData: profile,
            statsData: stats ?? undefined,
            refetchStatsData: refetchStats,
            refetchProfileData: refetchProfile,
            prefetchedStatsLoading: isStatsLoading,
            prefetchedProfileLoading: isLoading,
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
            followButton: !hideFollowButton && (
              <div className='mt-16'>
                {isConnectedUserCard ? (
                  <Link href={`https://app.ens.domains/${profile.ens.name}`} target='_blank'>
                    <button className='flex items-center gap-1 rounded-sm bg-[#0080BC] p-1.5 py-2 font-semibold text-white transition-all hover:scale-110 hover:bg-[#07A9F5]'>
                      <EnsLogo className='h-auto w-5' />
                      <p>Edit Profile</p>
                    </button>
                  </Link>
                ) : (
                  <FollowButton address={profile.address} />
                )}
              </div>
            ),
          }}
          style={{
            width: '100%',
            zIndex: 10,
          }}
        />
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
