import { formatQueryParams } from '#/utils/format/format-query-params'
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

    const url = `${process.env.NEXT_PUBLIC_EFP_API_URL}/leaderboard/${
      search && search.length > 2 ? 'search' : 'ranked'
    }?${queryParams}&term=${search}`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        cors: 'no-cors'
      }
    })

    const data = (await response.json()) as LeaderboardResponse
    return {
      results: data ?? [],
      nextPageParam: pageParam + 1,
      prevPageParam: pageParam > 0 ? pageParam - 1 : 0
    }
  } catch (err: unknown) {
    return {
      results: {
        last_updated: 0,
        results: []
      },
      nextPageParam: pageParam + 1,
      prevPageParam: pageParam > 0 ? pageParam - 1 : 0
    }
  }
}
