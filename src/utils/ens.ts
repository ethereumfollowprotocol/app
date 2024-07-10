import { normalize } from 'viem/ens'
import { mainnet } from 'viem/chains'
import { createPublicClient, http, type Address } from 'viem'

import { rpcProviders } from '#/lib/constants/providers'

export const resolveEnsProfile = async (address: `0x${string}`) => {
  const resolvedName = await resolveEnsName(address)
  // const ensAddress = resolvedName ? await resolveEnsAddress(resolvedName) : null

  const avatarUrl = `https://metadata.ens.domains/mainnet/avatar/${resolvedName}`

  try {
    const response = await fetch(avatarUrl)

    return {
      name: resolvedName,
      // name: address.toLowerCase() === ensAddress?.toLowerCase() ? resolvedName : null,
      avatar: response.ok ? avatarUrl : null
    }
  } catch (e: any) {
    return {
      name: resolvedName ?? null,
      avatar: null
    }
  }
}

export const resolveEnsName = async (address: `0x${string}`) => {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(rpcProviders[1])
  })
  const lookup = await publicClient.getEnsName({ address })

  return lookup ?? undefined
}

export const resolveEnsAddress = async (name: string) => {
  try {
    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http(rpcProviders[1])
    })
    const ensAddress = await publicClient.getEnsAddress({
      name: normalize(name)
    })

    return ensAddress as Address
  } catch {
    return '' as Address
  }
}
