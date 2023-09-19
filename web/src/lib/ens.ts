import { getAddress } from 'viem'
import { normalize } from 'viem/ens'
import { mainnetClient } from '#/lib/viem.ts'

export async function getAddressFromENS(name: string) {
  if (!name.includes('.eth')) return

  const client = mainnetClient()

  return client.getEnsAddress({ name: normalize(name) })
}

export async function getENSProfile({ ensNameOrAddress }: { ensNameOrAddress?: string }) {
  if (!ensNameOrAddress) return

  const providedId =
    ensNameOrAddress.indexOf('0x') === 0
      ? 'address'
      : ensNameOrAddress.includes('.eth')
      ? 'name'
      : undefined

  if (!providedId) return

  const client = mainnetClient()

  const { address, name } =
    providedId === 'address'
      ? {
          address: getAddress(ensNameOrAddress),
          name: await client.getEnsName({ address: getAddress(ensNameOrAddress) }),
        }
      : {
          name: normalize(ensNameOrAddress),
          address: await client.getEnsAddress({ name: normalize(ensNameOrAddress) }),
        }

  if (!name) return { address }

  const [resolverAddress, avatar] = await Promise.all([
    client.getEnsResolver({ name }),
    client.getEnsAvatar({ name }),
  ])

  return { address, name, avatar, resolverAddress }
}
