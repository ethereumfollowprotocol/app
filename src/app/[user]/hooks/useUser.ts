import { useState } from 'react'
import { isAddress } from 'viem'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { FETCH_LIMIT_PARAM } from '#/lib/constants'
import fetchProfileLists from '#/api/fetchProfileLists'
import fetchProfileDetails from '#/api/fetchProfileDetails'
import fetchProfileFollowers from '#/api/fetchProfileFollowers'
import fetchProfileFollowing from '#/api/fetchProfileFollowing'
import type { FollowerResponse, FollowingResponse } from '#/types/requests'

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
    }
  })

  const [isEndOfFollowers, setIsEndOfFollowers] = useState(false)
  const {
    data: fetchedFollowers,
    isLoading: followersIsLoading,
    fetchNextPage: fetchMoreFollowers,
    isFetchingNextPage: isFetchingMoreFollowers
  } = useInfiniteQuery({
    queryKey: ['followers', user],
    queryFn: async ({ pageParam = 0 }) => {
      setIsEndOfFollowers(false)

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

      if (fetchedFollowers.followers.length === 0) setIsEndOfFollowers(true)

      return fetchedFollowers
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPageParam
  })

  const [isEndOfFollowing, setIsEndOfFollowing] = useState(false)
  const {
    data: fetchedFollowing,
    isLoading: followingIsLoading,
    fetchNextPage: fetchMoreFollowing,
    isFetchingNextPage: isFetchingMoreFollowing
  } = useInfiniteQuery({
    queryKey: ['following', user],
    queryFn: async ({ pageParam = 0 }) => {
      setIsEndOfFollowing(false)

      if (!user)
        return {
          following: [],
          nextPageParam: pageParam
        }

      const fetchedFollowing = await fetchProfileFollowing({
        addressOrName: user,
        list: listNum,
        limit: FETCH_LIMIT_PARAM,
        pageParam
      })

      if (fetchedFollowing.following.length === 0) setIsEndOfFollowing(true)

      return fetchedFollowing
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPageParam
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
    listNum,
    followers,
    following,
    userIsList,
    profileIsLoading,
    followersIsLoading,
    followingIsLoading,
    fetchMoreFollowers,
    fetchMoreFollowing,
    isEndOfFollowing,
    isEndOfFollowers,
    isFetchingMoreFollowers,
    isFetchingMoreFollowing
  }
}

export default useUser
