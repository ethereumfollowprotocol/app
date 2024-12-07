import type { Address } from 'viem'
import type { AirstackFollowingsResponse } from '#/types/requests'

export const fetchAirstackFollowings = async ({
  profileAddress,
  platform,
  pageParam
}: {
  profileAddress: Address
  platform: string
  pageParam?: string
}) => {
  try {
    const followingsQuery = `
    query FollowingsQuery ($platform: SocialDappName, $cursor: String) {
      SocialFollowings(
        input: {filter: {dappName: {_eq: $platform}, identity: {_eq: "${profileAddress}"}}, blockchain: ALL, limit: 200, cursor: $cursor}
      ) {
        Following {
          followingAddress {
            addresses
            primaryDomain {
              name
            }
          }
        }
        pageInfo {
          nextCursor
          hasPrevPage
          hasNextPage
        }
      }
    }
  `

    const response = await fetch(`https://api.airstack.xyz/gql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.NEXT_PUBLIC_AIRSTACK_API_KEY
      } as HeadersInit,
      body: JSON.stringify({
        query: followingsQuery,
        variables: { platform, cursor: pageParam },
        operationName: 'FollowingsQuery'
      })
    })

    const json = (await response.json()) as AirstackFollowingsResponse
    return {
      followings: json.data.SocialFollowings,
      nextPageParam: json.data.SocialFollowings.pageInfo.nextCursor,
      hasNextPage: json.data.SocialFollowings.pageInfo.hasNextPage,
      hasPrevPage: json.data.SocialFollowings.pageInfo.hasPrevPage
    }
  } catch (error) {
    return {
      followings: null,
      nextPageParam: undefined,
      hasNextPage: false
    }
  }
}
