import { useEffect, useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import {
  fetchBatchFollowState,
  useTransactions,
  type FollowStateResponse,
  type ForceFollowingState,
} from 'ethereum-identity-kit'

import { useEFPProfile } from '#/contexts/efp-profile-context'

interface UseBatchButtonStateQueryProps<T> {
  profiles: T[]
  splitSize: number
  queryKey: any[]
  useFirstPageKey?: boolean
  currentPageIndex?: number
}

function splitList(addresses: string[], splitSize: number) {
  const splitAddresses: string[][] = []
  for (let i = 0; i < addresses.length; i += splitSize) {
    splitAddresses.push(addresses.slice(i, i + splitSize))
  }
  return splitAddresses
}

export const useBatchButtonStateQuery = <T extends { address: string }>({
  profiles,
  splitSize,
  queryKey,
  useFirstPageKey = true,
  currentPageIndex,
}: UseBatchButtonStateQueryProps<T>) => {
  const { selectedList } = useEFPProfile()
  const { isCheckoutFinished } = useTransactions()

  const splitAddresses = useMemo(() => {
    const addresses = profiles.map((profile) => profile.address)
    return splitList(addresses, splitSize)
  }, [profiles, splitSize])

  // used to determine the first page and help with finding out if the query needs to be refetched
  const firstPageKey = useFirstPageKey ? (splitAddresses[0]?.join(',') ?? '') : ''

  const {
    data: followStatesData,
    isLoading: isFollowStatesLoading,
    isFetchingNextPage: isFetchingNextFollowStatesPage,
    fetchNextPage: fetchNextFollowStatesPage,
    refetch: refetchFollowStates,
    isRefetching: isRefetchingFollowStates,
  } = useInfiniteQuery({
    queryKey: [...queryKey, selectedList, firstPageKey],
    queryFn: async ({ pageParam = 1 }) => {
      const index = currentPageIndex === undefined ? pageParam - 1 : currentPageIndex
      const addressesToFetch = splitAddresses[index]

      if (!addressesToFetch || addressesToFetch.length === 0) {
        return {
          followStates: [],
          nextPageParam: pageParam,
          hasNextPage: true,
        }
      }

      const response = await fetchBatchFollowState({
        lookupAddressesOrNames: addressesToFetch,
        list: selectedList,
      })

      return {
        followStates: response,
        nextPageParam: pageParam + 1,
        hasNextPage: true,
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    enabled: splitAddresses.length > 0 && (splitAddresses[0]?.length ?? 0) > 0,
  })

  useEffect(() => {
    const pagesLoaded = followStatesData?.pages?.length ?? 0
    if (pagesLoaded > 0 && splitAddresses.length > pagesLoaded) {
      fetchNextFollowStatesPage()
    }
  }, [splitAddresses.length, followStatesData?.pages?.length, fetchNextFollowStatesPage])

  useEffect(() => {
    if (isCheckoutFinished) {
      refetchFollowStates()
    }
  }, [isCheckoutFinished, refetchFollowStates])

  // use hashmap for quicker lookups
  const followStatesMap = useMemo(() => {
    const map = new Map<string, FollowStateResponse>()
    followStatesData?.pages.forEach((page) => {
      page.followStates?.forEach((followState) => {
        if (followState.address && followState.state) {
          map.set(followState.address.toLowerCase(), followState.state)
        }
      })
    })
    return map
  }, [followStatesData])

  const profilesWithFollowStates = useMemo(() => {
    return profiles.map((profile, index) => {
      const followState = followStatesMap.get(profile.address.toLowerCase()) as FollowStateResponse
      const isLoading = followState ? isRefetchingFollowStates : (isFollowStatesLoading || isFetchingNextFollowStatesPage)

      return {
        ...profile,
        followState: {
          state: followState as FollowStateResponse,
          isLoading: isLoading,
        } as ForceFollowingState,
      }
    })
  }, [profiles, followStatesMap, isFollowStatesLoading, isFetchingNextFollowStatesPage, isRefetchingFollowStates])

  return {
    profilesWithFollowStates,
    followStatesMap,
    isFollowStatesLoading,
    isFetchingNextFollowStatesPage,
    fetchNextFollowStatesPage,
    refetchFollowStates,
    isRefetchingFollowStates,
  }
}
