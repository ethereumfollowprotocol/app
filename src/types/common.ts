import type { leaderboardFilters } from '#/lib/constants'
import type { Address } from 'viem'

export type ProfileTabType = 'following' | 'followers'
export type BlockedMutedTabType = 'Blocked/Muted' | 'Blocked/Muted By'
export type ProfileTableTitleType = 'following' | 'followers' | 'Blocked/Muted By' | 'Blocked/Muted'

export type DiscoverItemType = {
  address: Address
  followersCount: number
  followingCount: number
}

export type DiscoverResponseType = {
  discover: DiscoverItemType[]
  recommended: Address[]
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

export type ImportPlatformType = 'farcaster' | 'lens'
