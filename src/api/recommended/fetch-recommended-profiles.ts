import type { Address } from 'viem'
import type { RecommendedProfilesResponseType } from '#/types/requests'

export const fetchRecommendedProfiles = async (
  addressOrName?: string | Address,
  list?: number,
  limit = 10,
  pageParam = 1
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EFP_API_URL}/${`${list ? 'lists' : 'users'}/${
        list ?? addressOrName
      }/recommended/details?limit=${limit}&offset=${pageParam * limit}`}`,
      {
        cache: 'default',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )

    const data = (await res.json()) as RecommendedProfilesResponseType
    const recommended = data.recommended

    return {
      recommended: recommended || [],
      nextPageParam: pageParam + 1
    }
  } catch (err: unknown) {
    return {
      recommended: [],
      nextPageParam: pageParam + 1
    }
  }
}
