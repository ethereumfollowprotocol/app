import {
  fetchUserFollowers,
  fetchUserFollowing,
  fetchUserStats,
  type StatsResponse
} from '#/api/actions'
import { AdvancedList } from '#/components/advanced-list.tsx'
import { UserProfileCard } from '#/components/user-profile-card'
import { UserProfilePageTable } from '#/components/user-profile-page-table'
import { Box, Flex, Text } from '@radix-ui/themes'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

interface Props {
  searchParams: {
    'following-query'?: string
    'following-filter'?: string

    'followers-query'?: string
    'followers-filter'?: string
  }
}

export default async function ProfilePage({ searchParams }: Props) {
  const addressOrName = 'dr3a.eth'
  const followingQuery = searchParams['following-query'] || ''
  const followingFilter = searchParams['following-filter'] || 'follower count'

  const followersQuery = searchParams['followers-query'] || ''
  const followersFilter = searchParams['followers-filter'] || 'follower count'

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['profile', 'followers', addressOrName],
    queryFn: () => fetchUserFollowers({ addressOrName })
  })
  await queryClient.prefetchQuery({
    queryKey: ['profile', 'following', addressOrName],
    queryFn: () => fetchUserFollowing({ addressOrName })
  })
  await queryClient.prefetchQuery({
    queryKey: ['profile', 'stats', addressOrName],
    queryFn: () => fetchUserStats({ addressOrName })
  })

  // Retrieve the stats data from the QueryClient
  const stats =
    queryClient.getQueryData<{ stats: StatsResponse }>(['profile', 'stats', addressOrName])
      ?.stats || undefined

  return (
    <main className='mx-auto flex min-h-full h-full w-full flex-col items-center text-center pt-2 pb-4 px-2'>
      <Flex
        width='100%'
        height='100%'
        justify='center'
        mx='auto'
        className='xl:flex-row justify-center gap-y-0 xl:gap-x-2 gap-x-0 flex-col min-h-full lg:max-w-[1400px] max-w-2xl border-kournikova-50'
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Box height='100%' width='min-content' p='2' mx='auto'>
            <UserProfileCard addressOrName={addressOrName} stats={stats} />
            <Text as='p' className='font-semibold mt-2'>
              Block/Mute Lists
            </Text>
            <AdvancedList />
          </Box>

          <UserProfilePageTable
            addressOrName={addressOrName}
            title='following'
            searchQuery={followingQuery}
            selectQuery={followingFilter}
          />

          <UserProfilePageTable
            addressOrName={addressOrName}
            title='followers'
            searchQuery={followersQuery}
            selectQuery={followersFilter}
          />
        </HydrationBoundary>
      </Flex>
    </main>
  )
}
