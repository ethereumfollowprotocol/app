import { evmClient } from '#/lib/viem'
import type { Address } from 'viem'
import { normalize } from 'viem/ens'

export const resolveENSProfile = async (address: `0x${string}`) => {
  const publicClient = evmClient.mainnet()
  const lookup = await publicClient.getEnsName({ address })

  if (!lookup)
    return {
      name: null,
      avatar: null
    }

  const ensText = await publicClient.getEnsAvatar({
    name: normalize(lookup)
  })

  return { name: lookup, avatar: ensText }
}

export const resolveENSAddress = async (name: string) => {
  const publicClient = evmClient.mainnet()
  const ensAddress = await publicClient.getEnsAddress({
    name: normalize(name)
  })

  return ensAddress as Address
}
