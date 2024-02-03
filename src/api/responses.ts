import type { ENSProfile } from '#/lib/types'
import type { Address, Hex } from 'viem'

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
