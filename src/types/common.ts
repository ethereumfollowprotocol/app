import type { Address } from 'viem'
import type { leaderboardFilters } from '#/lib/constants'

export type ProfileTabType = 'following' | 'followers'
export type BlockedMutedTabType = 'Blocked/Muted' | 'Blocked/Muted By'
export type ProfileTableTitleType = 'following' | 'followers' | 'Blocked/Muted By' | 'Blocked/Muted'

export type AccountResponseType = {
  address: Address
  ens: {
    name: string | null
    avatar: string | null
  }
  primary_list: string | null
}

export type DiscoverItemType = {
  address: Address
  name: string | null
  avatar: string | null
  followers: number
  following: number
}

export type RecommendedItemType = {
  address: Address
  name: string | null
  avatar: string | null
}

export type DiscoverResponseType = {
  latestFollows: DiscoverItemType[]
  recommended: RecommendedItemType[]
}

export type FollowState = 'follows' | 'blocks' | 'mutes' | 'none'

export type UserFollowerType = {
  efp_list_nft_token_id: number | null
  address: Address
  tags: []
  follow: boolean
  block: boolean
  mute: boolean
  ens: {
    name: string | null
    address: Address
    avatar: string
    updated_at: string
  }
}

export type LeaderboardFilter = (typeof leaderboardFilters)[number]

export type ImportPlatformType = 'farcaster'
