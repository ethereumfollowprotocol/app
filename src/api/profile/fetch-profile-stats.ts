import type { StatsResponse } from '#/types/requests'

export const fetchProfileStats = async (
  addressOrName: string,
  list?: number | string,
  isLive?: boolean
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_EFP_API_URL}${
      list !== undefined ? `/lists/${list}` : `/users/${addressOrName}`
    }/stats${isLive ? '?live=true&cache=fresh' : '?live=true'}`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const data = (await response.json()) as StatsResponse
    return data
  } catch (err: unknown) {
    return {
      followers_count: 0,
      following_count: 0
    } as StatsResponse
  }
}
