import { formatAddressOrName } from '#/lib/utilities'
import type { FollowingResponse, InfiniteProfileQueryProps } from './requests'

const fetchProfileFollowing = async ({
  addressOrName,
  limit,
  pageParam
}: InfiniteProfileQueryProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${formatAddressOrName(
        addressOrName
      )}/following?include=ens&offset=${pageParam * limit}&limit=${limit}`,
      {
        cache: 'default'
        // cache: "no-cache",
      }
    )

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
