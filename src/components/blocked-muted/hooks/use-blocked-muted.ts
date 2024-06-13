import fetchProfileFollowers from '#/api/fetchProfileFollowers'
import fetchProfileFollowing from '#/api/fetchProfileFollowing'
import type { FollowerResponse, FollowingResponse } from '#/api/requests'
import { FETCH_LIMIT_PARAM } from '#/lib/constants'
import { useInfiniteQuery } from '@tanstack/react-query'

const useBlockedMuted = (user: string) => {
  const {
    data: fetchedFollowers,
    isLoading: followersIsLoading,
    fetchNextPage: fetchMoreFollowers,
    isFetchingNextPage: isFetchingMoreFollowers
  } = useInfiniteQuery({
    queryKey: ['followers', user],
    queryFn: async ({ pageParam = 0 }) => {
      if (!user)
        return {
          followers: [],
          nextPageParam: pageParam
        }

      const fetchedFollowers = await fetchProfileFollowers({
        addressOrName: user,
        limit: FETCH_LIMIT_PARAM,
        pageParam
      })
      return fetchedFollowers
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPageParam,
    staleTime: 120000
  })

  const {
    data: fetchedFollowing,
    isLoading: followingIsLoading,
    fetchNextPage: fetchMoreFollowing,
    isFetchingNextPage: isFetchingMoreFollowing
  } = useInfiniteQuery({
    queryKey: ['following', user],
    queryFn: async ({ pageParam = 0 }) => {
      if (!user)
        return {
          following: [],
          nextPageParam: pageParam
        }

      const fetchedFollowers = await fetchProfileFollowing({
        addressOrName: user,
        limit: FETCH_LIMIT_PARAM,
        pageParam
      })
      return fetchedFollowers
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPageParam,
    staleTime: 120000
  })

  const followers = fetchedFollowers
    ? fetchedFollowers.pages.reduce(
        (acc, el) => [...acc, ...el.followers],
        [] as FollowerResponse[]
      )
    : []

  const following = fetchedFollowing
    ? fetchedFollowing.pages.reduce(
        (acc, el) => [...acc, ...el.following],
        [] as FollowingResponse[]
      )
    : []

  return {
    followers,
    following,
    followersIsLoading,
    followingIsLoading,
    fetchMoreFollowers,
    fetchMoreFollowing,
    isFetchingMoreFollowers,
    isFetchingMoreFollowing
  }
}

export default useBlockedMuted
