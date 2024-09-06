import { fetchProfileFollowers } from '#/api/fetchProfileFollowers'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useAccount } from 'wagmi'

export const useLatestFollowers = () => {
  const [page, setPage] = useState(1)
  const { selectedList } = useEFPProfile()
  const { address: userAddress } = useAccount()

  const {
    isLoading,
    hasNextPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data: profilesToRecommend
  } = useInfiniteQuery({
    queryKey: ['latest followers', userAddress, selectedList],
    queryFn: async ({ pageParam = 0 }) => {
      if (!userAddress) return { results: [], nextPageParam: 0, previousPageParam: 0 }

      const discoverAccounts = await fetchProfileFollowers({
        addressOrName: userAddress,
        list: selectedList,
        limit: 7,
        pageParam,
        sort: 'latest first'
      })

      return {
        results: discoverAccounts.followers,
        nextPageParam: pageParam + 1,
        previousPageParam: pageParam > 0 ? pageParam - 1 : 0
      }
    },
    refetchInterval: 60000,
    staleTime: 60000,
    initialPageParam: page - 1,
    getNextPageParam: lastPage => lastPage.nextPageParam,
    getPreviousPageParam: lastPage => lastPage.previousPageParam
  })

  const displayedProfiles = useMemo(() => {
    const pageIndex = profilesToRecommend?.pageParams.indexOf(page - 1) || 0
    return profilesToRecommend?.pages[pageIndex]?.results.slice(0, 7)
  }, [profilesToRecommend, page])

  return {
    displayedProfiles,
    page,
    setPage,
    isLoading,
    hasNextPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage
  }
}
