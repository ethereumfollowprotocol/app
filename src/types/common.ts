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
