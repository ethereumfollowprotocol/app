import { useState } from 'react'
import { isAddress } from 'viem'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { fetchProfileDetails, fetchProfileStats } from '@encrypteddegen/identity-kit'

import { FETCH_LIMIT_PARAM, MINUTE } from '#/lib/constants'
import type { ProfileTableTitleType } from '#/types/common'
import { fetchProfileFollowers } from '#/api/followers/fetch-profile-followers'
import { fetchProfileFollowing } from '#/api/following/fetch-profile-following'
import { fetchFollowerTags, nullFollowerTags } from '#/api/followers/fetch-follower-tags'
import type { FollowerResponse, FollowingResponse, FollowSortType } from '#/types/requests'
import { fetchFollowingTags, nullFollowingTags } from '#/api/following/fetch-following-tags'

const useUser = (user: string) => {
  const [fetchFreshProfile, setFetchFreshProfile] = useState(false)
  const [fetchFreshStats, setFetchFreshStats] = useState(false)
  const [followingSearch, setFollowingSearch] = useState<string>('')
  const [followersSearch, setFollowersSearch] = useState<string>('')
  const [followingTagsFilter, setFollowingTagsFilter] = useState<string[]>([])
  const [followersTagsFilter, setFollowersTagsFilter] = useState<string[]>([])
  const [followingSort, setFollowingSort] = useState<FollowSortType>('follower count')
  const [followersSort, setFollowersSort] = useState<FollowSortType>('follower count')

  const userIsList = !(isAddress(user) || String(user).includes('.') || Number.isNaN(Number(user)))
  const listNum = userIsList ? Number(user) : undefined

  const isValidUser =
    (userIsList && listNum && listNum > 0 && listNum < 1000000000) || user.includes('.') || isAddress(user)

  const {
    data: profile,
    isLoading: profileIsLoading,
    isRefetching: isRefetchingProfile,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ['profile', user, fetchFreshProfile],
    queryFn: async () => {
      if (!isValidUser) return null

      const fetchedProfile = await fetchProfileDetails(user, listNum, fetchFreshProfile)
      return fetchedProfile
    },
    staleTime: 3 * MINUTE,
    refetchOnWindowFocus: false,
  })

  const [isEndOfFollowing, setIsEndOfFollowing] = useState(false)
  const {
    data: fetchedFollowing,
    isLoading: followingIsLoading,
    fetchNextPage: fetchMoreFollowing,
    isFetchingNextPage: isFetchingMoreFollowing,
    isRefetching: isRefetchingFollowing,
  } = useInfiniteQuery({
    queryKey: [
      'following',
      user,
      followingSort,
      followingTagsFilter,
      followingSearch.length > 1 ? followingSearch : undefined,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      setIsEndOfFollowing(false)

      if (!isValidUser)
        return {
          following: [],
          nextPageParam: pageParam,
        }

      const fetchedFollowing = await fetchProfileFollowing({
        addressOrName: user,
        list: listNum,
        limit: FETCH_LIMIT_PARAM,
        pageParam,
        tags: followingTagsFilter,
        sort: followingSort,
        search: followingSearch,
      })

      if (fetchedFollowing.following.length === 0) setIsEndOfFollowing(true)

      return fetchedFollowing
    },
    staleTime: 30000,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    refetchOnWindowFocus: false,
  })

  const [isEndOfFollowers, setIsEndOfFollowers] = useState(false)
  const {
    data: fetchedFollowers,
    isLoading: followersIsLoading,
    fetchNextPage: fetchMoreFollowers,
    isFetchingNextPage: isFetchingMoreFollowers,
    isRefetching: isRefetchingFollowers,
  } = useInfiniteQuery({
    queryKey: [
      'followers',
      user,
      followersSort,
      followersTagsFilter,
      followersSearch.length > 1 ? followersSearch : undefined,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      setIsEndOfFollowers(false)

      if (!isValidUser)
        return {
          followers: [],
          nextPageParam: pageParam,
        }

      const fetchedFollowers = await fetchProfileFollowers({
        addressOrName: user,
        list: listNum,
        limit: FETCH_LIMIT_PARAM,
        pageParam,
        tags: followersTagsFilter,
        sort: followersSort,
        search: followersSearch,
      })

      if (fetchedFollowers.followers.length === 0) setIsEndOfFollowers(true)

      return fetchedFollowers
    },
    staleTime: 30000,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    refetchOnWindowFocus: false,
  })

  const {
    data: stats,
    isLoading: statsIsLoading,
    isRefetching: isRefetchingStatsQuery,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ['stats', user, fetchFreshStats],
    queryFn: async () => {
      if (!isValidUser) return null

      const fetchedStats = await fetchProfileStats(user, listNum, fetchFreshStats)

      return fetchedStats
    },
    // refetchInterval: 60000
    refetchOnWindowFocus: false,
  })

  const followers = fetchedFollowers
    ? fetchedFollowers.pages.reduce((acc, el) => [...acc, ...el.followers], [] as FollowerResponse[])
    : []

  const following = fetchedFollowing
    ? fetchedFollowing.pages.reduce((acc, el) => [...acc, ...el.following], [] as FollowingResponse[])
    : []

  const {
    data: followingTags,
    isLoading: followingTagsLoading,
    isRefetching: isRefetchingFollowingTags,
  } = useQuery({
    queryKey: ['following tags', user],
    queryFn: async () => {
      if (!isValidUser) return nullFollowingTags

      const fetchedTags = await fetchFollowingTags(user, listNum)
      return fetchedTags
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  })

  const {
    data: followerTags,
    isLoading: followerTagsLoading,
    isRefetching: isRefetchingFollowerTags,
  } = useQuery({
    queryKey: ['follower tags', user],
    queryFn: async () => {
      if (!isValidUser) return nullFollowerTags

      const fetchedTags = await fetchFollowerTags(user, userIsList ? listNum : undefined)
      return fetchedTags
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  })

  const toggleTag = (tab: ProfileTableTitleType, tag: string) => {
    if (tab === 'following') {
      if (followingTagsFilter.includes(tag)) {
        setFollowingTagsFilter(followingTagsFilter.filter((item) => item !== tag))
      } else {
        setFollowingTagsFilter([...followingTagsFilter, tag])
      }
    }

    if (tab === 'followers') {
      if (followersTagsFilter.includes(tag)) {
        setFollowersTagsFilter(followersTagsFilter.filter((item) => item !== tag))
      } else {
        setFollowersTagsFilter([...followersTagsFilter, tag])
      }
    }
  }

  return {
    stats,
    profile,
    listNum,
    followers,
    following,
    followerTags,
    followingTags,
    userIsList,
    statsIsLoading: statsIsLoading || isRefetchingStatsQuery,
    profileIsLoading: profileIsLoading || isRefetchingProfile,
    followersIsLoading: followersIsLoading || isRefetchingFollowers,
    followingIsLoading: followingIsLoading || isRefetchingFollowing,
    followerTagsLoading: followerTagsLoading || isRefetchingFollowerTags,
    followingTagsLoading: followingTagsLoading || isRefetchingFollowingTags,
    fetchMoreFollowers,
    fetchMoreFollowing,
    isEndOfFollowing,
    isEndOfFollowers,
    isFetchingMoreFollowers,
    isFetchingMoreFollowing,
    followingTagsFilter,
    followersTagsFilter,
    setFollowersSearch,
    setFollowingSearch,
    followingSort,
    setFollowingSort,
    followersSort,
    toggleTag,
    setFollowersSort,
    setFollowersTagsFilter,
    setFollowingTagsFilter,
    refetchProfile,
    fetchFreshProfile,
    setFetchFreshProfile,
    refetchStats,
    fetchFreshStats,
    setFetchFreshStats,
  }
}

export default useUser
