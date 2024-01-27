'use server'

import type { ENSProfile, Hex } from '#/lib/types.ts'

export interface Follower {
  address: Hex
  ens: ENSProfile
  tags: Array<string>
  is_muted: boolean
  is_blocked: boolean
  is_following: boolean
}

export interface Following {
  data: Hex
  version: 1
  tags: Array<string>
  record_type: 'address' & string
  ens: ENSProfile
}

export interface Stats {
  followers_count: number
  following_count: number
}

export interface Profile {
  address: Hex
  ens: ENSProfile
  fresh: number
  resolver: string
  primary_list: string
  followers: Array<Follower>
  following: Array<Following>
  chains: Record<string, string>
  errors: Record<string, unknown>
}

export async function fetchFullProfile({ addressOrName }: { addressOrName: string }) {
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
  const data = (await response.json()) as Profile
  // console.log('fetchFullProfile', data)
  return data
}

export async function fetchFollowers({
  addressOrName
}: {
  addressOrName: string
}): Promise<{ followers: Array<Follower> }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/profile?include=followers`,
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
  const data = (await response.json()) as { followers: Array<Follower> }
  // console.log('fetchFollowers', data)
  return data
}

export async function fetchFollowing({
  addressOrName
}: {
  addressOrName: string
}): Promise<{ following: Array<Following> }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/profile?include=following`,
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

  const data = (await response.json()) as { following: Array<Following> }
  // console.log('fetchFollowing', data)
  return data
}

export async function fetchStats({
  addressOrName
}: {
  addressOrName: string
}): Promise<{ stats: Stats }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/profile?include=following&include=followers`,
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

  const data = (await response.json()) as { stats: Stats }
  // console.log('fetchFollowing', data)
  return data
}
