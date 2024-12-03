'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { ens_beautify } from '@adraffy/ens-normalize'
import { PiArrowElbowRightUpBold } from 'react-icons/pi'

import { Avatar } from '../avatar'
import Stat from './components/stat'
import Links from './components/links'
import TopRow from './components/top-row'
import Socials from './components/socials'
import { isValidEnsName } from '#/utils/ens'
import LoadingCell from '../loaders/loading-cell'
import Description from './components/description'
import Achievements from './components/achievements'
import { cn, truncateAddress } from '#/lib/utilities'
import FollowButton from '#/components/follow-button'
import ThreeDotMenu from './components/three-dot-menu'
import ImageWithFallback from '../image-with-fallback'
import { useProfileCard } from './hooks/use-profile-card'
import CommonFollowers from './components/common-followers'
import DefaultAvatar from 'public/assets/art/default-avatar.svg'
import DefaultHeader from 'public/assets/art/default-header.svg'
import LoadingProfileCard from './components/loading-profile-card'
import ConnectButton from '../connect-button'
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
  isStatsLoading,
  showMoreOptions,
  openBlockModal,
  openListSettingsModal,
  isRecommended,
  refetchProfile,
  openQrCodeModal,
  displayAchievements = true
}) => {
  const {
    followState,
    followerTag,
    profileName,
    profileAvatar,
    searchURLParam,
    isProfileValid,
    isProfileLoading,
    onProfileStatClick,
    isConnectedUserCard,
    hasSearchedDifferentName
  } = useProfileCard(profile)
  const router = useRouter()
  const { t } = useTranslation()
  const { address: connectedAddress } = useAccount()

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        isResponsive
          ? 'w-full xl:w-[324px] xl:min-w-[324px] 3xl:w-86 3xl:min-w-86'
          : 'w-full xxs:w-92'
      )}
    >
      <div
        className={cn(
          'flex border-[3px] z-10 flex-col border-grey rounded-xl relative',
          isRecommended ? 'bg-neutral' : 'glass-card'
        )}
      >
        {isLoading ? (
          <LoadingProfileCard
            isResponsive={isResponsive}
            hideFollowButton={hideFollowButton || isConnectedUserCard}
          />
        ) : profile && isProfileValid ? (
          <>
            <TopRow
              profileList={profileList}
              name={profileName}
              primaryList={Number(profile.primary_list)}
              isConnectedUserCard={isConnectedUserCard}
              refetchProfile={refetchProfile}
            />
            {isProfileLoading ? (
              <LoadingCell className='w-full h-[120px] absolute top-0 left-0 rounded-t-lg' />
            ) : (
              <ImageWithFallback
                src={profile.ens.records?.header || DefaultHeader}
                fallback={DefaultHeader}
                alt='profile header'
                width={360}
                height={120}
                className={cn(
                  'w-full h-[120px] absolute object-cover rounded-t-lg top-0 left-0 -z-10'
                )}
                unoptimized={true}
              />
            )}
            <div className='flex w-full items-center flex-col pt-10 pb-4 px-4 sm:p-6 sm:pt-9 gap-5 sm:gap-6 3xl:gap-7'>
              <div className='flex w-full flex-col justify-center items-center gap-2.5 3xl:gap-3'>
                {isProfileLoading ? (
                  <LoadingCell
                    className={
                      isResponsive
                        ? 'h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[100px] xl:w-[100px] rounded-full'
                        : 'h-[100px] w-[100px] rounded-full'
                    }
                  />
                ) : (
                  <Avatar
                    avatarUrl={profileAvatar || DefaultAvatar}
                    name={profileName || profile.address}
                    onClick={() => router.push(`/${profile.address}`)}
                    size={
                      isResponsive
                        ? 'h-[100px] w-[100px] cursor-pointer hover:scale-110 transition-transform'
                        : 'h-[100px] w-[100px] cursor-pointer  hover:scale-110 transition-transform'
                    }
                  />
                )}
                <div className='flex w-full items-center flex-col gap-3 justify-center'>
                  <div className='flex flex-col items-center justify-center gap-1.5 w-full'>
                    {isProfileLoading ? (
                      <LoadingCell className='w-48 sm:w-68 xl:w-3/4 h-7 rounded-lg' />
                    ) : (
                      <div
                        className={cn(
                          'font-bold flex gap-2 items-center relative text-center',
                          isResponsive
                            ? 'max-w-[90%] xl:max-w-72 relative 3xl:max-w-[325px] sm:text-2xl text-xl'
                            : 'max-w-[332px] text-2xl',
                          hasSearchedDifferentName && 'mb-[22px]'
                        )}
                      >
                        <Link
                          href={`/${profile.address}`}
                          className={showMoreOptions ? 'w-[87.5%]' : 'w-full'}
                        >
                          <p className='truncate hover:opacity-70 hover:scale-105 text-[22px] 3xl:text-2xl transition-all'>
                            {profileName && isValidEnsName(profileName)
                              ? ens_beautify(profileName)
                              : truncateAddress(profile.address)}
                          </p>
                        </Link>
                        {hasSearchedDifferentName && (
                          <div className='absolute -bottom-[22px] w-full flex justify-center'>
                            <div className='flex items-center gap-1 rounded-full px-2 py-0.5 bg-text text-neutral'>
                              <p className='text-xs'>{searchURLParam}</p>
                              <PiArrowElbowRightUpBold className='text-sm -translate-y-[2px]' />
                            </div>
                          </div>
                        )}
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
                      </div>
                    )}
                    {followerTag && connectedAddress && !isConnectedUserCard && (
                      <div
                        className={`rounded-full font-bold text-[10px] mb-1 flex items-center justify-center text-darkGrey bg-zinc-300 h-5 px-2 w-fit ${followerTag.className}`}
                      >
                        {t(followerTag.text)}
                      </div>
                    )}
                    {!(hideFollowButton || isConnectedUserCard) && profile.address && (
                      <FollowButton address={profile.address} />
                    )}
                  </div>
                  <div className='flex flex-col gap-2 w-full items-center'>
                    <Description profile={profile} />
                    <Links profile={profile} />
                    <Socials profile={profile} />
                  </div>
                </div>
              </div>
              <div className='flex w-full flex-wrap justify-center gap-10 gap-y-6 sm:gap-y-5 3xl:gap-y-6 sm:gap-x-[50px] 3xl:gap-x-[60px] items-center mx-auto text-center'>
                <Stat
                  onClick={() => onProfileStatClick('following')}
                  isLoading={!!isStatsLoading}
                  value={stats?.following_count}
                  label={t('following')}
                />
                <Stat
                  onClick={() => onProfileStatClick('followers')}
                  isLoading={!!isStatsLoading}
                  value={stats?.followers_count}
                  label={t('followers')}
                />
              </div>
            </div>
            {!isConnectedUserCard && <CommonFollowers address={profile.address} />}
          </>
        ) : !connectedAddress && isConnectedUserCard ? (
          <LoadingProfileCard
            isResponsive={isResponsive}
            hideFollowButton={true}
            isStatic={!isLoading}
          />
        ) : isRecommended ? (
          <div className='flex items-center flex-col gap-4 justify-center mx-auto w-3/4 h-[536px]'>
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
