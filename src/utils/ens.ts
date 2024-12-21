import { normalize } from 'viem/ens'
import { mainnet } from 'viem/chains'
import { createPublicClient, http, type Address } from 'viem'

import { rpcProviders } from '#/lib/constants/rpc-providers'

export const resolveEnsProfile = async (address: `0x${string}`) => {
  const resolvedName = await resolveEnsName(address)
  const ensAddress = resolvedName ? await resolveEnsAddress(resolvedName) : null

  const name = address.toLowerCase() === ensAddress?.toLowerCase() ? resolvedName : null

  if (name && !isValidEnsName(name))
    return {
      name: null,
      avatar: null
    }

  const avatar = name ? `https://metadata.ens.domains/mainnet/avatar/${name}` : null

  return {
    name,
    avatar
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

export const isValidEnsName = (name: string) => {
  try {
    return !!normalize(name)
  } catch {
    return false
  }
}
