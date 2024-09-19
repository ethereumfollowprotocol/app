import type { Address, GetEnsAvatarReturnType } from 'viem'
import type { LeaderboardFilter } from './common'

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
  header?: string
  contenthash?: string
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
  search?: string
}

export type LeaderboardDirection = 'asc' | 'desc'

export interface InfiniteLeaderboardQueryProps {
  limit: number
  pageParam: number
  search?: string | null
  filter?: LeaderboardFilter
  direction?: LeaderboardDirection
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
  address: Address
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

export type LeaderboardItem = {
  address: Address
  name: string | null
  avatar: string | null
  mutuals_rank: string
  followers_rank: string
  following_rank: string
  top8_rank: string
  blocks_rank: string
  top8?: string
  following?: string
  followers: string
  blocks?: string
  mutuals?: string
}

export interface LeaderboardResponse {
  last_updated: string
  results: LeaderboardItem[]
}

export interface LeaderboardStatsResponse {
  address_count: string
  list_count: string
  list_op_count: string
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
  ranks: {
    mutuals_rank: number
    followers_rank: number
    following_rank: number
    blocks_rank: number
  }
  stats?: StatsResponse | undefined
}

export type TagCountType = {
  tag: string
  count: number
}

export interface FollowingTagsResponse {
  token_id: string | number
  tags: string[]
  tagCounts: TagCountType[]
  taggedAddresses: {
    address: Address
    tag: string
  }[]
}

export type CommonFollower = {
  address: Address
  name: string | null
  avatar: string | null
  mutuals_rank: string
}

export interface CommonFollowersResponse {
  results: CommonFollower[]
  length: number
}

export interface ProfileListsResponse {
  primary_list?: string | null
  lists?: string[]
}

export type ProfileRoles = {
  isOwner: boolean
  isManager: boolean
  isUser: boolean
  listChainId: number
}
