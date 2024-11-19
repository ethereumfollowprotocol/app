import type { Address } from 'viem'
import type { FollowStatusResponse } from '#/types/requests'

export const fetchFollowState = async ({
  address,
  userAddress,
  list,
  type,
  fresh
}: {
  address: Address
  userAddress?: Address
  list?: string | number
  type: 'following' | 'follower'
  fresh?: boolean
}) => {
  try {
    if ((!list && type === 'following') || !(userAddress || list))
      return {
        token_id: undefined,
        address,
        state: {
          follow: false,
          block: false,
          mute: false
        }
      }

    const url = `${process.env.NEXT_PUBLIC_EFP_API_URL}/${list === undefined ? 'users' : 'lists'}/${
      list ?? userAddress
    }/${address}/${type === 'following' ? 'buttonState' : 'followerState'}${
      fresh ? '?cache=fresh' : ''
    }`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
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
