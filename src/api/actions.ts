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

type ConnectedAddressFollowing = { connectedAddressFollowing: FollowingResponse[] | undefined }

export function useConnectedEFPFollowing(): ConnectedAddressFollowing {
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
    connectedAddressFollowing: data?.following
  }
}

type ConnectedAddressFollowers = { connectedAddressFollowers: FollowerResponse[] | undefined }

export function useConnectedEFPFollowers(): ConnectedAddressFollowers {
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
    connectedAddressFollowers: data?.followers
  }
}

type ConnectedEFPProfile = ConnectedAddressFollowing & ConnectedAddressFollowers

export function useConnectedEFPProfile(): ConnectedEFPProfile {
  const { connectedAddressFollowing } = useConnectedEFPFollowing()
  const { connectedAddressFollowers } = useConnectedEFPFollowers()

  return {
    connectedAddressFollowing,
    connectedAddressFollowers
  }
}

type Following = { following: FollowingResponse[] | undefined }

export function useFollowing(addressOrName: Address | string): Following {
  const { data, error, status } = useQuery({
    queryKey: ['following', addressOrName],
    queryFn: () => fetchUserFollowing({ addressOrName })
  })

  return {
    following: data?.following
  }
}

type Followers = { followers: FollowerResponse[] | undefined }

export function useFollowers(addressOrName: Address | string): Followers {
  const { data, error, status } = useQuery({
    queryKey: ['followers', addressOrName],
    queryFn: () => fetchUserFollowers({ addressOrName })
  })

  return {
    followers: data?.followers
  }
}

type Profile = Following & Followers

export function useProfile(addressOrName: Address | string): Profile {
  const { following } = useFollowing(addressOrName)
  const { followers } = useFollowers(addressOrName)

  return {
    following,
    followers
  }
}
