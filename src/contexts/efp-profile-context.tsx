'use client'

import { useState, useEffect, useContext, createContext, type Dispatch, type SetStateAction, useMemo } from 'react'
import {
  useQuery,
  useInfiniteQuery,
  type InfiniteData,
  type RefetchOptions,
  type QueryObserverResult,
  type FetchNextPageOptions,
  type InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import type { Address } from 'viem'
import { useRouter } from 'next/navigation'
import { useAccount, useChains } from 'wagmi'
import { fetchProfileDetails, fetchProfileStats } from 'ethereum-identity-kit'

import type {
  ENSProfile,
  ProfileRoles,
  StatsResponse,
  FollowSortType,
  FollowerResponse,
  FollowingResponse,
  ProfileListsResponse,
  FollowingTagsResponse,
  ProfileDetailsResponse,
} from '#/types/requests'
import { DEFAULT_CHAIN } from '#/lib/constants/chains'
import type { ProfileTableTitleType } from '#/types/common'
import { coreEfpContracts } from '#/lib/constants/contracts'
import { fetchProfileRoles } from '#/api/profile/fetch-profile-roles'
import { fetchProfileLists } from '#/api/profile/fetch-profile-lists'
import { fetchProfileFollowers } from '#/api/followers/fetch-profile-followers'
import { fetchProfileFollowing } from '#/api/following/fetch-profile-following'
import { fetchProfileAllFollowings } from '#/api/following/fetch-profile-all-followings'
import { fetchFollowerTags, nullFollowerTags } from '#/api/followers/fetch-follower-tags'
import { fetchFollowingTags, nullFollowingTags } from '#/api/following/fetch-following-tags'
import { BLOCKED_MUTED_TAGS, DEFAULT_TAGS_TO_ADD, FETCH_LIMIT_PARAM } from '#/lib/constants'

// Define the type for the profile context
type EFPProfileContextType = {
  selectedList?: number
  listToFetch?: number
  setSelectedList: Dispatch<SetStateAction<number | undefined>>
  fetchFreshLists: boolean
  setFetchFreshLists: Dispatch<SetStateAction<boolean>>
  lists?: ProfileListsResponse | null
  profile?: ProfileDetailsResponse | null
  stats?: StatsResponse | null
  followingTags?: FollowingTagsResponse
  followerTags?: FollowingTagsResponse
  followers: FollowerResponse[]
  following: FollowingResponse[]
  allFollowingAddresses?: Address[]
  roles?: ProfileRoles
  topEight: {
    address: `0x${string}`
    ens: ENSProfile | undefined
  }[]
  topEightIsLoading: boolean
  topEightIsRefetching: boolean
  listsIsLoading: boolean
  profileIsLoading: boolean
  statsIsLoading: boolean
  followingTagsLoading: boolean
  followerTagsLoading: boolean
  followersIsLoading: boolean
  followingIsLoading: boolean
  isFetchingMoreFollowers: boolean
  isFetchingMoreFollowing: boolean
  isEndOfFollowers: boolean
  isEndOfFollowing: boolean
  fetchMoreFollowers: (options?: FetchNextPageOptions) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<
        {
          followers: FollowerResponse[]
          nextPageParam: number
        },
        unknown
      >,
      Error
    >
  >
  fetchMoreFollowing: (options?: FetchNextPageOptions) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<
        {
          following: FollowingResponse[]
          nextPageParam: number
        },
        unknown
      >,
      Error
    >
  >
  refetchLists: (options?: RefetchOptions) => Promise<QueryObserverResult<ProfileListsResponse | null, Error>>
  refetchProfile: (options?: RefetchOptions) => Promise<QueryObserverResult<ProfileDetailsResponse | null, Error>>
  refetchStats: (options?: RefetchOptions) => Promise<QueryObserverResult<StatsResponse | null, Error>>
  refetchFollowingTags: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<FollowingTagsResponse | undefined, Error>>
  refetchFollowerTags: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<FollowingTagsResponse | undefined, Error>>
  refetchFollowers: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<InfiniteData<{ followers: FollowerResponse[]; nextPageParam: number }, unknown>, Error>
  >
  refetchFollowing: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<InfiniteData<{ following: FollowingResponse[]; nextPageParam: number }, unknown>, Error>
  >
  refetchAllFollowings: (options?: RefetchOptions) => Promise<QueryObserverResult<Address[], Error>>
  refetchRoles: (options?: RefetchOptions) => Promise<QueryObserverResult<ProfileRoles, Error>>
  refetchTopEight: (options?: RefetchOptions) => Promise<QueryObserverResult<FollowingResponse[], Error>>
  recentTags: string[]
  followingTagsFilter: string[]
  followersTagsFilter: string[]
  followingSort: FollowSortType
  followersSort: FollowSortType
  addRecentTag: (tag: string) => void
  toggleTag: (tab: ProfileTableTitleType, tag: string) => void
  setFollowingSort: (option: FollowSortType) => void
  setFollowersSort: (option: FollowSortType) => void
  setFollowingSearch: (value: string) => void
  setFollowersSearch: (value: string) => void
  setFollowingTagsFilter: Dispatch<SetStateAction<string[]>>
  setFollowersTagsFilter: Dispatch<SetStateAction<string[]>>
  fetchFreshStats: boolean
  fetchFreshProfile: boolean
  setFetchFreshProfile: (state: boolean) => void
  setFetchFreshStats: (state: boolean) => void
  setIsRefetchingProfile: (state: boolean) => void
  setIsRefetchingFollowing: (state: boolean) => void
  setSetNewListAsSelected: (state: boolean) => void
}

type Props = {
  children: React.ReactNode
}

const EFPProfileContext = createContext<EFPProfileContextType | undefined>(undefined)

export const EFPProfileProvider: React.FC<Props> = ({ children }) => {
  const [isRefetchingProfile, setIsRefetchingProfile] = useState(false)
  const [isRefetchingFollowing, setIsRefetchingFollowing] = useState(false)

  const [fetchFreshLists, setFetchFreshLists] = useState(false)
  const [fetchFreshStats, setFetchFreshStats] = useState(false)
  const [fetchFreshProfile, setFetchFreshProfile] = useState(false)

  // selectedList = undefined will mean that the connected user can create a new list
  const [selectedList, setSelectedList] = useState<number>()
  const [setNewListAsSelected, setSetNewListAsSelected] = useState(false)

  const [followingSearch, setFollowingSearch] = useState<string>('')
  const [followersSearch, setFollowersSearch] = useState<string>('')
  const [followingTagsFilter, setFollowingTagsFilter] = useState<string[]>([])
  const [followersTagsFilter, setFollowersTagsFilter] = useState<string[]>([])
  const [followingSort, setFollowingSort] = useState<FollowSortType>('follower count')
  const [followersSort, setFollowersSort] = useState<FollowSortType>('follower count')

  const [recentTags, setRecentTags] = useState(DEFAULT_TAGS_TO_ADD)

  const chains = useChains()
  const router = useRouter()
  const { address: userAddress } = useAccount()

  const {
    data: lists,
    isLoading: listsIsLoading,
    refetch: refetchLists,
  } = useQuery({
    queryKey: ['lists', userAddress, fetchFreshLists],
    queryFn: async () => {
      if (!userAddress) return null

      const fetchedLists = await fetchProfileLists(userAddress, fetchFreshLists)
      return fetchedLists
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    meta: {
      persist: true,
    },
  })

  useEffect(() => {
    if (!lists?.lists) return setSelectedList(undefined)

    if (setNewListAsSelected) {
      setSetNewListAsSelected(false)

      const newList = Math.max(...lists.lists.map((list) => Number(list)))

      router.push(`/${newList}`)
      localStorage.setItem('selected-list', newList.toString())
      setSelectedList(newList)

      return
    }

    const persistedList = localStorage.getItem('selected-list')
    if (persistedList && lists.lists.includes(persistedList)) return setSelectedList(Number(persistedList))
    if (persistedList === 'new list') return setSelectedList(undefined)

    if (lists?.primary_list) {
      localStorage.setItem('selected-list', lists.primary_list)
      return setSelectedList(Number(lists.primary_list))
    }
    if (lists?.lists?.length > 0) {
      localStorage.setItem('selected-list', Math.min(...lists.lists.map((list) => Number(list))).toString())
      return setSelectedList(Math.min(...lists.lists.map((list) => Number(list))))
    }

    setSelectedList(undefined)
  }, [lists])

  const isPrimaryList = selectedList === Number(lists?.primary_list)
  const listToFetch = useMemo(
    () => (isPrimaryList && !isRefetchingProfile ? undefined : selectedList),
    [isPrimaryList, selectedList]
  )

  const {
    data: profile,
    isLoading: profileIsLoading,
    refetch: refetchProfile,
    isRefetching: isRefetchingProfileQuery,
  } = useQuery({
    queryKey: ['profile', userAddress, listToFetch, fetchFreshProfile],
    queryFn: async () => {
      if (!userAddress) {
        setIsRefetchingProfile(false)
        return null
      }

      const fetchedProfile = await fetchProfileDetails(userAddress, listToFetch, fetchFreshProfile)
      setIsRefetchingProfile(false)
      return fetchedProfile
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    // meta: {
    //   persist: true,
    // },
  })

  const {
    data: stats,
    isLoading: statsIsLoading,
    refetch: refetchStats,
    isRefetching: isRefetchingStatsQuery,
  } = useQuery({
    queryKey: ['stats', userAddress, listToFetch, fetchFreshStats],
    queryFn: async () => {
      if (!userAddress) return null

      const fetchedStats = await fetchProfileStats(userAddress, listToFetch, fetchFreshStats)
      return fetchedStats
    },
    refetchOnWindowFocus: false,
    // meta: {
    //   persist: true,
    // },
  })

  const [isEndOfFollowing, setIsEndOfFollowing] = useState(false)
  // fetch followers depending on list for the user of the list you are viewing or show connected address followers if no list is selected
  const {
    data: fetchedFollowing,
    isLoading: followingIsLoading,
    fetchNextPage: fetchMoreFollowing,
    isFetchingNextPage: isFetchingMoreFollowing,
    refetch: refetchFollowing,
    isRefetching: isRefetchingFollowingQuery,
  } = useInfiniteQuery({
    queryKey: [
      'following',
      userAddress,
      listToFetch,
      followingSort,
      followingTagsFilter,
      followingSearch.length > 2 ? followingSearch : undefined,
      fetchFreshStats,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      setIsEndOfFollowing(false)

      if (!userAddress) {
        setIsRefetchingFollowing(false)
        return {
          following: [],
          nextPageParam: pageParam,
        }
      }

      const fetchedFollowing = await fetchProfileFollowing({
        addressOrName: userAddress,
        list: listToFetch,
        limit: FETCH_LIMIT_PARAM,
        sort: followingSort,
        tags: followingTagsFilter,
        search: followingSearch,
        pageParam,
        fresh: fetchFreshStats,
      })

      if (fetchedFollowing?.following?.length === 0) setIsEndOfFollowing(true)
      setIsRefetchingFollowing(false)

      return fetchedFollowing
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    // meta: {
    //   persist: true,
    // },
  })

  const [isEndOfFollowers, setIsEndOfFollowers] = useState(false)
  // Fetch followings depending on the selected list
  const {
    data: fetchedFollowers,
    refetch: refetchFollowers,
    isLoading: followersIsLoading,
    fetchNextPage: fetchMoreFollowers,
    isRefetching: isRefetchingFollowersQuery,
    isFetchingNextPage: isFetchingMoreFollowers,
  } = useInfiniteQuery({
    queryKey: [
      'followers',
      userAddress,
      listToFetch,
      followersSort,
      followersTagsFilter,
      followersSearch.length > 2 ? followersSearch : undefined,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      setIsEndOfFollowers(false)

      if (!userAddress) {
        return {
          followers: [],
          nextPageParam: pageParam,
        }
      }

      const fetchedFollowers = await fetchProfileFollowers({
        addressOrName: userAddress,
        list: listToFetch,
        limit: FETCH_LIMIT_PARAM,
        sort: followersSort,
        tags: followersTagsFilter,
        search: followersSearch,
        pageParam,
      })

      if (fetchedFollowers.followers.length === 0) setIsEndOfFollowers(true)

      return fetchedFollowers
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    // meta: {
    //      persist: true,
    //    },
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
    refetch: refetchFollowingTags,
    isRefetching: isRefetchingFollowingTagsQuery,
  } = useQuery({
    queryKey: ['following tags', userAddress, listToFetch, fetchFreshStats],
    queryFn: async () => {
      if (!userAddress) return nullFollowingTags

      const fetchedProfile = await fetchFollowingTags(userAddress, listToFetch, fetchFreshStats)
      return fetchedProfile
    },
    refetchOnWindowFocus: false,
    // meta: {
    //      persist: true,
    //    },
  })

  const {
    data: followerTags,
    refetch: refetchFollowerTags,
    isLoading: followerTagsLoading,
    isRefetching: isRefetchingFollowerTagsQuery,
  } = useQuery({
    queryKey: ['follower tags', userAddress, listToFetch],
    queryFn: async () => {
      if (!userAddress) return nullFollowerTags

      const fetchedTags = await fetchFollowerTags(userAddress, listToFetch)
      return fetchedTags
    },
    // meta: {
    //      persist: true,
    //    },
  })

  const {
    data: topEightFetched,
    refetch: refetchTopEight,
    isLoading: topEightIsLoading,
    isRefetching: topEightIsRefetching,
  } = useQuery({
    queryKey: ['top8', userAddress, listToFetch, fetchFreshStats],
    queryFn: async () => {
      if (!userAddress) return []

      const fetchedFollowing = await fetchProfileFollowing({
        addressOrName: userAddress,
        list: listToFetch,
        limit: 100,
        pageParam: 0,
        tags: ['top8'],
        sort: 'latest first',
        fresh: fetchFreshStats,
      })

      return fetchedFollowing.following
    },
    staleTime: 300000,
    // meta: {
    //      persist: true,
    //    },
  })

  const topEight = topEightFetched?.map((profile) => ({ address: profile.address, ens: profile.ens })) || []

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

  const addRecentTag = (tag: string) => {
    setRecentTags([tag, ...recentTags.filter((recentTag) => recentTag !== tag)].slice(0, 5))
  }

  useEffect(() => {
    if (followingTags?.tagCounts && followingTags?.tagCounts.length > 0) {
      const appliedTags = followingTags?.tagCounts
        ?.sort((a, b) => b.count - a.count)
        .map((tag) => tag.tag)
        .filter((tag) => !BLOCKED_MUTED_TAGS.includes(tag))

      setRecentTags([...appliedTags, ...recentTags].slice(0, 5))
    }
  }, [followingTags])

  const { data: roles, refetch: refetchRoles } = useQuery({
    queryKey: ['userRoles', userAddress, selectedList],
    queryFn: async () => {
      if (!(selectedList && userAddress))
        return {
          isOwner: true,
          isManager: true,
          isUser: true,
          listChainId: DEFAULT_CHAIN.id,
          listRecordsContract: coreEfpContracts.EFPListRecords,
          listSlot: BigInt(0),
        }

      const fetchedRoles = await fetchProfileRoles({
        list: selectedList,
        chains,
        userAddress,
      })

      return fetchedRoles
    },
    // meta: {
    //      persist: true,
    //    },
  })

  const { data: allFollowingAddresses, refetch: refetchAllFollowings } = useQuery({
    queryKey: ['all followings', userAddress, selectedList],
    queryFn: async () => {
      if (!(selectedList && userAddress)) return []

      const fetchedFollowings = await fetchProfileAllFollowings(selectedList)
      return fetchedFollowings.map((address) => address.toLowerCase() as Address)
    },
    // meta: {
    //      persist: true,
    //    },
  })

  return (
    <EFPProfileContext.Provider
      value={{
        selectedList,
        listToFetch,
        setSelectedList,
        fetchFreshLists,
        setFetchFreshLists,
        lists,
        stats,
        profile,
        followerTags,
        followingTags,
        followers,
        following,
        allFollowingAddresses,
        roles,
        topEight,
        topEightIsLoading,
        topEightIsRefetching,
        listsIsLoading,
        followerTagsLoading: followerTagsLoading || isRefetchingFollowerTagsQuery,
        followingTagsLoading: followingTagsLoading || isRefetchingFollowingTagsQuery,
        profileIsLoading: listsIsLoading || isRefetchingProfile || profileIsLoading || isRefetchingProfileQuery,
        statsIsLoading: listsIsLoading || statsIsLoading || isRefetchingStatsQuery,
        followingIsLoading: isRefetchingFollowing || listsIsLoading || followingIsLoading || isRefetchingFollowingQuery,
        followersIsLoading: listsIsLoading || followersIsLoading || isRefetchingFollowersQuery,
        isFetchingMoreFollowers: !isEndOfFollowers && isFetchingMoreFollowers,
        isFetchingMoreFollowing: !isEndOfFollowing && isFetchingMoreFollowing,
        isEndOfFollowers,
        isEndOfFollowing,
        fetchMoreFollowers,
        fetchMoreFollowing,
        refetchLists,
        refetchStats,
        refetchProfile,
        refetchFollowers,
        refetchFollowing,
        refetchFollowerTags,
        refetchFollowingTags,
        refetchAllFollowings,
        setFollowingSearch,
        setFollowersSearch,
        refetchRoles,
        refetchTopEight,
        recentTags,
        followingTagsFilter,
        followersTagsFilter,
        followingSort,
        followersSort,
        addRecentTag,
        toggleTag,
        setFollowingSort: (option: FollowSortType) => {
          setFollowingSort(option)
        },
        setFollowersSort: (option: FollowSortType) => {
          setFollowersSort(option)
        },
        setFollowingTagsFilter,
        setFollowersTagsFilter,
        fetchFreshStats,
        fetchFreshProfile,
        setFetchFreshStats,
        setFetchFreshProfile,
        setIsRefetchingProfile,
        setIsRefetchingFollowing,
        setSetNewListAsSelected,
      }}
    >
      {children}
    </EFPProfileContext.Provider>
  )
}

export const useEFPProfile = (): EFPProfileContextType => {
  const context = useContext(EFPProfileContext)
  if (context === undefined) {
    throw new Error('useEFPProfile must be used within an EFPProfileProvider')
  }
  return context
}
