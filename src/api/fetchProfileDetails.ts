import { isAddress, type Address } from 'viem'
import type { ProfileDetailsResponse } from '#/types/requests'
import { resolveEnsAddress, resolveEnsProfile } from '#/utils/ens'

export const fetchProfileDetails = async (addressOrName: string, list?: number | string) => {
  try {
    const url =
      list !== undefined
        ? `${process.env.NEXT_PUBLIC_EFP_API_URL}/lists/${list}/details`
        : `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/details`
    const response = await fetch(url, {
      cache: 'default'
      // cache: "no-cache",
    })

    const data = (await response.json()) as ProfileDetailsResponse
    return data
  } catch (err: unknown) {
    if (typeof list === 'number') return null

    const address = isAddress(addressOrName)
      ? addressOrName
      : await resolveEnsAddress(`${addressOrName.replace('.eth', '')}.eth`)
    const data = await resolveEnsProfile(address)

    if (data?.name && data?.avatar)
      return {
        address: address as Address,
        ens: data
      } as ProfileDetailsResponse

    return {
      address: address as Address,
      ens: { address: address as Address },
      ranks: {
        mutuals_rank: 0,
        followers_rank: 0,
        following_rank: 0,
        blocks_rank: 0
      }
    } as ProfileDetailsResponse
  }
}
