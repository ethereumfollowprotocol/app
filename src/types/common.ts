import type { Address } from 'viem'

export type ProfileTabType = 'following' | 'followers'

export type DiscoverItemType = {
  name: string | null
  address: Address
  avatar: string | null
  updated_at: string
}

export type DiscoverResponseType = {
  discover: DiscoverItemType[]
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
