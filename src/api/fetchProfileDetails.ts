import { isAddress, type Address } from 'viem'
import { formatAddressOrName } from '#/lib/utilities'
import type { ProfileDetailsResponse } from './requests'
import { resolveENSAddress, resolveENSProfile } from '#/utils/resolveAddress'

const fetchProfileDetails = async (addressOrName: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${formatAddressOrName(addressOrName)}/details`,
      {
        cache: 'default'
        // cache: "no-cache",
      }
    )

    const data = (await response.json()) as ProfileDetailsResponse
    return data
  } catch (err: unknown) {
    const address = isAddress(addressOrName)
      ? addressOrName
      : await resolveENSAddress(`${addressOrName.replace('.eth', '')}.eth`)
    const data = await resolveENSProfile(address)

    if (data?.name && data?.avatar)
      return {
        address: address as Address,
        ens: data
      } as ProfileDetailsResponse

    return {
      address: address as Address,
      ens: { address: address as Address }
    } as ProfileDetailsResponse
  }
}

export default fetchProfileDetails
