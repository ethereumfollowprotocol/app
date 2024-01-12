import { getPublicClient } from '@wagmi/core'
import { wagmiConfig } from '#/lib/wallet/config'
import { isHex } from 'viem'

const chainIds = [1, 10, 31337, 11155111, 11155420] as const
type ChainId = (typeof chainIds)[number]

export async function GET(request: Request) {
  const url = new URL(request.url)
  const chainId = Number(url.searchParams.get('chainId')) as ChainId

  if (!(chainId && chainIds.includes(Number(chainId)))) {
    return new Response('Invalid chainId', { status: 400 })
  }

  const hash = url.searchParams.get('hash')
  if (!isHex(hash)) return new Response('Invalid hash', { status: 400 })

  const client = getPublicClient(wagmiConfig, { chainId })

  const transactionReceipt = await client.getTransactionReceipt({ hash })

  return new Response(JSON.stringify(hash, undefined, 2), { status: 200 })
}
