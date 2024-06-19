import { normalize } from 'viem/ens'
import { mainnet } from 'viem/chains'
import { createPublicClient, http, type Address } from 'viem'

export const resolveENSProfile = async (address: `0x${string}`) => {
  const resolvedName = await resolveENSName(address)
  // const ensAddress = resolvedName ? await resolveENSAddress(resolvedName) : null

  const avatarUrl = `https://metadata.ens.domains/mainnet/avatar/${resolvedName}`

  const response = await fetch(avatarUrl)

  return {
    name: resolvedName ?? null,
    // name: address.toLowerCase() === ensAddress?.toLowerCase() ? resolvedName : null,
    avatar: response.ok ? avatarUrl : undefined
  }
}

export const resolveENSName = async (address: `0x${string}`) => {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ID}`
    )
  })
  const lookup = await publicClient.getEnsName({ address })

  return lookup ?? undefined
}

export const resolveENSAddress = async (name: string) => {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ID}`
    )
  })
  const ensAddress = await publicClient.getEnsAddress({
    name: normalize(name)
  })

  return ensAddress as Address
}
