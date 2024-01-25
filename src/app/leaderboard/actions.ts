'use server'

import { raise } from 'src/lib/utilities'
import type { NoRepetition } from '#/lib/types.ts'
import type { LeaderboardFilter, LeaderboardEntry } from './types.ts'

export async function fetchLeaderboard({
  filter,
  limit = 100,
  include = []
}: {
  filter: LeaderboardFilter
  include?: NoRepetition<'ens' | 'mutuals' | 'blocked' | 'muted'>
  limit?: number
}): Promise<Array<LeaderboardEntry>> {
  try {
    if (filter !== 'followers') return []
    const params = include.map(key => `include=${key}`).join('&')
    const response = await fetch(
      `${process.env.EFP_API_URL}/leaderboard/${filter}?limit=${limit}&${params}`
    )
    const data = await response.json()

    return data as Array<LeaderboardEntry>
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : error
    console.error(errorMessage)
    raise(errorMessage)
  }
}
