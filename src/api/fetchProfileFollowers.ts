import type { FollowerResponse, InfiniteProfileQueryProps } from './requests'

const fetchProfileFollowers = async ({
  addressOrName,
  list,
  limit,
  pageParam
}: InfiniteProfileQueryProps) => {
  try {
    const url =
      typeof list === 'number'
        ? `${process.env.NEXT_PUBLIC_EFP_API_URL}/lists/${list}/followers?offset=${
            pageParam * limit
          }&limit=${limit}`
        : `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/followers?offset=${
            pageParam * limit
          }&limit=${limit}`

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

export default fetchProfileFollowers
