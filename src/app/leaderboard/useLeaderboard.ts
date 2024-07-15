import { fetchleaderboard } from '#/api/fetchLeaderboard'
import type { LeaderboardResponse } from '#/types/requests'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import type { LeaderboardFilter } from './types'

const useLeaderboard = () => {
  const searchParams = useSearchParams()
  const initialFilter = searchParams.get('filter') || 'followers'
  const search = searchParams.get('query')

  const [filter, setFilter] = useState(initialFilter as LeaderboardFilter)

  const {
    data: results,
    isLoading: isResultsLoading,
    refetch: refetchResults
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
    isResultsLoading,
    refetchResults,
    filter,
    setFilter,
    search
  }
}

export default useLeaderboard
