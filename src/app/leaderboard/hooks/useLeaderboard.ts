import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

import type { LeaderboardFilter } from '#/types/common'
import { fetchleaderboard } from '#/api/fetchLeaderboard'
import type { LeaderboardResponse } from '#/types/requests'
import { LEADERBOARD_FETCH_LIMIT_PARAM } from '#/lib/constants'

const useLeaderboard = () => {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const search = searchParams.get('query')
  const initialFilter = searchParams.get('filter') || 'mutuals'
  const initialPageParam = Number(searchParams.get('page'))

  const [page, setPage] = useState(initialPageParam || 1)
  const [filter, setFilter] = useState(initialFilter as LeaderboardFilter)
  const [isRefetchingLeaderboard, setIsRefetchingLeaderboard] = useState(false)

  const {
    data: results,
    refetch: refetchLeaderboard,
    isLoading: isLeaderboardLoading,
    fetchNextPage: fetchNextLeaderboard,
    fetchPreviousPage: fetchPreviousLeaderboard,
    isFetchingNextPage: isFetchingNextLeaderboard,
    isFetchingPreviousPage: isFetchingPreviousLeaderboard
  } = useInfiniteQuery({
    queryKey: ['leaderboard', filter, search],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await fetchleaderboard({
        limit: LEADERBOARD_FETCH_LIMIT_PARAM,
        pageParam,
        filter,
        search
      })

      return data
    },
    initialPageParam: page - 1,
    getNextPageParam: lastPage => lastPage.nextPageParam,
    getPreviousPageParam: lastPage => lastPage.prevPageParam,
    staleTime: 600000
  })

  useEffect(() => {
    const pageIndex = results?.pageParams.indexOf(page - 1)
    if (pageIndex === -1) {
      setIsRefetchingLeaderboard(true)

      const fetchNewPage = async () => {
        const data = await fetchleaderboard({
          limit: LEADERBOARD_FETCH_LIMIT_PARAM,
          pageParam: page - 1,
          filter,
          search
        })

        queryClient.setQueryData(
          ['leaderboard', filter, search],
          (oldData: {
            pages: LeaderboardResponse[][]
            pageParams: number[]
          }) => ({
            pages: [
              ...oldData.pages,
              {
                results: data.results,
                nextPageParam: page,
                prevPageParam: page === 1 ? 0 : page - 2
              }
            ],
            pageParams: [...oldData.pageParams, page - 1]
          })
        )

        setIsRefetchingLeaderboard(false)
      }

      fetchNewPage()
    }
  }, [filter, results])

  const leaderboard = useMemo(() => {
    const pageIndex = results?.pageParams.indexOf(page - 1) || 0
    return results?.pages[pageIndex]?.results as LeaderboardResponse[]
  }, [results, page])

  return {
    page,
    search,
    filter,
    setPage,
    setFilter,
    leaderboard,
    refetchLeaderboard,
    fetchNextLeaderboard,
    fetchPreviousLeaderboard,
    isFetchingNextLeaderboard,
    isFetchingPreviousLeaderboard,
    isLeaderboardLoading: isLeaderboardLoading || isRefetchingLeaderboard
  }
}

export default useLeaderboard
