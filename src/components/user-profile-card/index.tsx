'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useClickAway } from '@uidotdev/usehooks'
import { usePathname, useRouter } from 'next/navigation'

import {
  listOpAddTag,
  listOpRemoveTag,
  listOpAddListRecord,
  listOpRemoveListRecord
} from '#/utils/list-ops'
import { Avatar } from '../avatar'
import LoadingCell from '../loading-cell'
import { resolveEnsProfile } from '#/utils/ens'
import { useCart } from '#/contexts/cart-context'
import { truncateAddress } from '#/lib/utilities'
import FollowButton from '#/components/follow-button'
import useFollowState from '#/hooks/use-follow-state'
import LoadingProfileCard from './loading-profile-card'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import type { ProfileDetailsResponse } from '#/types/requests'
import DefaultAvatar from 'public/assets/art/default-avatar.svg'
import { formatNumber } from '#/utils/formatNumber'

interface UserProfileCardProps {
  profileList?: number | null
  isResponsive?: boolean
  hideFollowButton?: boolean
  profile?: ProfileDetailsResponse | null
  borderColor?: string
  isLoading?: boolean
  showMoreOptions?: boolean
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  profileList,
  isResponsive = true,
  hideFollowButton,
  profile,
  borderColor,
  isLoading,
  showMoreOptions
}) => {
  const [moreOptionsDropdownOpen, setMoreOptionsDropdownOpen] = useState(false)
  const clickAwayMoreOptionsRef = useClickAway<HTMLDivElement>(() => {
    setMoreOptionsDropdownOpen(false)
  })

  const { data: fetchedEnsProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['ens metadata', profile],
    queryFn: async () => {
      if (!profile) return null
      return await resolveEnsProfile(profile?.address)
    }
  })

  const profileName = fetchedEnsProfile?.name
  const profileAvatar = fetchedEnsProfile?.avatar

  const { followState } = useFollowState({
    address: profile?.address,
    type: 'following'
  })
  const { followerTag } = useFollowState({
    address: profile?.address,
    type: 'follower'
  })

  const router = useRouter()
  const pathname = usePathname()
  const { selectedList } = useEFPProfile()
  const { address: connectedAddress } = useAccount()
  const { t } = useTranslation()

  const isConnectedUserCard =
    pathname === '/' ||
    (pathname?.toLowerCase() === `/${connectedAddress?.toLowerCase()}` &&
      (profile?.primary_list && selectedList
        ? selectedList === Number(profile?.primary_list)
        : true)) ||
    pathname === `/${selectedList?.toString() ?? connectedAddress}`

  const isProfileValid = !(
    Object.keys(profile || {}).includes('response') ||
    Object.keys(profile || {}).includes('message')
  )

  const { addCartItem, removeCartItem, hasListOpAddTag, hasListOpRemoveTag } = useCart()
  const isPendingBlock = profile && hasListOpAddTag({ address: profile.address, tag: 'block' })
  const isPendingUnblock = profile && hasListOpRemoveTag({ address: profile.address, tag: 'block' })
  const isPendingMute = profile && hasListOpAddTag({ address: profile.address, tag: 'mute' })
  const isPendingUnmute = profile && hasListOpRemoveTag({ address: profile.address, tag: 'mute' })

  const onClickOption = (buttonText: 'Block' | 'Mute') => {
    if (!profile) return

    setMoreOptionsDropdownOpen(false)

    if (buttonText === 'Block') {
      if (isPendingBlock || isPendingUnblock) {
        if (isPendingBlock) {
          if (followState === 'none') removeCartItem(listOpAddListRecord(profile?.address))
          if (followState === 'mutes') removeCartItem(listOpRemoveTag(profile?.address, 'mute'))
        }

        if (isPendingUnblock) {
          if (followState === 'blocks') removeCartItem(listOpRemoveListRecord(profile?.address))
          if (isPendingMute && followState === 'blocks')
            removeCartItem(listOpAddTag(profile?.address, 'mute'))
        }
        return removeCartItem(
          followState === 'blocks'
            ? listOpRemoveTag(profile?.address, 'block')
            : listOpAddTag(profile?.address, 'block')
        )
      }

      if (followState === 'mutes') {
        addCartItem({
          listOp: listOpRemoveTag(profile?.address, 'mute')
        })
        if (isPendingUnmute) removeCartItem(listOpRemoveListRecord(profile?.address))
      }
      if (isPendingMute) removeCartItem(listOpAddTag(profile?.address, 'mute'))
      if (followState === 'none') addCartItem({ listOp: listOpAddListRecord(profile?.address) })
      if (followState === 'blocks')
        addCartItem({ listOp: listOpRemoveListRecord(profile?.address) })

      addCartItem({
        listOp:
          followState === 'blocks'
            ? listOpRemoveTag(profile?.address, 'block')
            : listOpAddTag(profile?.address, 'block')
      })
    }

    if (buttonText === 'Mute') {
      if (isPendingMute || isPendingUnmute) {
        if (isPendingMute) {
          if (followState === 'none') removeCartItem(listOpAddListRecord(profile?.address))
          if (isPendingUnblock) removeCartItem(listOpRemoveTag(profile?.address, 'block'))
        }

        if (isPendingUnmute) {
          removeCartItem(listOpRemoveListRecord(profile?.address))
          if (followState === 'blocks') removeCartItem(listOpRemoveListRecord(profile?.address))
          if (isPendingBlock && followState === 'mutes')
            removeCartItem(listOpAddTag(profile?.address, 'block'))
        }

        return removeCartItem(
          followState === 'mutes'
            ? listOpRemoveTag(profile?.address, 'mute')
            : listOpAddTag(profile?.address, 'mute')
        )
      }

      if (followState === 'blocks') {
        addCartItem({
          listOp: listOpRemoveTag(profile?.address, 'block')
        })
        if (isPendingUnblock) removeCartItem(listOpRemoveListRecord(profile?.address))
      }
      if (isPendingBlock) removeCartItem(listOpAddTag(profile?.address, 'block'))
      if (followState === 'none') addCartItem({ listOp: listOpAddListRecord(profile?.address) })
      if (followState === 'mutes') addCartItem({ listOp: listOpRemoveListRecord(profile?.address) })
      addCartItem({
        listOp:
          followState === 'mutes'
            ? listOpRemoveTag(profile?.address, 'mute')
            : listOpAddTag(profile?.address, 'mute')
      })
    }
  }

  const rankTitles = Object.keys(profile?.ranks || {})
  const ranks = Object.values(profile?.ranks || {})

  return (
    <div
      className={`flex glass-card ${
        isResponsive ? 'xl:w-76 w-full 2xl:w-86 py-6 px-4 sm:p-6 sm:py-7' : 'w-76 3xs:w-86 p-6'
      } border-2 justify-center flex-col ${borderColor || 'border-[#FFDBD9]'} rounded-xl relative`}
    >
      {isLoading ? (
        <LoadingProfileCard
          isResponsive={isResponsive}
          hideFollowButton={hideFollowButton || isConnectedUserCard}
        />
      ) : profile && isProfileValid ? (
        <>
          <div className='flex gap-2 items-center absolute justify-between px-2 w-full left-0 top-1 font-semibold'>
            {profileList && <p className='text-gray-500 text-sm sm:text-base'>#{profileList}</p>}
            {profileList
              ? profileList !== Number(profile.primary_list) && (
                  <p className='text-[11px] italic text-end rounded-full py-0.5 px-2 bg-gray-300'>
                    {t('not primary list')}
                  </p>
                )
              : null}
          </div>
          <div
            className={`flex w-full items-center flex-col pt-2 ${
              followerTag.text === '' && !isResponsive
                ? 'gap-5 sm:gap-6 md:gap-[68px]'
                : 'gap-5 sm:gap-6 md:gap-9'
            }`}
          >
            <div className='flex w-full flex-col justify-center items-center gap-4'>
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
                      ? 'h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[100px] xl:w-[100px] cursor-pointer'
                      : 'h-[100px] w-[100px] cursor-pointer'
                  }
                />
              )}
              <div className='flex w-full items-center flex-col gap-2 justify-center'>
                {isProfileLoading ? (
                  <LoadingCell className='w-48 sm:w-68 xl:w-3/4 h-7 rounded-lg' />
                ) : (
                  <div
                    className={`${
                      isResponsive
                        ? 'max-w-[90%] xl:max-w-72 2xl:max-w-[325px] sm:text-2xl text-xl'
                        : 'max-w-[332px] text-2xl'
                    } font-bold flex gap-2 items-center relative text-center`}
                  >
                    <Link
                      href={`/${profile.address}`}
                      className={showMoreOptions ? 'w-[87.5%]' : 'w-full'}
                    >
                      <p className='truncate hover:opacity-70'>
                        {profileName || truncateAddress(profile.address)}
                      </p>
                    </Link>
                    {showMoreOptions && (
                      <div ref={clickAwayMoreOptionsRef}>
                        <div
                          className='flex gap-[3px] px-1.5 py-2 rounded-md bg-gray-300 cursor-pointer items-center hover:opacity-50 transition-opacity'
                          onClick={() => setMoreOptionsDropdownOpen(!moreOptionsDropdownOpen)}
                        >
                          <div className='h-1 w-1 bg-black rounded-full'></div>
                          <div className='h-1 w-1 bg-black rounded-full'></div>
                          <div className='h-1 w-1 bg-black rounded-full'></div>
                        </div>
                        {showMoreOptions && moreOptionsDropdownOpen && (
                          <div className='absolute top-10 flex-col flex gap-2 right-0 p-2 bg-white border-gray-200 border-2 rounded-xl z-50 drop-shadow-lg'>
                            <button
                              onClick={() => onClickOption('Block')}
                              className='rounded-lg cursor-pointer bg-deletion relative text-sm flex items-center gap-1.5 justify-center font-bold w-[107px] h-[37px] px-2 py-1.5'
                            >
                              <Image
                                alt='mainnet logo'
                                src='/assets/mainnet-black.svg'
                                width={16}
                                height={16}
                              />
                              <p>
                                {followState === 'blocks'
                                  ? isPendingUnblock
                                    ? 'Block'
                                    : 'Unblock'
                                  : isPendingBlock
                                    ? 'Unblock'
                                    : 'Block'}
                              </p>
                            </button>
                            <button
                              onClick={() => onClickOption('Mute')}
                              className='rounded-lg cursor-pointer bg-deletion relative text-sm flex items-center gap-1.5 justify-center font-bold w-[107px] h-[37px] px-2 py-1.5'
                            >
                              <Image
                                alt='mainnet logo'
                                src='/assets/mainnet-black.svg'
                                width={16}
                                height={16}
                              />
                              <p>
                                {followState === 'mutes'
                                  ? isPendingUnmute
                                    ? 'Mute'
                                    : 'Unmute'
                                  : isPendingMute
                                    ? 'Unmute'
                                    : 'Mute'}
                              </p>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {followerTag && connectedAddress && !isConnectedUserCard && (
                  <div
                    className={`rounded-full font-bold text-[10px] mb-1 flex items-center justify-center bg-gray-300 h-5 w-20 ${followerTag.className}`}
                  >
                    {t(followerTag.text)}
                  </div>
                )}
                {!(hideFollowButton || isConnectedUserCard) && profile.address && (
                  <FollowButton address={profile.address} />
                )}
              </div>
            </div>
            <div className='flex w-full flex-wrap justify-center gap-10 gap-y-6 sm:gap-y-9 sm:gap-x-[60px] items-center mx-auto text-center'>
              <div>
                <div className='text-2xl sm:text-2xl text-center font-bold'>
                  {profile.stats === undefined
                    ? '-'
                    : profileList
                      ? formatNumber(profile.stats.following_count)
                      : 0}
                  {/* // ? '-'
                    // : isConnectedUserCard && profileList === undefined
                    //   ? 0
                    //   : profileList
                    //     ? formatNumber(profile.stats.following_count)
                    //     : 0 */}
                </div>
                <div className='text-lg font-bold text-[#888]'>{t('following')}</div>
              </div>
              <div>
                <div className='text-xl sm:text-2xl text-center font-bold'>
                  {profile.stats === undefined ? '-' : formatNumber(profile.stats.followers_count)}
                </div>
                <div className='text-lg font-bold text-[#888]'>{t('followers')}</div>
              </div>
              <div className='flex flex-col w-full items-center gap-3 xl:w-56'>
                <div
                  className={`${isResponsive ? 'sm:text-lg' : 'text-lg'} font-bold text-darkGrey`}
                >
                  {t('leaderboard')}
                </div>
                <div className='flex xl:flex-col xl:w-full justify-center flex-wrap gap-4 xxs:gap-8 gap-y-3 xxs:gap-y-3 xl:gap-3'>
                  {ranks.map((rank, i) => (
                    <div
                      key={rankTitles[i]}
                      className='flex xl:w-full gap-3 justify-between items-center font-semibold'
                    >
                      <p className='text-[#888]'>{t(rankTitles[i] || '')}</p>
                      <p
                        className={
                          {
                            1: 'first-place text-xl',
                            2: 'second-place text-xl',
                            3: 'third-place text-xl'
                          }[rank]
                        }
                      >
                        #{rank || '-'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : !connectedAddress && isConnectedUserCard ? (
        <LoadingProfileCard
          isResponsive={isResponsive}
          hideFollowButton={true}
          isStatic={!isLoading}
        />
      ) : (
        <div
          className={`w-full h-20 ${
            hideFollowButton ? 'xl:h-[360px]' : 'xl:h-[420px]'
          } text-lg 2xl:text-xl flex items-center justify-center font-semibold italic`}
        >
          {t('profile error')}
        </div>
      )}
    </div>
  )
}

export default UserProfileCard
