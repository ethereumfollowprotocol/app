import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'

import type { LeaderboardFilter } from '#/types/common'
import { fetchleaderboard } from '#/api/fetchLeaderboard'
import type { LeaderboardResponse } from '#/types/requests'

const useLeaderboard = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('query')
  const initialFilter = searchParams.get('filter') || 'followers'

  const [filter, setFilter] = useState(initialFilter as LeaderboardFilter)

  const {
    data: results,
    isLoading: isLeaderboardLoading,
    refetch: refetchLeaderboard,
    fetchNextPage: fetchMoreLeaderboard,
    isFetchingNextPage: isFetchingMoreLeaderboard
  } = useInfiniteQuery({
    queryKey: ['leaderboard', filter, search],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await fetchleaderboard({
        limit: 100,
        pageParam,
        filter,
        search
      })

      return data
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPageParam
  })

  const leaderboard = results
    ? results?.pages.reduce(
        // @ts-ignore
        (acc, el) => (el.results.error ? [...acc] : [...acc, ...el.results]),
        [] as LeaderboardResponse[]
      )
    : []

  return {
    leaderboard,
    page: results?.pageParams,
    isLeaderboardLoading,
    refetchLeaderboard,
    filter,
    setFilter,
    fetchMoreLeaderboard,
    isFetchingMoreLeaderboard,
    search
  }
}

export default useLeaderboard
