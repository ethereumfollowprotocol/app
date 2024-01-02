import * as React from 'react'
import { Text } from '@radix-ui/themes'
import { LeaderboardTable } from './table.tsx'
import { fetchLeaderboard } from './actions.ts'
import type { LeaderboardFilter } from './types.ts'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

export default async function LeaderboardPage({
  searchParams
}: {
  searchParams: { query?: string; filter?: LeaderboardFilter }
}) {
  const query = searchParams.query || ''
  const filter = searchParams.filter || 'followers'

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['leaderboard', filter],
    queryFn: () =>
      fetchLeaderboard({
        filter,
        limit: 200,
        include: ['ens', 'blocked', 'muted', 'mutuals']
      })
  })

  return (
    <main className='font-sans mx-auto flex h-full min-h-full w-full flex-col items-center overflow-scroll mb-12 px-4 pt-6 text-center'>
      <Text size='7' className='font-bold' mb='5'>
        Leaderboard
      </Text>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LeaderboardTable initialFilter={filter} query={query} />
      </HydrationBoundary>
    </main>
  )
}
