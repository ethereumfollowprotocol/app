'use client'

import type { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'

import { Avatar } from './avatar'
import type { StatsResponse } from '#/api/requests'
import { useConnectedProfile } from '#/api/actions'
import { FollowButton } from '#/components/follow-button'
import { resolveENSProfile } from '#/utils/resolveAddress'
import DefaultAvatar from 'public/assets/art/default-avatar.svg'
import { truncateAddress } from '#/lib/utilities'

interface Props {
  address: Address
  stats: StatsResponse | undefined
  borderColor?: string
}

export function UserProfileCard({ address, stats, borderColor }: Props) {
  const { profile: connectedProfile } = useConnectedProfile()
  /////////////////////////////////////////////////////////////////////////////
  // followers for the user profile that is being viewed
  /////////////////////////////////////////////////////////////////////////////
  const { data: userProfileResponse } = useQuery({
    queryKey: ['profile', address],
    queryFn: async () => {
      // const fetchedProfile = fetchUserProfile({ addressOrName })
      const data = await resolveENSProfile(address)

      return data
    }
  })

  // const address: Address | undefined = (
  //   userProfileResponse?.address || isAddress(addressOrName) ? addressOrName : undefined
  // ) as Address
  // const name: string | undefined = userProfileResponse?.ens?.name
  // const avatar = userProfileResponse?.ens?.avatar
  const name = userProfileResponse?.name
  const avatar = userProfileResponse?.avatar

  if (!address) return null

  return (
    <div
      className={`flex glass-card xl:w-76 2xl:w-86 border-2 justify-center flex-col ${
        borderColor || 'border-[#FFDBD9]'
      } w-full rounded-xl py-3 px-4 sm:p-6 relative`}
    >
      <div className='text-gray-500 absolute text-right xl:text-left px-2 w-full left-0 top-1 font-semibold'>
        #{connectedProfile?.primaryList}
      </div>
      <div className='flex xl:items-center flex-col gap-5 sm:gap-6 md:gap-9 pt-2'>
        <div className='flex flex-row xl:flex-col xl:justify-center items-center gap-3'>
          <Avatar
            avatarUrl={avatar || DefaultAvatar}
            name={name || address}
            size='h-[70px] w-[70px] sm:h-[75px]  sm:w-[75px] xl:h-[100px] xl:w-[100px]'
          />
          <div className='text-xl sm:text-2xl font-bold my-2'>
            {name || truncateAddress(address)}
          </div>
          {connectedProfile?.isFollowedBy(address) && (
            <div className='rounded-full font-bold text-[8px]  mt-[-6] mb-2'>Follows you</div>
          )}
          <FollowButton address={address} />
        </div>
        <div className='flex w-full flex-wrap xl:justify-center items-center mx-auto gap-0 justify-between sm:justify-start sm:gap-y-10 sm:gap-x-16 text-center'>
          <div>
            <div className='text-xl sm:text-2xl font-bold'>
              {stats === undefined ? '?' : stats.following_count}
            </div>
            <div className='sm:text-lg font-bold text-gray-500'>Following</div>
          </div>
          <div>
            <div className='text-xl sm:text-2xl font-bold'>
              {stats === undefined ? '?' : stats.followers_count}
            </div>
            <div className='sm:text-lg text-gray-500 font-bold'>Followers</div>
          </div>
          <div>
            <div className='text-xl sm:text-2xl font-bold'>#1</div>
            <div className='sm:text-lg font-bold text-gray-500'>Leaderboard</div>
          </div>
        </div>
      </div>
    </div>
  )
}
