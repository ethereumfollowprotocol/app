import { isAddress } from 'viem'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { FETCH_LIMIT_PARAM } from '#/lib/constants'
import fetchProfileDetails from '#/api/fetchProfileDetails'
import fetchProfileFollowers from '#/api/fetchProfileFollowers'
import fetchProfileFollowing from '#/api/fetchProfileFollowing'
import type { FollowerResponse, FollowingResponse } from '#/api/requests'
import fetchProfileLists from '#/api/fetchProfileLists'

const useUser = (user: string) => {
  const userIsList = !(isAddress(user) || user.includes('.'))
  const listNum = userIsList ? Number(user) : undefined

  const { data: profile, isLoading: profileIsLoading } = useQuery({
    queryKey: ['profile', user],
    queryFn: async () => {
      if (!user) return null

      const fetchedProfile = await fetchProfileDetails(user, listNum)
      return fetchedProfile
    },
    staleTime: 20000
  })

  const { data: lists } = useQuery({
    queryKey: ['lists', profile],
    queryFn: async () => {
      if (!profile?.address) return null

      const fetchedLists = await fetchProfileLists(profile.address)
      return fetchedLists
    },
    staleTime: 3600000
  })

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
        // list: listNum,
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
        list: listNum,
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
    lists,
    profile,
    followers,
    following,
    profileIsLoading,
    followersIsLoading,
    followingIsLoading,
    fetchMoreFollowers,
    fetchMoreFollowing,
    isFetchingMoreFollowers,
    isFetchingMoreFollowing
  }
}

export default useUser
