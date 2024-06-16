import type { Address } from 'viem'
import type { ENSProfile } from '#/lib/types'
import { formatAddressOrName } from '#/lib/utilities'

export interface InfiniteProfileQueryProps {
  addressOrName: string
  limit: number
  pageParam: number
}
export interface FollowerResponse {
  address: Address
  ens: ENSProfile
  tags: string[]
  is_muted: boolean
  is_blocked: boolean
  is_following: boolean
}

export interface FollowingResponse {
  version: 1
  record_type: 'address' & string
  data: Address
  tags: string[]
  ens?: ENSProfile
}

export interface StatsResponse {
  followers_count: number
  following_count: number
}

export interface ProfileResponse {
  address: Address
  ens: ENSProfile
  fresh?: number
  resolver?: string
  primary_list?: number | null
  stats?: StatsResponse | undefined
  followers?: FollowerResponse[]
  following?: FollowingResponse[]
  chains?: Record<string, string>
  errors?: Record<string, unknown>
}

export interface ProfileDetailsResponse {
  address: Address
  ens: ENSProfile
  primary_list?: number | null
  stats?: StatsResponse | undefined
}

type AddressOrName = Address | string

export type ProfileRoles = {
  isOwner: boolean
  isManager: boolean
  isUser: boolean
}

///////////////////////////////////////////////////////////////////////////////
// /users/:addressOrENS/profile
///////////////////////////////////////////////////////////////////////////////

export async function fetchUserFollowers(
  addressOrName?: AddressOrName
): Promise<{ followers: FollowerResponse[] }> {
  if (!addressOrName)
    return {
      followers: []
    }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${formatAddressOrName(
      addressOrName
    )}/followers?include=ens`,
    {
      cache: 'default'
    }
  )
  const data = (await response.json()) as {
    followers: FollowerResponse[]
  }

  return data
}

export async function fetchUserFollowing(
  addressOrName?: AddressOrName
): Promise<{ following: FollowingResponse[] }> {
  if (!addressOrName)
    return {
      following: []
    }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${formatAddressOrName(
      addressOrName
    )}/following?include=ens`,
    {
      cache: 'default'
      // cache: "no-cache",
    }
  )

  const data = (await response.json()) as {
    following: Omit<FollowingResponse, 'address'>[]
  }

  // add address field
  const modifiedData = data.following.map(following => ({
    ...following,
    address: following.data
  }))

  return { following: modifiedData }
}

export async function fetchUserStats(
  addressOrName?: AddressOrName
): Promise<{ stats: StatsResponse }> {
  if (!addressOrName)
    return {
      stats: { followers_count: 0, following_count: 0 }
    }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${formatAddressOrName(
      addressOrName
    )}/profile?include=stats`,
    {
      cache: 'default'
    }
  )

  const data = (await response.json()) as { stats: StatsResponse }
  return data
}
