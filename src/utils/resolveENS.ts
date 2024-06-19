import { normalize } from 'viem/ens'
import { mainnet } from 'viem/chains'
import { alchemyMainnetUrl } from '#/lib/constants'
import { createPublicClient, http, type Address } from 'viem'

export const resolveENSProfile = async (address: `0x${string}`) => {
  const resolvedName = await resolveENSName(address)
  // const ensAddress = resolvedName ? await resolveENSAddress(resolvedName) : null

  const avatarUrl = `https://metadata.ens.domains/mainnet/avatar/${resolvedName}`

  try {
    const response = await fetch(avatarUrl)

    return {
      name: resolvedName,
      // name: address.toLowerCase() === ensAddress?.toLowerCase() ? resolvedName : null,
      avatar: response.ok ? avatarUrl : undefined
    }
  } catch (e: any) {
    return {
      name: resolvedName ?? null,
      avatar: undefined
    }
  }
}

export const resolveENSName = async (address: `0x${string}`) => {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(alchemyMainnetUrl)
  })
  const lookup = await publicClient.getEnsName({ address })

  return lookup ?? undefined
}

export const resolveENSAddress = async (name: string) => {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(alchemyMainnetUrl)
  })
  const ensAddress = await publicClient.getEnsAddress({
    name: normalize(name)
  })

  return ensAddress as Address
}
