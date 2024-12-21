import type { LeaderboardStatsResponse } from '#/types/requests'

export const fetchLeaderboardStats = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_EFP_API_URL}/stats`
    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const data = (await response.json()) as { stats: LeaderboardStatsResponse }
    return data.stats
  } catch (err: unknown) {
    return {
      address_count: '0',
      list_count: '0',
      list_op_count: '0',
      user_count: '0'
    }
  }
}
