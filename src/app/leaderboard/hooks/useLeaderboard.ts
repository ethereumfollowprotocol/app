import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useQueryState } from 'next-usequerystate'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'

import type { LeaderboardFilter } from '#/types/common'
import type { LeaderboardItem } from '#/types/requests'
import { fetchleaderboard } from '#/api/fetchLeaderboard'
import { LEADERBOARD_FETCH_LIMIT_PARAM } from '#/lib/constants'
import { fetchLeaderboardCount } from '#/api/fetchLeaderboardCount'

const useLeaderboard = () => {
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  const initialFilter = searchParams.get('filter') || 'mutuals'
  const [filter, setFilter] = useState(initialFilter as LeaderboardFilter)

  const initialPageParam = Number(searchParams.get('page'))
  const [page, setPage] = useState(initialPageParam || 1)

  const initialSearch = searchParams.get('search')
  const [currentSearch, setCurrentSearch] = useState(initialSearch ?? '')
  const [search, setSearch] = useQueryState('query', {
    history: 'push',
    parse: value => value?.trim().toLowerCase(),
    serialize: value => value.trim().toLowerCase()
  })

  let searchTimeout: NodeJS.Timeout | null = null

  const handleSearchEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const term = event?.target.value.toLowerCase().trim()
      if (searchTimeout) clearTimeout(searchTimeout)

      setCurrentSearch(term)
      if (term.length > 2) setPage(1)

      if (term) searchTimeout = setTimeout(() => setSearch(term), 500)
      else {
        setSearch('')
        router.push(pathname.replace('query=', ''))
      }
    },
    [searchTimeout]
  )

  const resetSearch = useCallback(() => {
    setPage(1)
    setSearch('')
    setCurrentSearch('')
    router.push(pathname.replace('query=', ''))
  }, [setSearch])

  const [isRefetchingLeaderboard, setIsRefetchingLeaderboard] = useState(false)

  const { data: leaderboardCount, isLoading: isLeaderboardCountLoading } = useQuery({
    queryKey: ['leaderboard', 'total'],
    queryFn: async () => {
      const data = await fetchLeaderboardCount()
      return data
    },
    refetchInterval: 600000
  })

  const {
    data: results,
    refetch: refetchLeaderboard,
    isLoading: isLeaderboardLoading,
    fetchNextPage: fetchNextLeaderboard,
    fetchPreviousPage: fetchPreviousLeaderboard,
    isFetchingNextPage: isFetchingNextLeaderboard,
    isFetchingPreviousPage: isFetchingPreviousLeaderboard
  } = useInfiniteQuery({
    queryKey: ['leaderboard', filter, search && search?.length > 2 ? search : ''],
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
          ['leaderboard', filter, search && search?.length > 2 ? search : ''],
          (oldData: {
            pages: LeaderboardItem[][]
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

  const timeStamp = new Date(results?.pages[0]?.results.last_updated || 0).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })

  const leaderboard = useMemo(() => {
    const pageIndex = results?.pageParams.indexOf(page - 1) || 0
    return results?.pages[pageIndex]?.results.results as LeaderboardItem[]
  }, [results, page])

  return {
    page,
    search,
    filter,
    setPage,
    setFilter,
    timeStamp,
    leaderboard,
    resetSearch,
    currentSearch,
    leaderboardCount,
    handleSearchEvent,
    refetchLeaderboard,
    fetchNextLeaderboard,
    fetchPreviousLeaderboard,
    isLeaderboardCountLoading,
    isFetchingNextLeaderboard,
    isFetchingPreviousLeaderboard,
    isLeaderboardLoading: isLeaderboardLoading || isRefetchingLeaderboard
  }
}

export default useLeaderboard
