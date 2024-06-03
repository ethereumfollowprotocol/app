import { createPublicClient, http, type Address } from 'viem'
import { mainnet } from 'viem/chains'
import { normalize } from 'viem/ens'

export const resolveENSProfile = async (address: `0x${string}`) => {
  const publicClient = createPublicClient({ chain: mainnet, transport: http() })
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
  const publicClient = createPublicClient({ chain: mainnet, transport: http() })
  const ensAddress = await publicClient.getEnsAddress({
    name: normalize(name)
  })

  return ensAddress as Address
}
