import type { Address, GetEnsAddressReturnType } from 'viem'
import type { LeaderboardFilter } from './common'
import type { StaticImageData } from 'next/image'

declare global {
  interface Window {
    // access via `window._APP_VERSION_`. The value is commit hash
    readonly _APP_VERSION_: string
  }
}

export interface ENSProfile {
  name?: string
  avatar?: string
  display?: string
  header?: string
  contenthash?: string
  records?: Record<string, string>
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
  fresh?: boolean
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

export interface LatestFollowersResponse {
  address: Address
  efp_list_nft_token_id: string
  updated_at: string
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
  header: string | null
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
  user_count: string
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

export type ProfileRanks = {
  mutuals_rank: number
  followers_rank: number
  following_rank: number
  blocks_rank: number
  top8_rank: number
}

export interface ProfileDetailsResponse {
  address: Address
  ens: ENSProfile
  primary_list?: string | null
  ranks: ProfileRanks
}

export interface ProfileDetailsResponseWithStats extends ProfileDetailsResponse {
  stats: StatsResponse
}

export interface ProfileBadgesResponse {
  eventId: string
  participated: boolean
  collection: ProfileBadgeColletionType | null
}

export interface ProfileBadgeColletionType {
  event: {
    id: number
    fancy_id: string
    name: string
    event_url: string
    image_url: string
    country: string
    city: string
    description: string
    year: number
    start_date: string
    end_date: string
    expiry_date: string
  }
  tokenId: string
  owner: string
}

export interface ProfileDetailsWithStats extends ProfileDetailsResponse {
  stats: StatsResponse
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
  listRecordsContract: Address
  listSlot: bigint
}

export type AccountResponseType = {
  address: Address
  ens: ENSProfile
  primary_list: string | null
}

export type DiscoverItemType = {
  address: Address
  name: string | null
  avatar: string | null
  header: string | null
  followers: number
  following: number
}

export type DiscoverResponseType = {
  latestFollows: DiscoverItemType[]
  recommended: DiscoverItemType[]
}

export type RecommendedProfilesResponseType = {
  recommended: ProfileDetailsResponseWithStats[]
}

export type QRCodeResponse = StaticImageData

// Airstack
export type AirstackProfileResponse = {
  data: {
    Socials: {
      Social: {
        profileImage: string
        profileHandle: string
        profileName: string
        userAddress: string
      }[]
    }
  }
}

export type AirstackFollowings = {
  followingAddress: { addresses: Address[]; primaryDomain: { name: string } }
}

export type AirstackFollowingsResponse = {
  data: {
    SocialFollowings: {
      Following: AirstackFollowings[]
      pageInfo: { nextCursor: string; hasPrevPage: boolean; hasNextPage: boolean }
    }
  }
}

export type NotificationItemType = {
  address: Address
  name: string | null
  avatar: string | null
  token_id: number
  action: string
  opcode: number
  op: Address
  tag: string
  updated_at: string
}

export type NotificationsResponse = {
  summary: {
    interval: string
    opcode: string
    total: number
    total_follows: number
    total_unfollows: number
    total_tags: number
    total_untags: number
  }
  notifications: NotificationItemType[]
}

export type SearchENSNameDomain = {
  name: string
  resolvedAddress: { id: Address | (() => Promise<'' | GetEnsAddressReturnType>) } | null
}

export type SearchENSNameResults = {
  domains: SearchENSNameDomain[]
}
