import type { ProfileBadgesResponse } from '#/types/requests'

export const fetchProfileBadges = async (
  addressOrName: string,
  list?: number | null,
  fresh?: boolean
) => {
  try {
    const url =
      list !== undefined
        ? `${process.env.NEXT_PUBLIC_EFP_API_URL}/lists/${list}/badges${
            fresh ? '?cache=fresh' : ''
          }`
        : `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/badges${
            fresh ? '?cache=fresh' : ''
          }`
    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const data = (await response.json()).poaps as ProfileBadgesResponse[]
    return data
  } catch (err: unknown) {
    return []
  }
}
