import { wagmiConfig } from '#/lib/wagmi'
import { getPublicClient } from '@wagmi/core'
import { isHex } from 'viem'

const chainIds = [1, 10, 31337, 11155111, 11155420] as const
type ChainId = (typeof chainIds)[number]

const [, , chainId, hash] = process.argv

main()
  .then(_ => {
    console.log(_)
    process.exit(0)
  })
  .catch(_ => {
    console.error(_)
    process.exit(1)
  })

async function main() {
  if (!isHex(hash)) throw new Error('Invalid hash')
  if (!(chainId && chainIds.includes(Number(chainId)))) throw new Error('Invalid chainId')

  const client = getPublicClient(wagmiConfig, { chainId: Number(chainId) as ChainId })

  return await client.getTransactionReceipt({ hash })
}
