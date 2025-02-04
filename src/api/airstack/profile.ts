import type { AirstackProfileResponse } from '#/types/requests'

export const fetchAirstackProfile = async (platform: string, handle: string) => {
  // Limit is set to 1 since we allow only full name search that returns only one profile
  const profileQuery = `
    query ProfileQuery ($platform: SocialDappName) {
      Socials(
        input: {filter: {dappName: {_eq: $platform}, profileName: {_eq: "${handle.replace('@', '')}"}}, blockchain: ethereum, limit: 1}
      ) {
        Social {
          profileImage
          profileHandle
          profileName
          userAddress
        }
      }
    }
  `

  const response = await fetch(`https://api.airstack.xyz/gql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.NEXT_PUBLIC_AIRSTACK_API_KEY,
    } as HeadersInit,
    body: JSON.stringify({
      query: profileQuery,
      variables: { platform },
      operationName: 'ProfileQuery',
    }),
  })

  const json = (await response.json()) as AirstackProfileResponse

  // return the first social profile since there is only one
  return json.data.Socials.Social[0]
}
