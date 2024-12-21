import { formatQueryParams } from '#/utils/format/format-query-params'
import type { FollowerResponse, InfiniteProfileQueryProps } from '#/types/requests'

export const fetchProfileFollowers = async ({
  addressOrName,
  list,
  limit,
  sort,
  tags,
  search,
  pageParam,
  allResults
}: InfiniteProfileQueryProps) => {
  try {
    const queryParams = formatQueryParams({
      limit,
      offset: pageParam * limit,
      term: search,
      sort: sort
        ? {
            'earliest first': 'earliest',
            'latest first': 'latest',
            'follower count': 'followers'
          }[sort]
        : undefined,
      tags
    })

    const followersEndpoint = allResults
      ? 'allFollowers'
      : search && search?.length >= 3
        ? 'searchFollowers'
        : 'followers'

    const url = `${process.env.NEXT_PUBLIC_EFP_API_URL}/${list === undefined ? 'users' : 'lists'}/${
      list ?? addressOrName
    }/${followersEndpoint}?${queryParams}`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const data = (await response.json()).followers as FollowerResponse[]
    return {
      followers: data ?? [],
      nextPageParam: pageParam + 1
    }
  } catch (err: unknown) {
    return {
      followers: [],
      nextPageParam: pageParam + 1
    }
  }
}
