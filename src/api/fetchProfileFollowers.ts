import { formatQueryParams } from '#/utils/formatQueryParams'
import type { FollowerResponse, InfiniteProfileQueryProps } from '#/types/requests'

export const fetchProfileFollowers = async ({
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
      sort,
      tags
    })

    const url =
      list !== undefined
        ? `${process.env.NEXT_PUBLIC_EFP_API_URL}/lists/${list}/${
            allResults ? 'allFollowers' : 'followers'
          }?${queryParams}`
        : `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/${
            allResults ? 'allFollowers' : 'followers'
          }?${queryParams}`

    const response = await fetch(url, {
      cache: 'default'
      // cache: "no-cache",
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
