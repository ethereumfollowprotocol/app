import type { Address } from 'viem'
import type { FollowStatusResponse } from '#/types/requests'

const fetchFollowState = async ({
  address,
  list,
  type
}: { address: Address; list?: string | number; type: 'following' | 'follower' }) => {
  try {
    if (!list)
      return {
        token_id: undefined,
        address,
        state: {
          follow: false,
          block: false,
          mute: false
        }
      }

    const url = `${process.env.NEXT_PUBLIC_EFP_API_URL}/lists/${list}/${address}/${
      type === 'following' ? 'buttonState' : 'followerState'
    }`

    const response = await fetch(url, {
      cache: 'default'
      // cache: "no-cache",
    })

    const data = (await response.json()) as FollowStatusResponse
    return data
  } catch (err: unknown) {
    return {
      token_id: undefined,
      address,
      state: {
        follow: false,
        block: false,
        mute: false
      }
    }
  }
}

export default fetchFollowState
