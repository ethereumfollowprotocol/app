'use client'

import { Avatar } from '../avatar'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'

import { truncateAddress } from '#/lib/utilities'
import LoadingProfileCard from './loading-profile-card'
import { FollowButton } from '#/components/follow-button'
import DefaultAvatar from 'public/assets/art/default-avatar.svg'
import type { FollowingResponse, ProfileDetailsResponse } from '#/api/requests'

interface Props {
  profile?: ProfileDetailsResponse | null
  following: FollowingResponse[]
  borderColor?: string
  isLoading?: boolean
}

export function UserProfileCard({ profile, borderColor, isLoading, following }: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'profile card' })
  const { address: connectedAddress } = useAccount()

  return (
    <div
      className={`flex glass-card xl:w-76 2xl:w-86 border-2 justify-center flex-col ${
        borderColor || 'border-[#FFDBD9]'
      } w-full rounded-xl py-3 px-4 sm:p-6 relative`}
    >
      {isLoading ? (
        <LoadingProfileCard />
      ) : profile ? (
        <>
          <div className='text-gray-500 absolute text-right xl:text-left px-2 w-full left-0 top-1 font-semibold'>
            #{profile?.primary_list ?? '-'}
          </div>
          <div className='flex xl:items-center flex-col gap-5 sm:gap-6 md:gap-9 pt-2'>
            <div className='flex flex-row xl:flex-col xl:justify-center items-center gap-4'>
              <Avatar
                avatarUrl={profile.ens?.avatar || DefaultAvatar}
                name={profile.ens?.name || profile.address}
                size='h-[70px] w-[70px] sm:h-[75px]  sm:w-[75px] xl:h-[100px] xl:w-[100px]'
              />
              <div className='flex xl:items-center  flex-col items-start gap-2 justify-center'>
                <div className='text-xl sm:text-2xl font-bold '>
                  {profile.ens?.name || truncateAddress(profile.address)}
                </div>
                {following && connectedAddress
                  ? following
                      ?.map(follower => follower.data.toLowerCase())
                      .includes(connectedAddress.toLowerCase()) && (
                      <div className='rounded-full font-bold text-[10px] mb-1 flex items-center justify-center bg-gray-300 h-5 w-20'>
                        {t('follows you')}
                      </div>
                    )
                  : null}
                {profile.address && <FollowButton address={profile.address} />}
              </div>
            </div>
            <div className='flex w-full flex-wrap xl:justify-center items-center mx-auto gap-0 justify-between sm:justify-start sm:gap-y-10 sm:gap-x-16 text-center'>
              <div>
                <div className='text-xl sm:text-2xl font-bold'>
                  {profile.stats === undefined ? '-' : profile.stats.following_count}
                </div>
                <div className='sm:text-lg font-bold text-gray-500'>{t('following')}</div>
              </div>
              <div>
                <div className='text-xl sm:text-2xl font-bold'>
                  {profile.stats === undefined ? '-' : profile.stats.followers_count}
                </div>
                <div className='sm:text-lg text-gray-500 font-bold'>{t('followers')}</div>
              </div>
              <div>
                <div className='text-xl sm:text-2xl font-bold'># -</div>
                <div className='sm:text-lg font-bold text-gray-500'>{t('leaderboard')}</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Invaid profile data</div>
      )}
    </div>
  )
}
