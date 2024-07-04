import { formatQueryParams } from '#/utils/formatQueryParams'
import type { FollowingResponse, InfiniteProfileQueryProps } from '#/types/requests'

const fetchProfileFollowing = async ({
  addressOrName,
  list,
  limit,
  sort,
  tags,
  pageParam,
  allResults
}: InfiniteProfileQueryProps) => {
  try {
    const queryParams = formatQueryParams({
      limit,
      offset: pageParam * limit,
      tags,
      sort
    })

    const url =
      list !== undefined
        ? `${process.env.NEXT_PUBLIC_EFP_API_URL}/lists/${list}/${
            allResults ? 'allFollowing' : 'following'
          }?${queryParams}`
        : `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/${
            allResults ? 'allFollowing' : 'following'
          }?${queryParams}`

    const response = await fetch(url, {
      cache: 'default'
      // cache: "no-cache",
    })

    const data = (await response.json()).following as FollowingResponse[]
    return {
      following: data ?? [],
      nextPageParam: pageParam + 1
    }
  } catch (err: unknown) {
    return {
      following: [],
      nextPageParam: pageParam + 1
    }
  }
}

export default fetchProfileFollowing
