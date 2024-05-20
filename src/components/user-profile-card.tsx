'use client'

import type { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'

import { Avatar } from './avatar'
import type { StatsResponse } from '#/api/requests'
import { useConnectedProfile } from '#/api/actions'
import { FollowButton } from '#/components/follow-button'
import { resolveENSProfile } from '#/utils/resolveAddress'
import DefaultAvatar from 'public/assets/art/default-avatar.svg'

interface Props {
  address: Address
  addressOrName?: string
  stats: StatsResponse | undefined
}

export function UserProfileCard({ address, addressOrName, stats }: Props) {
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
    <div className='flex glass-card xl:w-86 mx-auto pb-8 border-2 justify-center flex-col border-[#ffd6ba] w-60 lg:w-52 rounded-xl pl-3 pt-2'>
      <div className='text-gray-500 font-semibold'>#{connectedProfile?.primaryList}</div>
      <div className='flex flex-col gap-9 pt-2'>
        <div className='flex flex-col justify-center items-center gap-3 mx-auto'>
          <Avatar avatarUrl={avatar || DefaultAvatar} name={name || address} />
          <div className='text-2xl font-bold my-2'>{name}</div>
          {connectedProfile?.isFollowedBy(address) && (
            <div className='rounded-full font-bold text-[8px]  mt-[-6] mb-2'>Follows you</div>
          )}
          <FollowButton address={address} />
        </div>
        <div className='flex w-full flex-wrap justify-center items-center mx-auto gap-y-10 gap-x-16 text-center'>
          <div>
            <div className='text-2xl font-bold'>
              {stats === undefined ? '?' : stats.following_count}
            </div>
            <div className='text-lg font-bold text-gray-500'>Following</div>
          </div>
          <div>
            <div className='text-2xl font-bold'>
              {stats === undefined ? '?' : stats.followers_count}
            </div>
            <div className='text-lg text-gray-500 font-bold'>Followers</div>
          </div>
          <div>
            <div className='text-2xl font-bold'>#1</div>
            <div className='text-lg font-bold text-gray-500'>Leaderboard</div>
          </div>
        </div>
      </div>
    </div>
  )
}
