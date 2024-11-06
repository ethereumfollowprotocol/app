'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'
import { FaLink, FaSyncAlt } from 'react-icons/fa'
import { ens_beautify } from '@adraffy/ens-normalize'
import { PiArrowElbowRightUpBold } from 'react-icons/pi'

import { Avatar } from '../avatar'
import Stat from './components/stat'
import { isValidEnsName } from '#/utils/ens'
import LoadingCell from '../loaders/loading-cell'
import { formatNumber } from '#/utils/formatNumber'
import { profileCardSocials } from '#/lib/constants'
import { cn, truncateAddress } from '#/lib/utilities'
import FollowButton from '#/components/follow-button'
import ThreeDotMenu from './components/three-dot-menu'
import ImageWithFallback from '../image-with-fallback'
import { useProfileCard } from './hooks/use-profile-card'
import CommonFollowers from './components/common-followers'
import LeaderboardRanks from './components/leaderboard-ranks'
import DefaultAvatar from 'public/assets/art/default-avatar.svg'
import DefaultHeader from 'public/assets/art/default-header.svg'
import LoadingProfileCard from './components/loading-profile-card'
import ConnectButton from '../navigation/components/connect-button'
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
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  profileList,
  isResponsive = true,
  hideFollowButton,
  profile,
  stats,
  isLoading,
  isStatsLoading,
  showMoreOptions,
  openBlockModal,
  openListSettingsModal,
  isRecommended,
  refetchProfile,
  openQrCodeModal
}) => {
  const [cardTooltipOpen, setCardTooltipOpen] = useState(false)
  const clickAwayCardTooltip = useClickAway<HTMLDivElement>(() => {
    setCardTooltipOpen(false)
  })

  const {
    ranks,
    rankTitles,
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
  const { resolvedTheme } = useTheme()
  const { address: connectedAddress } = useAccount()

  return (
    <div
      className={cn(
        'flex border-[3px] z-10 flex-col border-grey rounded-xl relative',
        isRecommended ? 'bg-neutral' : 'glass-card',
        isResponsive
          ? 'w-full xl:w-[324px] xl:min-w-[324px] 3xl:w-86 3xl:min-w-86'
          : 'w-full xxs:w-92'
      )}
    >
      {isLoading ? (
        <LoadingProfileCard
          isResponsive={isResponsive}
          hideFollowButton={hideFollowButton || isConnectedUserCard}
          isRecommended={isRecommended}
        />
      ) : profile && isProfileValid ? (
        <>
          <div
            className={cn(
              'flex gap-2 items-center h-5 absolute px-2 w-full left-0 top-3 font-bold',
              profileList ? 'justify-between' : 'justify-end'
            )}
          >
            {!!profileList && (
              <p className='text-sm sm:text-sm bg-neutral/80 py-[3px] px-2 rounded-full'>
                {t('list')} #{formatNumber(profileList)}
              </p>
            )}
            <div className='flex items-center gap-1'>
              {profileList && profileList !== Number(profile.primary_list) ? (
                <div ref={clickAwayCardTooltip} className='relative group z-50 cursor-help'>
                  <p
                    onClick={() => setCardTooltipOpen(!cardTooltipOpen)}
                    className='text-[12px] italic text-end rounded-full py-0.5 px-2 bg-neutral/80'
                  >
                    {t('not primary list')}
                  </p>
                  <div
                    className={`${
                      cardTooltipOpen ? 'block' : 'hidden'
                    } group-hover:block transition-all text-sm w-68 p-2 glass-card border-grey bg-neutral/90 border-[3px] mt-2 rounded-md absolute top-5 right-0`}
                  >
                    {t('not primary list tooltip')}
                  </div>
                </div>
              ) : isConnectedUserCard ? (
                <a
                  href={`https://app.ens.domains/${profileName || ''}`}
                  target='_blank'
                  rel='noreferrer'
                  className='flex gap-1.5 items-center hover:scale-110 transition-all bg-neutral/80 rounded-full py-[3px] px-2 pl-1'
                >
                  <Image
                    alt='edit profile'
                    src='/assets/icons/ens.svg'
                    width={22}
                    height={22}
                    className={cn('cursor-pointer hover:opacity-70 transition-all')}
                  />
                  {/* <FaEdit className="text-[17px] -translate-y-[1px]" /> */}
                  <p className={cn(' text-sm')}>{t('edit profile')}</p>
                </a>
              ) : null}
              <button
                className='bg-neutral/80 p-1.5 rounded-full hover:scale-110 transition-all'
                onClick={() => refetchProfile?.()}
              >
                <FaSyncAlt />
              </button>
            </div>
          </div>
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
                  <p className='text-text/80 w-full font-medium text-sm sm:text-sm text-center'>
                    {profile.ens.records?.description ? (
                      profile.ens.records.description.split(' ').map(word =>
                        word.includes('@') ? (
                          <Link
                            key={word}
                            href={`/${word.replace('@', '')}`}
                            className='dark:text-blue-400 dark:hover:text-blue-300 halloween:text-blue-400 halloween:hover:text-blue-300 text-blue-600 hover:text-blue-500'
                          >
                            {word}{' '}
                          </Link>
                        ) : (
                          `${word} `
                        )
                      )
                    ) : (
                      <i>{t('no bio')}</i>
                    )}
                  </p>
                  <div className='w-full flex justify-center gap-2 flex-wrap items-center'>
                    {profile.ens.records?.url && (
                      <a
                        href={`https://${profile.ens.records.url
                          .replace('https://', '')
                          .replace('http://', '')}`}
                        target='_blank'
                        rel='noreferrer'
                        className='flex max-w-48 items-center text-sm gap-1 mb-1 bg-grey rounded-full py-0.5 px-2 hover:scale-110 transition-all'
                      >
                        <p className='dark:text-blue-400 halloween:text-blue-400 text-blue-600 max-w-[90%] truncate font-semibold'>
                          {profile.ens.records?.url.slice(-1) === '/'
                            ? profile.ens.records?.url.replace('https://', '').slice(0, -1)
                            : profile.ens.records?.url.replace('https://', '')}
                        </p>
                        <FaLink />
                      </a>
                    )}
                    {(profile.ens.contenthash || profile.ens.records?.contenthash) && (
                      <a
                        href={`https://${profile.ens.name}.limo`}
                        target='_blank'
                        rel='noreferrer'
                        className='flex items-center text-sm gap-1 mb-1 bg-grey rounded-full py-0.5 px-2 pr-0.5 hover:scale-110 transition-all'
                      >
                        <p className='dark:text-blue-400 halloween:text-blue-400 text-blue-600 font-semibold'>
                          dweb
                        </p>
                        <Image
                          src='/assets/icons/dweb.svg'
                          alt='dweb'
                          width={20}
                          height={20}
                          className='rounded-full'
                        />
                      </a>
                    )}
                  </div>
                  <div className='flex items-center gap-2'>
                    {profileCardSocials.map(social => (
                      <a
                        key={social.name}
                        href={social.url(
                          social.name === 'etherscan'
                            ? profile.address
                            : profile.ens.records?.[social.name] || ''
                        )}
                        target='_blank'
                        rel='noreferrer'
                        className={
                          profile.ens.records?.[social.name] || social.name === 'etherscan'
                            ? 'opacity-100 hover:opacity-80 hover:scale-110 transition-all'
                            : 'opacity-20 pointer-events-none'
                        }
                      >
                        <Image
                          src={social.icon(resolvedTheme || '')}
                          alt={social.name}
                          width={36}
                          height={36}
                          className='rounded-full w-8 h-8 3xl:w-9 3xl:h-9'
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-full flex-wrap justify-center gap-10 gap-y-6 sm:gap-y-5 3xl:gap-y-6 sm:gap-x-[50px] 3xl:gap-x-[60px] items-center mx-auto text-center'>
              <Stat
                onClick={() => onProfileStatClick('following')}
                isLoading={!!isStatsLoading}
                stat={stats?.following_count}
                label={t('following')}
              />
              <Stat
                onClick={() => onProfileStatClick('followers')}
                isLoading={!!isStatsLoading}
                stat={stats?.followers_count}
                label={t('followers')}
              />
              <LeaderboardRanks
                ranks={ranks}
                rankTitles={rankTitles}
                isResponsive={isResponsive}
                isRecommended={isRecommended}
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
        <div className='flex items-center flex-col gap-4 justify-center w-full h-[536px]'>
          <p className='text-xl px-8 font-bold'>{t('connect to see more')}</p>
          <ConnectButton isResponsive={false} />
        </div>
      ) : (
        <div
          className={`w-full h-20 ${
            hideFollowButton ? 'xl:h-[360px]' : 'xl:h-[420px]'
          } text-lg 3xl:text-xl flex items-center justify-center font-bold italic`}
        >
          {t('profile error')}
        </div>
      )}
    </div>
  )
}

export default UserProfileCard
