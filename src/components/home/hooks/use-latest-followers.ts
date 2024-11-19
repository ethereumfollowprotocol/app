import { useAccount } from 'wagmi'
import { useMemo, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { useEFPProfile } from '#/contexts/efp-profile-context'
import { fetchLatestFollowers } from '#/api/followers/fetch-latest-followers'

export const useLatestFollowers = () => {
  const [page, setPage] = useState(1)
  const [subPage, setSubPage] = useState(1)

  const { listToFetch } = useEFPProfile()
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
    queryKey: ['latest followers', userAddress, listToFetch],
    queryFn: async ({ pageParam = 0 }) => {
      if (!userAddress) return { results: [], nextPageParam: 0, previousPageParam: 0 }

      const latestFollowers = await fetchLatestFollowers({
        addressOrName: userAddress,
        list: listToFetch,
        limit: 55,
        pageParam
      })

      return {
        results: latestFollowers.followers,
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
    return profilesToRecommend?.pages[pageIndex]?.results.slice(
      (subPage - 1 - (page - 1) * 5) * 11,
      (subPage - (page - 1) * 5) * 11
    )
  }, [profilesToRecommend, page, subPage])

  return {
    displayedProfiles,
    page,
    subPage,
    setPage,
    setSubPage,
    isLoading,
    hasNextPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage
  }
}
