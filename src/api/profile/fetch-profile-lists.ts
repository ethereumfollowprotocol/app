import type { ProfileListsResponse } from '#/types/requests'

export const fetchProfileLists = async (addressOrName: string, fresh?: boolean) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/lists${
        fresh ? '?cache=fresh' : ''
      }`,
      {
        cache: 'default',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )

    const data = (await response.json()) as ProfileListsResponse
    return data
  } catch (err: unknown) {
    return {
      primary_list: null,
      lists: []
    } as ProfileListsResponse
  }
}
