import { formatAddressOrName } from '#/lib/utilities'
import type { ProfileListsResponse } from './requests'

const fetchProfileLists = async (addressOrName: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${formatAddressOrName(addressOrName)}/lists`,
      {
        cache: 'default'
        // cache: "no-cache",
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

export default fetchProfileLists
