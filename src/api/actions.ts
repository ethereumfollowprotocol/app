'use client'

import type { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'

import {
  fetchUserFollowing,
  fetchUserFollowers,
  type FollowerResponse,
  type FollowingResponse
} from './requests'

type Following = {
  following: FollowingResponse[] | undefined
  followingAddresses: Address[] | undefined
  getFollowingByAddress: (address: Address) => FollowingResponse | undefined
  hasFollowingByAddress: (address: Address) => boolean
}

export function useFollowing(addressOrName: Address | string): Following {
  const { data } = useQuery({
    queryKey: ['following', addressOrName],
    queryFn: () => fetchUserFollowing(addressOrName)
  })

  return {
    following: data?.following,
    followingAddresses: data?.following
      ?.filter(follow => follow.record_type === 'address')
      .map(follow => follow.data),
    getFollowingByAddress: (address: Address) => {
      return data?.following?.find(follow => follow.data === address)
    },
    hasFollowingByAddress: (address: Address) => {
      return !!data?.following?.find(follow => follow.data === address)
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
    queryFn: () => fetchUserFollowers(addressOrName)
  })

  return {
    followers: data?.followers,
    followerAddresses: data?.followers?.map(follower => follower.address),
    getFollowerByAddress: (address: Address) => {
      return data?.followers?.find(
        follower => follower.address.toLowerCase() === address?.toLowerCase()
      )
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
