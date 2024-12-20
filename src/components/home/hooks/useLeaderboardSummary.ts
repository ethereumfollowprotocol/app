import { fetchleaderboard } from '#/api/leaderboard/fetch-leaderboard'
import { leaderboardFilters } from '#/lib/constants'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const useLeaderboardSummary = () => {
  const [page, setPage] = useState(1)

  const { data: leaderboardSummaryData, isLoading: isLeaderboardSummaryLoading } = useQuery({
    queryKey: ['leaderboard summary'],
    queryFn: async () => {
      const data = leaderboardFilters.map(async (filter) => {
        const results = await fetchleaderboard({
          limit: 5,
          pageParam: 0,
          filter,
        })

        return results.results
      })

      return await Promise.all(data)
    },
    staleTime: 600000,
  })

  return {
    page,
    setPage,
    leaderboardSummaryData,
    isLeaderboardSummaryLoading,
  }
}
