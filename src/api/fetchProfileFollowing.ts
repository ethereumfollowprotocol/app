import { formatAddressOrName } from '#/lib/utilities'
import type { FollowingResponse, InfiniteProfileQueryProps } from './requests'

const fetchProfileFollowing = async ({
  addressOrName,
  list,
  limit,
  pageParam
}: InfiniteProfileQueryProps) => {
  try {
    const url = list
      ? `${process.env.NEXT_PUBLIC_EFP_API_URL}/lists/${list}/following?include=ens&offset=${
          pageParam * limit
        }&limit=${limit}`
      : `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${formatAddressOrName(
          addressOrName
        )}/following?include=ens&offset=${pageParam * limit}&limit=${limit}`

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
