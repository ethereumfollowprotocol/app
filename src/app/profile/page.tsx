import * as React from 'react'
import { ProfilePageTable } from './table.tsx'
import { ProfileCard } from './profile-card.tsx'
import { AdvancedList } from './advanced-list.tsx'
import { Box, Flex, Text } from '@radix-ui/themes'
import { fetchFollowers, fetchFollowing } from '#/app/profile/actions.ts'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

export default async function ProfilePage({
  searchParams
}: {
  searchParams: {
    'following-query'?: string
    'following-filter'?: string

    'followers-query'?: string
    'followers-filter'?: string
  }
}) {
  const followingQuery = searchParams['following-query'] || ''
  const followingFilter = searchParams['following-filter'] || 'follower count'

  const followersQuery = searchParams['followers-query'] || ''
  const followersFilter = searchParams['followers-filter'] || 'follower count'

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['profile', 'followers'],
    queryFn: () => fetchFollowers({ addressOrName: 'dr3a.eth' })
  })
  await queryClient.prefetchQuery({
    queryKey: ['profile', 'following'],
    queryFn: () => fetchFollowing({ addressOrName: 'dr3a.eth' })
  })

  return (
    <main className='mx-auto flex min-h-full h-full w-full flex-col items-center text-center pt-2 pb-4 px-2'>
      <Flex
        width='100%'
        height='100%'
        justify='center'
        mx='auto'
        className='lg:flex-row justify-center gap-y-0 xl:gap-x-2 gap-x-0 flex-col min-h-full lg:max-w-[1400px] max-w-2xl border-kournikova-50'
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Box height='100%' width='min-content' p='2' mx='auto'>
            <ProfileCard addressOrName='dr3a.eth' />
            <Text as='p' className='font-semibold mt-2'>
              Block/Mute Lists
            </Text>
            <AdvancedList />
          </Box>

          <ProfilePageTable
            title='following'
            searchQuery={followingQuery}
            selectQuery={followingFilter}
          />

          <ProfilePageTable
            title='followers'
            searchQuery={followersQuery}
            selectQuery={followersFilter}
          />
        </HydrationBoundary>
      </Flex>
    </main>
  )
}
