import type { LeaderboardEntry, LeaderboardFilter } from '#/app/leaderboard/types'
import type { Address, GetEnsAvatarReturnType } from 'viem'

declare global {
  interface Window {
    // access via `window._APP_VERSION_`. The value is commit hash
    readonly _APP_VERSION_: string
  }
}

export interface ENSProfile {
  name?: string
  avatar?: string | GetEnsAvatarReturnType
  display?: string
  records?: {
    avatar: string
    [key: string]: string
  }
  chains?: { [key: string]: string }
  fresh?: number
  resolver?: string
  errors?: { [key: string]: string }
}

export interface ENSMetadataProfile {
  uri: string
  is_owner: boolean
  full_image: string
  full_svg: string
  svg: string
  host_meta: {
    chain_id: string | number
    namespace: string
    contract_address: string
    token_id: string | number
    reference_url: string
  }
  name: string
  description: string
  attribute: string
  image: string
  image_url: string
  image_data: string
  background_color: string
  youtube_url: string
}

export type FollowSortType = 'latest first' | 'earliest first' | 'follower count'

export interface InfiniteProfileQueryProps {
  addressOrName: string
  list?: number | string
  limit: number
  tags?: string[]
  sort?: FollowSortType
  pageParam: number
  allResults?: boolean
}

export interface InfiniteLeaderboardQueryProps {
  limit: number
  filter?: LeaderboardFilter
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

export interface FollowStatusResponse {
  token_id: string
  address: Address
  state: {
    follow: boolean
    block: boolean
    mute: boolean
  }
}

export interface LeaderboardResponse {
  address: Address
  rank: number
  followers_count: string
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
  primary_list?: string | null
  stats?: StatsResponse | undefined
  followers?: FollowerResponse[]
  following?: FollowingResponse[]
  chains?: Record<string, string>
  errors?: Record<string, unknown>
}

export interface ProfileDetailsResponse {
  address: Address
  ens: ENSProfile
  primary_list?: string | null
  stats?: StatsResponse | undefined
}

export interface FollowingTagsResponse {
  token_id: string | number
  tags: string[]
  taggedAddresses: {
    address: Address
    tag: string
  }[]
}

export interface ProfileListsResponse {
  primary_list?: string | null
  lists?: number[]
}

export type ProfileRoles = {
  isOwner: boolean
  isManager: boolean
  isUser: boolean
}
