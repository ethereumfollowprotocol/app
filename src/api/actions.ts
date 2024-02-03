'use server'

import type { ENSProfile, Hex } from '#/lib/types.ts'
import type { Address } from 'viem'

export interface FollowerResponse {
  address: Address
  ens: ENSProfile
  tags: Array<string>
  is_muted: boolean
  is_blocked: boolean
  is_following: boolean
}

export interface FollowingResponse {
  version: 1
  record_type: 'address' & string
  data: Address & Hex
  tags: Array<string>
  ens?: ENSProfile
}

export interface StatsResponse {
  followers_count: number
  following_count: number
}

export interface ProfileResponse {
  address: Address
  ens: ENSProfile
  fresh: number
  resolver: string
  primary_list: string
  stats: StatsResponse
  followers: Array<FollowerResponse>
  following: Array<FollowingResponse>
  chains: Record<string, string>
  errors: Record<string, unknown>
}

type AddressOrName = Address | string

///////////////////////////////////////////////////////////////////////////////
// /users/:addressOrENS/profile
///////////////////////////////////////////////////////////////////////////////

export async function fetchUserFollowers({
  addressOrName
}: {
  addressOrName: AddressOrName
}): Promise<{ followers: Array<FollowerResponse> }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/followers?include=ens`,
    {
      /**
       * TODO: _PRODUCTION_CHECKLIST_:
       * This is set to `force-cache` on purpose while in development
       * Unset this or set to `default` before launch
       */
      // cache: 'force-cache'
      cache: 'default'
      // cache: "no-cache",
    }
  )
  const data = (await response.json()) as { followers: Array<FollowerResponse> }
  // console.log('fetchFollowers', data)
  return data
}

export async function fetchUserFollowing({
  addressOrName
}: {
  addressOrName: AddressOrName
}): Promise<{ following: Array<FollowingResponse> }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/following?include=ens`,
    {
      /**
       * TODO: _PRODUCTION_CHECKLIST_:
       * This is set to `force-cache` on purpose while in development
       * Unset this or set to `default` before launch
       */
      // cache: 'force-cache'
      cache: 'default'
      // cache: "no-cache",
    }
  )

  const data = (await response.json()) as { following: Array<FollowingResponse> }
  // console.log('fetchFollowing', data)
  return data
}

export async function fetchUserProfile({
  addressOrName
}: { addressOrName: AddressOrName }): Promise<ProfileResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/profile`,
    {
      /**
       * TODO: _PRODUCTION_CHECKLIST_:
       * This is set to `force-cache` on purpose while in development
       * Unset this or set to `default` before launch
       */
      // cache: 'force-cache'
      cache: 'default'
      // cache: "no-cache",
    }
  )
  const data = (await response.json()) as ProfileResponse
  // console.log('fetchFullProfile', data)
  return data
}

export async function fetchUserStats({
  addressOrName
}: {
  addressOrName: AddressOrName
}): Promise<{ stats: StatsResponse }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/profile?include=stats`,
    {
      /**
       * TODO: _PRODUCTION_CHECKLIST_:
       * This is set to `force-cache` on purpose while in development
       * Unset this or set to `default` before launch
       */
      // cache: 'force-cache'
      cache: 'default'
      // cache: "no-cache",
    }
  )

  const data = (await response.json()) as { stats: StatsResponse }
  // console.log('fetchFollowing', data)
  return data
}
