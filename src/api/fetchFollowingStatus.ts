import type { Address } from 'viem'
import type { FollowingStatusResponse } from '#/types/requests'

const fetchFollowingState = async ({
  address,
  list
}: { address: Address; list?: string | number }) => {
  try {
    if (!list)
      return {
        token_id: undefined,
        address,
        state: {
          is_following: false,
          is_blocked: false,
          is_muted: false
        }
      }
    const url = `${process.env.NEXT_PUBLIC_EFP_API_URL}/lists/${list}/${address}/buttonState`

    const response = await fetch(url, {
      cache: 'default'
      // cache: "no-cache",
    })

    const data = (await response.json()) as FollowingStatusResponse
    return data
  } catch (err: unknown) {
    return {
      token_id: undefined,
      address,
      state: {
        is_following: false,
        is_blocked: false,
        is_muted: false
      }
    }
  }
}

export default fetchFollowingState
