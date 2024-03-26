'use client'

import type { ENSProfile } from '#/lib/types'
import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'
import {
  fetchUserFollowers,
  fetchUserFollowing,
  fetchUserProfile,
  type FollowerResponse,
  type FollowingResponse
} from './requests'

type ConnectedAddressFollowing = {
  connectedAddressFollowing: FollowingResponse[] | undefined
  connectedAddressFollowingAddresses: Address[] | undefined
  getConnectedAddressFollowingByAddress: (address: Address) => FollowingResponse | undefined
}

export function useConnectedFollowing(): ConnectedAddressFollowing {
  const { isConnected, address: connectedAddress } = useAccount()

  /////////////////////////////////////////////////////////////////////////////
  // following for the connected account
  /////////////////////////////////////////////////////////////////////////////
  const { data } = useQuery({
    queryKey: ['following', connectedAddress],
    enabled: isConnected,
    queryFn: () => fetchUserFollowing({ addressOrName: connectedAddress as Address })
  })

  return {
    connectedAddressFollowing: data?.following,
    connectedAddressFollowingAddresses: data?.following
      ?.filter(follow => follow.record_type === 'address')
      .map(follow => follow.data),

    getConnectedAddressFollowingByAddress: (address: Address) => {
      return data?.following?.find(follow => follow.data === address)
    }
  }
}

type ConnectedAddressFollowers = {
  connectedAddressFollowers: FollowerResponse[] | undefined
  connectedAddressFollowerAddresses: Address[] | undefined
  getConnectedAddressFollowerByAddress: (address: Address) => FollowerResponse | undefined
}

export function useConnectedFollowers(): ConnectedAddressFollowers {
  const { isConnected, address: connectedAddress } = useAccount()

  /////////////////////////////////////////////////////////////////////////////
  // followers for the connected account
  /////////////////////////////////////////////////////////////////////////////
  const { data } = useQuery({
    queryKey: ['followers', connectedAddress],
    enabled: isConnected,
    queryFn: () => fetchUserFollowers({ addressOrName: connectedAddress as Address })
  })

  return {
    connectedAddressFollowers: data?.followers,
    connectedAddressFollowerAddresses: data?.followers?.map(follower => follower.address),
    getConnectedAddressFollowerByAddress: (address: Address) => {
      return data?.followers?.find(follower => follower.address === address)
    }
  }
}

export type FollowState = 'follows' | 'blocks' | 'mutes' | 'none'

type EFPProfile = {
  address: Address
  ens: ENSProfile | undefined
  followers: FollowerResponse[] | undefined
  followerAddresses: Address[] | undefined
  getFollowingByAddress: (address: Address) => FollowingResponse | undefined
  doesFollow: (address: Address) => boolean
  getFollowState(address: Address): FollowState
  following: FollowingResponse[] | undefined
  followingAddresses: Address[] | undefined
  getFollowerByAddress: (address: Address) => FollowerResponse | undefined
  isFollowedBy: (address: Address) => boolean
  primaryList: number | undefined
  stats: {
    followersCount: number
    followingCount: number
  }
}

type ConnectedAddressProfile = {
  profile: EFPProfile | undefined
}

export function useConnectedProfile(): ConnectedAddressProfile {
  const { isConnected, address: connectedAddress } = useAccount()

  /////////////////////////////////////////////////////////////////////////////
  // followers for the connected account
  /////////////////////////////////////////////////////////////////////////////
  const { data } = useQuery({
    queryKey: ['Profile', connectedAddress],
    enabled: isConnected && !!connectedAddress,
    queryFn: connectedAddress
      ? () => fetchUserProfile({ addressOrName: connectedAddress })
      : undefined
  })

  if (!data) {
    return {
      profile: undefined
    }
  }

  const getFollowingByAddress: EFPProfile['getFollowingByAddress'] = (address: Address) => {
    return data.following?.find(follow => follow.data === address.toLowerCase())
  }

  const getFollowState: EFPProfile['getFollowState'] = (address: Address) => {
    const following: FollowingResponse | undefined = getFollowingByAddress(address)
    if (following === undefined) {
      return 'none'
    }
    if (following.tags.includes('block')) {
      return 'blocks'
    }
    if (following.tags.includes('mute')) {
      return 'mutes'
    }
    return 'follows'
  }

  return {
    profile: {
      address: data.address,
      ens: data.ens,
      followers: data.followers,
      followerAddresses: data.followers?.map(follower => follower.address),
      getFollowingByAddress,
      getFollowState,
      doesFollow: (address: Address) => {
        return data.following?.some(follow => follow.data === address.toLowerCase()) ?? false
      },
      following: data.following,
      followingAddresses: data.following
        ?.filter(follow => follow.record_type === 'address')
        .map(follow => follow.data),
      getFollowerByAddress: (address: Address) => {
        return data.followers?.find(follower => follower.address === address.toLowerCase())
      },
      isFollowedBy: (address: Address) => {
        return data.followers?.some(follower => follower.address === address.toLowerCase()) ?? false
      },
      primaryList: Number(data.primary_list),
      stats: {
        followersCount: data.stats?.followers_count || 0,
        followingCount: data.stats?.following_count || 0
      }
    }
  }
}

type Following = {
  following: FollowingResponse[] | undefined
  followingAddresses: Address[] | undefined
  getFollowingByAddress: (address: Address) => FollowingResponse | undefined
}

export function useFollowing(addressOrName: Address | string): Following {
  const { data } = useQuery({
    queryKey: ['following', addressOrName],
    queryFn: () => fetchUserFollowing({ addressOrName })
  })

  return {
    following: data?.following,
    followingAddresses: data?.following
      ?.filter(follow => follow.record_type === 'address')
      .map(follow => follow.data),
    getFollowingByAddress: (address: Address) => {
      return data?.following?.find(follow => follow.data === address)
    }
  }
}

type Followers = {
  followers: FollowerResponse[] | undefined
  followerAddresses: Address[] | undefined
  getFollowerByAddress: (address: Address) => FollowerResponse | undefined
}

export function useFollowers(addressOrName: Address | string): Followers {
  const { data } = useQuery({
    queryKey: ['followers', addressOrName],
    queryFn: () => fetchUserFollowers({ addressOrName })
  })

  return {
    followers: data?.followers,
    followerAddresses: data?.followers?.map(follower => follower.address),
    getFollowerByAddress: (address: Address) => {
      return data?.followers?.find(follower => follower.address === address)
    }
  }
}

export type Profile = Following & Followers

export function useProfile(addressOrName: Address | string): Profile {
  return {
    ...useFollowing(addressOrName),
    ...useFollowers(addressOrName)
  }
}
