import { isAddress, type Address } from 'viem'
import type { ProfileResponse } from './requests'
import { resolveENSAddress, resolveENSProfile } from '#/utils/resolveENS'

const fetchUserProfile = async (addressOrName: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/profile`,
      {
        cache: 'default'
        // cache: "no-cache",
      }
    )

    const data = (await response.json()) as ProfileResponse
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
      } as ProfileResponse

    return {
      address: address as Address,
      ens: { address: address as Address }
    } as ProfileResponse
  }
}

export default fetchUserProfile
