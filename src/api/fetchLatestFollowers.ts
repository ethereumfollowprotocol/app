import { formatQueryParams } from '#/utils/formatQueryParams'
import type { InfiniteProfileQueryProps, LatestFollowersResponse } from '#/types/requests'
import type { FollowListProfile } from '#/components/follow-list'

export const fetchLatestFollowers = async ({
  addressOrName,
  list,
  limit,
  pageParam
}: InfiniteProfileQueryProps) => {
  const queryParams = formatQueryParams({
    limit,
    offset: pageParam * limit
  })

  try {
    const url = `${process.env.NEXT_PUBLIC_EFP_API_URL}/${list ? 'lists' : 'users'}/${
      list ?? addressOrName
    }/latestFollowers?${queryParams}`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const data = (await response.json()).followers as LatestFollowersResponse[]
    const transformedData = data.map(follower => ({
      ...follower,
      tags: []
    })) as FollowListProfile[]

    return {
      followers: transformedData ?? [],
      nextPageParam: pageParam + 1
    }
  } catch (err: unknown) {
    return {
      followers: [],
      nextPageParam: pageParam + 1
    }
  }
}
