import { formatQueryParams } from '#/utils/formatQueryParams'
import type { InfiniteLeaderboardQueryProps, LeaderboardResponse } from '#/types/requests'

export const fetchleaderboard = async ({
  limit,
  search,
  filter,
  pageParam,
  direction
}: InfiniteLeaderboardQueryProps) => {
  try {
    const queryParams = formatQueryParams({
      limit,
      offset: pageParam * limit,
      sort: filter,
      direction
    })

    const url =
      search && search.length > 0
        ? `${process.env.NEXT_PUBLIC_EFP_API_URL}/leaderboard/search?term=${search}`
        : `${process.env.NEXT_PUBLIC_EFP_API_URL}/leaderboard/ranked?${queryParams}`
    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        cors: 'no-cors'
      }
      // cache: "no-cache",
    })

    const data = (await response.json()) as LeaderboardResponse[]
    return {
      results: data ?? [],
      nextPageParam: pageParam + 1,
      prevPageParam: pageParam > 0 ? pageParam - 1 : 0
    }
  } catch (err: unknown) {
    return {
      results: [],
      nextPageParam: pageParam + 1,
      prevPageParam: pageParam > 0 ? pageParam - 1 : 0
    }
  }
}
