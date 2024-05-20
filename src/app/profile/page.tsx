'use client'

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

interface Props {
  searchParams: {
    'following-query'?: string
    'following-filter'?: string

    'followers-query'?: string
    'followers-filter'?: string
  }
}

export default function ProfilePage({ searchParams }: Props) {
  const { address } = useAccount() // TODO use connected address
  const followingQuery = searchParams['following-query'] || ''
  const followingFilter = searchParams['following-filter'] || 'follower count'

  const followersQuery = searchParams['followers-query'] || ''
  const followersFilter = searchParams['followers-filter'] || 'follower count'

  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: ['followers', address],
    queryFn: () => fetchUserFollowers(address)
  })
  queryClient.prefetchQuery({
    queryKey: ['following', address],
    queryFn: () => fetchUserFollowing(address)
  })
  queryClient.prefetchQuery({
    queryKey: ['profile', 'stats', address],
    queryFn: () => fetchUserStats(address)
  })

  // Retrieve the stats data from the QueryClient
  const stats =
    queryClient.getQueryData<{ stats: StatsResponse }>(['profile', 'stats', address])?.stats ||
    undefined

  if (!address) return null

  return (
    <main className='mx-auto flex min-h-full h-full w-full flex-col items-center text-center pt-2 pb-4 px-2'>
      <div className='flex w-full h-full mx-auto xl:flex-row justify-center gap-y-0 xl:gap-x-2 gap-x-0 flex-col min-h-full lg:max-w-[1400px] max-w-2xl border-kournikova-50'>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className='h-full min-w-fit p-2 mx-auto'>
            <UserProfileCard addressOrName={address} stats={stats} />
            <p className='font-semibold mt-2'>Block/Mute Lists</p>
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
      </div>
    </main>
  )
}
