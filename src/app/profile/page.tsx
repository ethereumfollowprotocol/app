'use client'

import Image from 'next/image'
import { useAccount } from 'wagmi'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import {
  fetchUserStats,
  fetchUserFollowers,
  fetchUserFollowing,
  type StatsResponse
} from '#/api/requests'
import { UserProfileCard } from '#/components/user-profile-card'
import { UserProfilePageTable } from '#/components/user-profile-page-table'

import SettingsIcon from 'public/assets/icons/settings.svg'

interface Props {
  searchParams: {
    'following-query'?: string
    'following-filter'?: string
    'followers-query'?: string
    'followers-filter'?: string
  }
}

export default function ProfilePage({ searchParams }: Props) {
  const { address } = useAccount()

  const followingQuery = searchParams['following-query'] || ''
  const followingFilter = searchParams['following-filter'] || 'follower count'
  const followersQuery = searchParams['followers-query'] || ''
  const followersFilter = searchParams['followers-filter'] || 'follower count'

  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: ['followers', address],
    queryFn: () => fetchUserFollowers(address)
    // staleTime: 1200000
  })
  queryClient.prefetchQuery({
    queryKey: ['following', address],
    queryFn: () => fetchUserFollowing(address)
    // staleTime: 1200000
  })
  queryClient.prefetchQuery({
    queryKey: ['profile', 'stats', address],
    queryFn: () => fetchUserStats(address)
    // staleTime: 120000
  })

  // Retrieve the stats data from the QueryClient
  const stats =
    queryClient.getQueryData<{ stats: StatsResponse }>(['profile', 'stats', address])?.stats ||
    undefined

  if (!address) return null

  return (
    <main className='flex min-h-full w-full justify-between xl:justify-center gap-y-4 flex-col lg:flex-row flex-wrap xl:flex-nowrap items-start xl:gap-6 mt-16 px-8'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className='flex flex-col-reverse xl:flex-col w-full xl:w-fit items-center gap-4'>
          <UserProfileCard address={address} stats={stats} />
          <div className='flex flex-col gap-1 items-center'>
            <p className='font-semibold '>Block/Mute Lists</p>
            <div className='flex gap-1 cursor-pointer hover:opacity-80 transition-opacity'>
              <p className='font-semibold '>List Settings</p>
              <Image src={SettingsIcon} alt='List settings' width={18} height={18} />
            </div>
          </div>
        </div>

        <UserProfilePageTable
          addressOrName={address}
          title='following'
          searchQuery={followingQuery}
          selectQuery={followingFilter}
        />

        <UserProfilePageTable
          addressOrName={address}
          title='followers'
          searchQuery={followersQuery}
          selectQuery={followersFilter}
        />
      </HydrationBoundary>
    </main>
  )
}
