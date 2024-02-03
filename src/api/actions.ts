'use client'

import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'
import {
  fetchUserFollowers,
  fetchUserFollowing,
  type FollowerResponse,
  type FollowingResponse
} from './requests'

type ConnectedAddressFollowing = {
  connectedAddressFollowing: FollowingResponse[] | undefined
  connectedAddressFollowingAddresses: Address[] | undefined
}

export function useConnectedFollowing(): ConnectedAddressFollowing {
  const { isConnected, address: connectedAddress } = useAccount()

  /////////////////////////////////////////////////////////////////////////////
  // following for the connected account
  /////////////////////////////////////////////////////////////////////////////
  const { data, error, status } = useQuery({
    queryKey: ['following', connectedAddress],
    enabled: isConnected,
    queryFn: () => fetchUserFollowing({ addressOrName: connectedAddress as Address })
  })

  return {
    connectedAddressFollowing: data?.following,
    connectedAddressFollowingAddresses: data?.following
      ?.filter(follow => follow.record_type === 'address')
      .map(follow => follow.data)
  }
}

type ConnectedAddressFollowers = {
  connectedAddressFollowers: FollowerResponse[] | undefined
  connectedAddressFollowerAddresses: Address[] | undefined
}

export function useConnectedFollowers(): ConnectedAddressFollowers {
  const { isConnected, address: connectedAddress } = useAccount()

  /////////////////////////////////////////////////////////////////////////////
  // followers for the connected account
  /////////////////////////////////////////////////////////////////////////////
  const { data, error, status } = useQuery({
    queryKey: ['followers', connectedAddress],
    enabled: isConnected,
    queryFn: () => fetchUserFollowers({ addressOrName: connectedAddress as Address })
  })

  return {
    connectedAddressFollowers: data?.followers,
    connectedAddressFollowerAddresses: data?.followers?.map(follower => follower.address)
  }
}

type ConnectedEFPProfile = ConnectedAddressFollowing & ConnectedAddressFollowers

export function useConnectedProfile(): ConnectedEFPProfile {
  const { connectedAddressFollowing, connectedAddressFollowingAddresses } = useConnectedFollowing()
  const { connectedAddressFollowers, connectedAddressFollowerAddresses } = useConnectedFollowers()

  return {
    connectedAddressFollowing,
    connectedAddressFollowingAddresses,
    connectedAddressFollowers,
    connectedAddressFollowerAddresses
  }
}

type Following = {
  following: FollowingResponse[] | undefined
  followingAddresses: Address[] | undefined
}

export function useFollowing(addressOrName: Address | string): Following {
  const { data, error, status } = useQuery({
    queryKey: ['following', addressOrName],
    queryFn: () => fetchUserFollowing({ addressOrName })
  })

  return {
    following: data?.following,
    followingAddresses: data?.following
      ?.filter(follow => follow.record_type === 'address')
      .map(follow => follow.data)
  }
}

type Followers = {
  followers: FollowerResponse[] | undefined
  followerAddresses: Address[] | undefined
}

export function useFollowers(addressOrName: Address | string): Followers {
  const { data, error, status } = useQuery({
    queryKey: ['followers', addressOrName],
    queryFn: () => fetchUserFollowers({ addressOrName })
  })

  return {
    followers: data?.followers,
    followerAddresses: data?.followers?.map(follower => follower.address)
  }
}

type Profile = Following & Followers

export function useProfile(addressOrName: Address | string): Profile {
  const { following, followingAddresses } = useFollowing(addressOrName)
  const { followers, followerAddresses } = useFollowers(addressOrName)

  return {
    following,
    followingAddresses,
    followers,
    followerAddresses
  }
}
