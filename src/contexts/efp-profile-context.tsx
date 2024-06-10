import {
  useQuery,
  useInfiniteQuery,
  type InfiniteData,
  type RefetchOptions,
  type QueryObserverResult,
  type FetchNextPageOptions,
  type InfiniteQueryObserverResult
} from '@tanstack/react-query'
import { useAccount, useChains } from 'wagmi'
import { createContext, useContext, useEffect, useState } from 'react'

import type {
  ProfileRoles,
  FollowerResponse,
  FollowingResponse,
  ProfileDetailsResponse
} from '#/api/requests'
import { useCart } from './cart-context'
import { FETCH_LIMIT_PARAM } from '#/lib/constants'
import type { ProfileTabType } from '#/types/common'
import fetchProfileRoles from '#/api/fetchProfileRoles'
import fetchProfileDetails from '#/api/fetchProfileDetails'
import fetchProfileFollowers from '#/api/fetchProfileFollowers'
import fetchProfileFollowing from '#/api/fetchProfileFollowing'

// Define the type for the profile context
type EFPProfileContextType = {
  profile?: ProfileDetailsResponse | null
  followers: FollowerResponse[]
  following: FollowingResponse[]
  roles?: ProfileRoles
  profileIsLoading: boolean
  followersIsLoading: boolean
  followingIsLoading: boolean
  isFetchingMoreFollowers: boolean
  isFetchingMoreFollowing: boolean
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
  refetchProfile: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ProfileDetailsResponse | null, Error>>
  refetchFollowers: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<
      InfiniteData<{ followers: FollowerResponse[]; nextPageParam: number }, unknown>,
      Error
    >
  >
  refetchFollowing: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<
      InfiniteData<{ following: FollowingResponse[]; nextPageParam: number }, unknown>,
      Error
    >
  >
  refetchRoles: (options?: RefetchOptions) => Promise<QueryObserverResult<ProfileRoles, Error>>
  followingTags: string[]
  followersTags: string[]
  followingSort: string | undefined
  followersSort: string | undefined
  toggleTag: (tab: ProfileTabType, tag: string) => void
  setFollowingSort: (option: string) => void
  setFollowersSort: (option: string) => void
  profileError: Error | null
  followersError: Error | null
  followingError: Error | null
}

type Props = {
  children: React.ReactNode
}

const EFPProfileContext = createContext<EFPProfileContextType | undefined>(undefined)

export const EFPProfileProvider: React.FC<Props> = ({ children }) => {
  const [followingTags, setFollowingTags] = useState<string[]>([])
  const [followersTags, setFollowersTags] = useState<string[]>([])
  const [followingSort, setFollowingSort] = useState<string>('follower count')
  const [followersSort, setFollowersSort] = useState<string>('follower count')

  const chains = useChains()
  const { resetCart } = useCart()
  const { address: userAddress } = useAccount()
  const {
    data: profile,
    isLoading: profileIsLoading,
    error: profileError,
    refetch: refetchProfile
  } = useQuery({
    queryKey: ['profile', userAddress],
    queryFn: async () => {
      if (!userAddress) return null

      const fetchedProfile = await fetchProfileDetails(userAddress)
      return fetchedProfile
    },
    refetchInterval: 60000,
    staleTime: 10000
  })

  const {
    data: fetchedFollowers,
    isLoading: followersIsLoading,
    error: followersError,
    fetchNextPage: fetchMoreFollowers,
    isFetchingNextPage: isFetchingMoreFollowers,
    refetch: refetchFollowers
  } = useInfiniteQuery({
    queryKey: ['followers', userAddress],
    queryFn: async ({ pageParam = 0 }) => {
      if (!userAddress)
        return {
          followers: [],
          nextPageParam: pageParam
        }

      const fetchedFollowers = await fetchProfileFollowers({
        addressOrName: userAddress,
        limit: FETCH_LIMIT_PARAM,
        pageParam
      })
      return fetchedFollowers
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPageParam,
    refetchInterval: 60000,
    staleTime: 10000
  })

  const {
    data: fetchedFollowing,
    isLoading: followingIsLoading,
    fetchNextPage: fetchMoreFollowing,
    isFetchingNextPage: isFetchingMoreFollowing,
    error: followingError,
    refetch: refetchFollowing
  } = useInfiniteQuery({
    queryKey: ['following', userAddress],
    queryFn: async ({ pageParam = 0 }) => {
      if (!userAddress)
        return {
          following: [],
          nextPageParam: pageParam
        }

      const fetchedFollowers = await fetchProfileFollowing({
        addressOrName: userAddress,
        limit: FETCH_LIMIT_PARAM,
        pageParam
      })
      return fetchedFollowers
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPageParam,
    refetchInterval: 60000,
    staleTime: 10000
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

  useEffect(() => {
    const cartAddress = localStorage.getItem('cart address')
    if (userAddress?.toLowerCase() === cartAddress?.toLowerCase() || !userAddress) return
    resetCart()
  }, [userAddress])

  const toggleTag = (tab: ProfileTabType, tag: string) => {
    if (tab === 'following') {
      if (followingTags.includes(tag)) {
        setFollowingTags(followingTags.filter(item => item !== tag))
      } else {
        setFollowingTags([...followingTags, tag])
      }
    }

    if (tab === 'followers') {
      if (followersTags.includes(tag)) {
        setFollowersTags(followersTags.filter(item => item !== tag))
      } else {
        setFollowersTags([...followersTags, tag])
      }
    }
  }

  const { data: roles, refetch: refetchRoles } = useQuery({
    queryKey: ['userRoles', userAddress, profile],
    queryFn: async () => {
      if (!(profile?.primary_list && userAddress))
        return {
          isOwner: false,
          isManager: false,
          isUser: false
        }

      const fetchedRoles = await fetchProfileRoles({
        primary_list: profile.primary_list,
        chains,
        userAddress
      })

      return fetchedRoles
    }
  })

  return (
    <EFPProfileContext.Provider
      value={{
        profile,
        followers,
        following,
        roles,
        profileIsLoading,
        followersIsLoading,
        followingIsLoading,
        isFetchingMoreFollowers,
        isFetchingMoreFollowing,
        fetchMoreFollowers,
        fetchMoreFollowing,
        refetchProfile,
        refetchFollowers,
        refetchFollowing,
        refetchRoles,
        followingTags,
        followersTags,
        followingSort,
        followersSort,
        toggleTag,
        setFollowingSort: (option: string) => {
          setFollowingSort(option)
        },
        setFollowersSort: (option: string) => {
          setFollowersSort(option)
        },
        profileError,
        followersError,
        followingError
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
