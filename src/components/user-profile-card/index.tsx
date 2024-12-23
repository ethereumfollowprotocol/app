'use client'

import { useAccount } from 'wagmi'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { ProfileCard } from 'ethereum-identity-kit'

import { cn } from '#/lib/utilities'
import ConnectButton from '../connect-button'
import Achievements from './components/achievements'
import FollowButton from '#/components/follow-button'
import ThreeDotMenu from './components/three-dot-menu'
import { useProfileCard } from './hooks/use-profile-card'
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
  openQrCodeModal?: () => void
  displayAchievements?: boolean
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  stats,
  profile,
  isLoading,
  profileList,
  hideFollowButton,
  isResponsive = true,
  showMoreOptions,
  openBlockModal,
  openListSettingsModal,
  isRecommended,
  refetchProfile,
  openQrCodeModal,
  isStatsLoading,
  displayAchievements = true
}) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const { address: connectedAddress } = useAccount()
  const { followState, profileName, isConnectedUserCard } = useProfileCard(profile)

  console.log(profile, profileList)

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        isResponsive
          ? 'w-full xl:w-[324px] xl:min-w-[324px] 3xl:w-86 3xl:min-w-86'
          : 'w-full xxs:w-92'
      )}
    >
      {isLoading ? (
        <LoadingProfileCard
          isResponsive={isResponsive}
          hideFollowButton={true}
          className={isRecommended ? 'bg-neutral' : 'glass-card'}
        />
      ) : profile?.address ? (
        <ProfileCard
          list={profileList}
          onStatClick={({ stat }) => {
            router.push(`/${profile.address}?tab=${stat}`)
          }}
          showFollowerState={true}
          darkMode={resolvedTheme === 'dark'}
          addressOrName={profile.address}
          connectedAddress={connectedAddress}
          onProfileClick={() => {
            router.push(`/${profile.address}`)
          }}
          className={isRecommended ? 'bg-neutral' : 'glass-card bg-transparent'}
          options={{
            profileData: profile,
            statsData: stats,
            refetchProfileData: refetchProfile,
            prefetchedStatsLoading: isStatsLoading,
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
            followButton: !(hideFollowButton || isConnectedUserCard) && (
              <FollowButton address={profile.address} />
            )
          }}
          style={{
            width: '100%',
            zIndex: 10
          }}
        />
      ) : (
        <div
          className={cn(
            'flex border-[3px] z-10 flex-col border-grey rounded-xl relative',
            isRecommended ? 'bg-neutral' : 'glass-card'
          )}
        >
          {isRecommended ? (
            <div className='flex items-center flex-col gap-4 justify-center mx-auto w-3/4 h-[436px]'>
              <p className='text-xl px-8 font-bold'>{t('connect to see more')}</p>
              <ConnectButton isResponsive={false} />
            </div>
          ) : (
            <div
              className={cn(
                'w-full h-20 text-lg 3xl:text-xl flex items-center justify-center font-bold italic',
                hideFollowButton ? 'xl:h-[360px]' : 'xl:h-[420px]'
              )}
            >
              {t('profile error')}
            </div>
          )}
        </div>
      )}
      {displayAchievements && !isRecommended && (
        <Achievements
          profile={profile}
          list={profileList}
          isLoading={!!isLoading}
          isResponsive={isResponsive}
          isRecommended={!!isRecommended}
        />
      )}
    </div>
  )
}

export default UserProfileCard
