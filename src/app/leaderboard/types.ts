import type { Address } from 'viem'
import type { ENSProfile } from '#/types/requests'

export interface LeaderboardEntry {
  rank: number
  address: Address
  ens?: ENSProfile
  followers_count: number
  following_count: number
  mutuals_count: number
  blocked_count: number
  muted_count: number
}

export const leaderboardFilters = ['following', 'followers', 'mutuals', 'blocked+muted'] as const

export type LeaderboardFilter = (typeof leaderboardFilters)[number]
