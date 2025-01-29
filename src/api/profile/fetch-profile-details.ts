import type { ProfileDetailsResponse } from "#/types/requests";

export const fetchProfileDetails = async (addressOrName: string, list?: number | string, fresh?: boolean) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_EFP_API_URL}/${list === undefined ? 'users' : 'lists'}/${
      list ?? addressOrName
    }/details${fresh ? '?cache=fresh' : ''}`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const data = (await response.json()) as ProfileDetailsResponse
    return data
  } catch (err: unknown) {
    console.error(err)
    return null
  }
}
