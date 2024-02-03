#!/usr/bin/env bun
import { efpContracts } from '#/lib/constants/contracts.ts'
import { wagmiConfig } from '#/lib/wagmi'
import { getPublicClient } from '@wagmi/core'
import * as abi from 'src/lib/abi'
import { isAddress } from 'viem'

const chainIds = [1, 10, 31337, 11155111, 11155420] as const
type ChainId = (typeof chainIds)[number]

const [, , chainId, address] = process.argv

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
  if (!(address && isAddress(address))) throw new Error('Invalid address')
  if (!(chainId && chainIds.includes(Number(chainId)))) throw new Error('Invalid chainId')

  const client = getPublicClient(wagmiConfig, { chainId: Number(chainId) as ChainId })

  return await client.readContract({
    abi: abi.efpListRegistryAbi,
    address: efpContracts['EFPListRegistry'],
    functionName: 'tokensOfOwner',
    args: ['0xaA56322AAA4494f084B000b4F8C11cbCF97dF2D3']
  })
}
