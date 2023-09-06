import { mainnet } from 'viem/chains'
import { mainnetTransports } from '#/lib/constants.ts'
import { createPublicClient, http, fallback } from 'viem'

export const mainnetClient = () =>
  createPublicClient({
    chain: mainnet,
    transport: fallback(
      mainnetTransports.map(transport =>
        http(transport.url, {
          batch: true,
          name: transport.name,
        }),
      ),
    ),
  })
