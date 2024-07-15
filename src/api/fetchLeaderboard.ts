import { formatQueryParams } from '#/utils/formatQueryParams'
import type { InfiniteLeaderboardQueryProps, LeaderboardResponse } from '#/types/requests'

export const fetchleaderboard = async ({
  limit,
  filter,
  pageParam
}: InfiniteLeaderboardQueryProps) => {
  try {
    const queryParams = formatQueryParams({
      limit,
      offset: pageParam * limit,
      filter
    })

    const url = `${process.env.NEXT_PUBLIC_EFP_API_URL}/leaderboard/followers?${queryParams}`
    const response = await fetch(url, {
      cache: 'default'
      // cache: "no-cache",
    })

    const data = (await response.json()) as LeaderboardResponse[]
    return {
      results: data ?? [],
      nextPageParam: pageParam + 1
    }
  } catch (err: unknown) {
    return {
      results: [],
      nextPageParam: pageParam + 1
    }
  }
}
