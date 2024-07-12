import { fetchleaderboard } from '#/api/fetchLeaderboard'
import { useInfiniteQuery } from '@tanstack/react-query'

const useLeaderboard = () => {
  const {
    data: results,
    isLoading: isResultsLoading,
    refetch: refetchResults
  } = useInfiniteQuery({
    queryKey: ['leaderboard'],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await fetchleaderboard({
        limit: 100,
        pageParam
      })

      return data
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPageParam
  })

  return { results, isResultsLoading, refetchResults }
}

export default useLeaderboard
