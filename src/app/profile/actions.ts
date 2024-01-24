'use server'

import type { Hex } from '#/lib/types.ts'

export interface Follower {
  address: Hex
  tags: Array<string>
}

export interface Following {
  version: 1
  data: Hex
  tags: Array<string>
  record_type: 'address' & String
}

export async function fetchFollowersAndFollowing({
  addressOrName
}: { addressOrName: string }): Promise<{
  followers: Array<Follower>
  following: Array<Following>
}> {
  const [{ followers }, { following }] = await Promise.all([
    fetchFollowers({ addressOrName }),
    fetchFollowing({ addressOrName })
  ])
  return { followers, following }
}

export async function fetchFollowers({
  addressOrName
}: {
  addressOrName: string
}): Promise<{ followers: Array<Follower> }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/followers`,
    {
      /**
       * TODO: _PRODUCTION_CHECKLIST_:
       * This is set to `force-cache` on purpose while in development
       * Unset this or set to `default` before launch
       */
      cache: 'force-cache'
    }
  )
  const data = (await response.json()) as { followers: Array<Follower> }
  return data
}

export async function fetchFollowing({
  addressOrName
}: {
  addressOrName: string
}): Promise<{ following: Array<Following> }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/following`,
    {
      /**
       * TODO: _PRODUCTION_CHECKLIST_:
       * This is set to `force-cache` on purpose while in development
       * Unset this or set to `default` before launch
       */
      cache: 'force-cache'
    }
  )

  const data = (await response.json()) as { following: Array<Following> }
  return data
}
