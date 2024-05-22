import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import {
  fetchUserStats,
  type StatsResponse,
  fetchUserFollowers,
  fetchUserFollowing
} from '#/api/requests'
import type { ENSProfile } from '#/lib/types'
import { getEnsProfile } from '#/app/actions.ts'
import { formatAddressOrName } from '#/lib/utilities'
import { UserProfileCard } from '#/components/user-profile-card'
import { UserProfilePageTable } from '#/components/user-profile-page-table'

interface Props {
  params: { user: string }
}

export default async function UserPage({ params }: Props) {
  const ensProfile: ENSProfile = await getEnsProfile(formatAddressOrName(params.user))

  const searchParams: any = {}
  const followingQuery = searchParams['following-query'] || ''
  const followingFilter = searchParams['following-filter'] || 'follower count'

  const followersQuery = searchParams['followers-query'] || ''
  const followersFilter = searchParams['followers-filter'] || 'follower count'

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['followers', ensProfile.address],
    queryFn: () => fetchUserFollowers(ensProfile.address)
    // staleTime: 12000000
  })
  await queryClient.prefetchQuery({
    queryKey: ['following', ensProfile.address],
    queryFn: () => fetchUserFollowing(ensProfile.address)
    // staleTime: 12000000
  })
  await queryClient.prefetchQuery({
    queryKey: ['profile', 'stats', ensProfile.address],
    queryFn: () => fetchUserStats(ensProfile.address)
    // staleTime: 12000000
  })

  // Retrieve the stats data from the QueryClient
  const stats =
    queryClient.getQueryData<{ stats: StatsResponse }>(['profile', 'stats', ensProfile.address])
      ?.stats || undefined

  return (
    <main className='flex min-h-full w-full flex-col lg:flex-row items-start mt-24 px-6'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className='flex gap-4'>
          <UserProfileCard address={ensProfile.address} stats={stats} />
          <p className='font-semibold'>Block/Mute Lists</p>
        </div>

        <UserProfilePageTable
          addressOrName={ensProfile.address}
          title='following'
          searchQuery={followingQuery}
          selectQuery={followingFilter}
        />

        <UserProfilePageTable
          addressOrName={ensProfile.address}
          title='followers'
          searchQuery={followersQuery}
          selectQuery={followersFilter}
        />
      </HydrationBoundary>
    </main>
  )
}
