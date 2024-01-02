import type { Address, EnsProfile } from '#lib/types.ts'

export interface LeaderboardEntry {
  rank: number
  address: Address
  ens?: EnsProfile
  followers_count: number
  following_count: number
  mutuals_count: number
  blocked_count: number
  muted_count: number
}

export const leaderboardFilters = ['following', 'followers', 'mutuals', 'blocked+muted'] as const

export type LeaderboardFilter = (typeof leaderboardFilters)[number]
