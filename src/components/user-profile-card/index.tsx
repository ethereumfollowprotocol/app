'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useClickAway } from '@uidotdev/usehooks'

import {
  listOpAddTag,
  listOpRemoveTag,
  listOpAddListRecord,
  listOpRemoveListRecord
} from '#/utils/list-ops'
import { Avatar } from '../avatar'
import LoadingCell from '../loading-cell'
import { useCart } from '#/contexts/cart-context'
import { truncateAddress } from '#/lib/utilities'
import useFollowState from '#/hooks/use-follow-state'
import { resolveENSProfile } from '#/utils/resolveENS'
import LoadingProfileCard from './loading-profile-card'
import { FollowButton } from '#/components/follow-button'
import DefaultAvatar from 'public/assets/art/default-avatar.svg'
import type { FollowingResponse, ProfileDetailsResponse } from '#/types/requests'

interface UserProfileCardProps {
  profileList?: number | null
  isResponsive?: boolean
  hideFollowButton?: boolean
  profile?: ProfileDetailsResponse | null
  following?: FollowingResponse[]
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
  following,
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
      return await resolveENSProfile(profile?.address)
    }
  })

  const profileName = fetchedEnsProfile?.name
  const profileAvatar = fetchedEnsProfile?.avatar

  const { followState } = useFollowState({
    address: profile?.address,
    type: 'followings'
  })

  const pathname = usePathname()
  const { address: connectedAddress } = useAccount()
  const { t } = useTranslation('common', { keyPrefix: 'profile card' })

  const isConnectedUserCard = pathname === '/' || pathname.includes('/profile')

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
        if (isPendingBlock && followState === 'none')
          removeCartItem(listOpAddListRecord(profile?.address))
        if (isPendingUnblock && followState === 'blocks')
          removeCartItem(listOpRemoveListRecord(profile?.address))

        return removeCartItem(
          followState === 'blocks'
            ? listOpRemoveTag(profile?.address, 'block')
            : listOpAddTag(profile?.address, 'block')
        )
      }

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
        if (isPendingMute && followState === 'none')
          removeCartItem(listOpAddListRecord(profile?.address))
        if (isPendingUnmute && followState === 'mutes')
          removeCartItem(listOpRemoveListRecord(profile?.address))

        return removeCartItem(
          followState === 'mutes'
            ? listOpRemoveTag(profile?.address, 'mute')
            : listOpAddTag(profile?.address, 'mute')
        )
      }

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

  return (
    <div
      className={`flex glass-card ${
        isResponsive ? 'xl:w-76 w-full 2xl:w-86 py-6 px-4 sm:p-6 sm:py-7' : 'w-86 p-6'
      } border-2 justify-center flex-col ${borderColor || 'border-[#FFDBD9]'} rounded-xl relative`}
    >
      {isLoading ? (
        <LoadingProfileCard isResponsive={isResponsive} hideFollowButton={hideFollowButton} />
      ) : profile && isProfileValid ? (
        <>
          <div
            className={`flex gap-2 items-center absolute ${
              isResponsive ? 'justify-end xl:justify-start' : 'justify-start'
            } px-2 w-full left-0 top-1 font-semibold`}
          >
            <p className='text-gray-500 text-sm sm:text-base'>#{profileList ?? '-'}</p>
            {profileList
              ? profileList !== Number(profile.primary_list) && (
                  <p className='w-full text-xs italic text-end text-gray-400'>
                    {t('not primary list')}
                  </p>
                )
              : null}
          </div>
          <div className='flex w-full xl:items-center flex-col gap-5 sm:gap-6 md:gap-9 pt-2'>
            <div
              className={`flex w-full ${
                isResponsive ? 'flex-row xl:flex-col xl:justify-center' : 'flex-col justify-center'
              } items-center gap-4`}
            >
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
                  size={
                    isResponsive
                      ? 'h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[100px] xl:w-[100px]'
                      : 'h-[100px] w-[100px]'
                  }
                />
              )}
              <div
                className={`flex w-full ${
                  isResponsive ? 'xl:items-center items-start' : 'items-center'
                } flex-col gap-2 justify-center`}
              >
                {isProfileLoading ? (
                  <LoadingCell className='w-48 sm:w-68 xl:w-3/4 h-7 rounded-lg' />
                ) : (
                  <div
                    className={`${
                      isResponsive
                        ? 'max-w-[90%] xl:max-w-72 2xl:max-w-[325px] sm:text-2xl text-xl text-start xl:text-center'
                        : ' max-w-[332px] text-2xl text-center'
                    } font-bold flex gap-1.5 items-center relative`}
                  >
                    <p className='truncate'>{profileName || truncateAddress(profile.address)}</p>
                    {showMoreOptions && (
                      <div ref={clickAwayMoreOptionsRef}>
                        <div
                          className='flex gap-[3px] cursor-pointer items-center hover:opacity-50 transition-opacity'
                          onClick={() => setMoreOptionsDropdownOpen(!moreOptionsDropdownOpen)}
                        >
                          <div className='h-[5px] w-[5px] bg-black rounded-full'></div>
                          <div className='h-[5px] w-[5px] bg-black rounded-full'></div>
                          <div className='h-[5px] w-[5px] bg-black rounded-full'></div>
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
                                className='text-red-500'
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
                                className='text-red-500'
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
                {following && connectedAddress
                  ? following
                      ?.map(follower => follower.data.toLowerCase())
                      .includes(connectedAddress.toLowerCase()) && (
                      <div className='rounded-full font-bold text-[10px] mb-1 flex items-center justify-center bg-gray-300 h-5 w-20'>
                        {t('follows you')}
                      </div>
                    )
                  : null}
                {!hideFollowButton && profile.address && <FollowButton address={profile.address} />}
              </div>
            </div>
            <div
              className={`flex w-full flex-wrap ${
                isResponsive
                  ? 'justify-between sm:justify-start xl:justify-center gap-0 sm:gap-y-10 sm:gap-x-16'
                  : 'gap-y-10 gap-x-16 justify-center'
              }  items-center mx-autotext-center`}
            >
              <div>
                <div
                  className={`${
                    isResponsive ? 'text-xl sm:text-2xl' : 'text-2xl'
                  } text-center font-bold`}
                >
                  {profile.stats === undefined
                    ? '-'
                    : profileList
                      ? profile.stats.following_count
                      : 0}
                </div>
                <div
                  className={`${isResponsive ? 'sm:text-lg' : 'text-lg'} font-bold text-gray-500`}
                >
                  {t('following')}
                </div>
              </div>
              <div>
                <div
                  className={`${
                    isResponsive ? 'text-xl sm:text-2xl' : 'text-2xl'
                  } text-center font-bold`}
                >
                  {profile.stats === undefined ? '-' : profile.stats.followers_count}
                </div>
                <div
                  className={`${isResponsive ? 'sm:text-lg' : 'text-lg'} font-bold text-gray-500`}
                >
                  {t('followers')}
                </div>
              </div>
              <div>
                <div
                  className={`${
                    isResponsive ? 'text-xl sm:text-2xl' : 'text-2xl'
                  } text-center font-bold`}
                >
                  # -
                </div>
                <div
                  className={`${isResponsive ? 'sm:text-lg' : 'text-lg'} font-bold text-gray-500`}
                >
                  {t('leaderboard')}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className={`w-full h-20 ${
            hideFollowButton ? 'xl:h-[360px]' : 'xl:h-[420px]'
          } text-lg 2xl:text-xl flex items-center justify-center font-semibold italic`}
        >
          {isConnectedUserCard ? t('connect wallet') : t('profile error')}
        </div>
      )}
    </div>
  )
}

export default UserProfileCard
