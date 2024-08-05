import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'

import type { LeaderboardFilter } from '#/types/common'
import { fetchleaderboard } from '#/api/fetchLeaderboard'
import type { LeaderboardResponse } from '#/types/requests'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import { LEADERBOARD_FETCH_LIMIT_PARAM } from '#/lib/constants'

const useLeaderboard = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('query')
  const initialFilter = searchParams.get('filter') || 'mutuals'

  const [filter, setFilter] = useState(initialFilter as LeaderboardFilter)
  const [isEndOfLeaderboard, setIsEndOfLeaderboard] = useState(false)

  const {
    data: results,
    isLoading: isLeaderboardLoading,
    refetch: refetchLeaderboard,
    fetchNextPage: fetchMoreLeaderboard,
    isFetchingNextPage: isFetchingMoreLeaderboard
  } = useInfiniteQuery({
    queryKey: ['leaderboard', filter, search],
    queryFn: async ({ pageParam = 0 }) => {
      setIsEndOfLeaderboard(false)

      const data = await fetchleaderboard({
        limit: LEADERBOARD_FETCH_LIMIT_PARAM,
        pageParam,
        filter,
        search
      })

      if (data.results.length === 0) setIsEndOfLeaderboard(true)

      return data
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPageParam,
    staleTime: 600000
  })

  const leaderboard = results
    ? results?.pages.reduce(
        // @ts-ignore
        (acc, el) => (el.results.error ? [...acc] : [...acc, ...el.results]),
        [] as LeaderboardResponse[]
      )
    : []

  const [loadMoreRef, entry] = useIntersectionObserver()

  useEffect(() => {
    if (!entry?.isIntersecting || isEndOfLeaderboard) return

    if (
      !(isLeaderboardLoading || isFetchingMoreLeaderboard) &&
      results &&
      leaderboard.length > 0 &&
      leaderboard.length % LEADERBOARD_FETCH_LIMIT_PARAM === 0
    )
      fetchMoreLeaderboard()
  }, [entry?.isIntersecting, results])

  return {
    leaderboard,
    page: results?.pageParams,
    isLeaderboardLoading,
    isFetchingMoreLeaderboard,
    refetchLeaderboard,
    filter,
    setFilter,
    loadMoreRef,
    search
  }
}

export default useLeaderboard
