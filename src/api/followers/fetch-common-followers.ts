import type { Address } from 'viem'
import type { CommonFollowersResponse } from '#/types/requests'

export const noCommonFollowers = {
  results: [],
  length: 0
} satisfies CommonFollowersResponse

export const fetchCommonFollowers = async (user: Address, addressOrName: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${user}/commonFollowers?leader=${addressOrName}`,
      {
        cache: 'default',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )

    const data = (await response.json()) as CommonFollowersResponse
    return data
  } catch (err: unknown) {
    return noCommonFollowers
  }
}
