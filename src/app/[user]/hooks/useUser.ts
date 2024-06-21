import { isAddress } from 'viem'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { FETCH_LIMIT_PARAM } from '#/lib/constants'
import fetchProfileLists from '#/api/fetchProfileLists'
import fetchProfileDetails from '#/api/fetchProfileDetails'
import fetchProfileFollowers from '#/api/fetchProfileFollowers'
import fetchProfileFollowing from '#/api/fetchProfileFollowing'
import type { FollowerResponse, FollowingResponse, FollowSortType } from '#/types/requests'
import fetchFollowingTags from '#/api/fetchFollowingTags'
import { useState } from 'react'
import type { ProfileTableTitleType } from '#/types/common'

const useUser = (user: string) => {
  const [followingTagsFilter, setFollowingTagsFilter] = useState<string[]>([])
  const [followersTagsFilter, setFollowersTagsFilter] = useState<string[]>([])
  const [followingSort, setFollowingSort] = useState<FollowSortType>('latest first')
  const [followersSort, setFollowersSort] = useState<FollowSortType>('latest first')

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

  const { data: followingTags, isLoading: followingTagsLoading } = useQuery({
    queryKey: ['following tags', user],
    queryFn: async () => {
      if (!user) return

      const fetchedProfile = await fetchFollowingTags(user, listNum)
      return fetchedProfile
    },
    refetchInterval: 60000
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

  const toggleTag = (tab: ProfileTableTitleType, tag: string) => {
    if (tab === 'following') {
      if (followingTagsFilter.includes(tag)) {
        setFollowingTagsFilter(followingTagsFilter.filter(item => item !== tag))
      } else {
        setFollowingTagsFilter([...followingTagsFilter, tag])
      }
    }

    if (tab === 'followers') {
      if (followersTagsFilter.includes(tag)) {
        setFollowersTagsFilter(followersTagsFilter.filter(item => item !== tag))
      } else {
        setFollowersTagsFilter([...followersTagsFilter, tag])
      }
    }
  }

  return {
    lists,
    profile,
    followers,
    following,
    followingTags,
    profileIsLoading,
    followersIsLoading,
    followingIsLoading,
    followingTagsLoading,
    fetchMoreFollowers,
    fetchMoreFollowing,
    isFetchingMoreFollowers,
    isFetchingMoreFollowing,
    followingTagsFilter,
    followersTagsFilter,
    followingSort,
    setFollowingSort,
    followersSort,
    toggleTag,
    setFollowersSort
  }
}

export default useUser
