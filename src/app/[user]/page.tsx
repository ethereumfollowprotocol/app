import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import {
  type StatsResponse,
  fetchUserFollowers,
  fetchUserFollowing,
  fetchUserStats
} from '#/api/requests'
import { getEnsProfile } from '#/app/actions.ts'
import { UserProfileCard } from '#/components/user-profile-card'
import { UserProfilePageTable } from '#/components/user-profile-page-table'
import type { ENSProfile } from '#/lib/types'
import { formatAddressOrName } from '#/lib/utilities'

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
  })
  await queryClient.prefetchQuery({
    queryKey: ['following', ensProfile.address],
    queryFn: () => fetchUserFollowing(ensProfile.address)
  })
  await queryClient.prefetchQuery({
    queryKey: ['profile', 'stats', ensProfile.address],
    queryFn: () => fetchUserStats(ensProfile.address)
  })

  // Retrieve the stats data from the QueryClient
  const stats =
    queryClient.getQueryData<{ stats: StatsResponse }>(['profile', 'stats', ensProfile.address])
      ?.stats || undefined

  return (
    <main className='mx-auto flex min-h-full h-full w-full flex-col items-center text-center pt-2 pb-4 px-2'>
      <div className='xl:flex-row justify-center gap-y-0 xl:gap-x-2 gap-x-0 flex-col min-h-full lg:max-w-[1400px] max-w-2xl border-kournikova-50'>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className='h-full w-fit p-2 mx-auto'>
            <UserProfileCard address={ensProfile.address} stats={stats} />
            <p className='font-semibold mt-2'>Block/Mute Lists</p>
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
      </div>
    </main>
  )
}
