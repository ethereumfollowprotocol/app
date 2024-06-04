import { formatAddressOrName } from '#/lib/utilities'
import type { FollowerResponse, InfiniteProfileQueryProps } from './requests'

const fetchProfileFollowers = async ({
  addressOrName,
  limit,
  pageParam
}: InfiniteProfileQueryProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${formatAddressOrName(
        addressOrName
      )}/followers?include=ens&offset=${pageParam * limit}&limit=${limit}`,
      {
        cache: 'default'
        // cache: "no-cache",
      }
    )

    const data = (await response.json()).followers as FollowerResponse[]
    return {
      followers: data,
      nextPageParam: pageParam + 1
    }
  } catch (err: unknown) {
    return {
      followers: [],
      nextPageParam: pageParam + 1
    }
  }
}

export default fetchProfileFollowers
