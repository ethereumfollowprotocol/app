'use client'

import { type Address, isAddress } from 'viem'
import { useQuery } from '@tanstack/react-query'
import { useConnectedProfile } from '#/api/actions'
import { type StatsResponse, fetchUserProfile } from '#/api/requests'
import { FollowButton } from '#/components/follow-button'
import { Avatar } from './avatar'

interface Props {
  addressOrName: string
  stats: StatsResponse | undefined
}

export function UserProfileCard({ addressOrName, stats }: Props) {
  const { profile: connectedProfile } = useConnectedProfile()
  /////////////////////////////////////////////////////////////////////////////
  // followers for the user profile that is being viewed
  /////////////////////////////////////////////////////////////////////////////
  const { data: userProfileResponse } = useQuery({
    queryKey: ['profile', addressOrName],
    queryFn: () => fetchUserProfile({ addressOrName })
  })

  const address: Address | undefined = (
    userProfileResponse?.address || isAddress(addressOrName) ? addressOrName : undefined
  ) as Address
  const name: string | undefined = userProfileResponse?.ens?.name
  const avatar = userProfileResponse?.ens?.avatar

  if (!addressOrName) return null

  return (
    <div className='flex w-full h-full mx-auto justify-center flex-col bg-white/50 border-0 xl:w-60 lg:w-52 rounded-xl p-3'>
      <div>#{connectedProfile?.primaryList}</div>
      <div className='flex flex-col justify-center items-center mt-3 mx-auto'>
        <Avatar avatarUrl={avatar} name={name || addressOrName} />
        <div className='text-3xl font-bold my-2'>{name}</div>
        {address !== undefined && connectedProfile?.isFollowedBy(address) && (
          <div className='rounded-full font-bold text-[8px] text-black mt-[-6] mb-2'>
            Follows you
          </div>
        )}
        <div className='mt-2 mb-8'>
          <FollowButton address={address} />
        </div>
      </div>
      <div className='flex justify-center mx-auto gap-8 text-center'>
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
      </div>
      <div className='justify-center mx-auto mt-5 mb-4 text-center'>
        <div>
          <div className='text-2xl font-bold'>#1</div>
          <div className='text-lg font-bold text-gray-500'>Leaderboard</div>
        </div>
      </div>
    </div>
  )
}
