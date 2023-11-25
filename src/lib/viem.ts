import { mainnet } from 'viem/chains'
import { mainnetTransports } from '#lib/constants.ts'
import { http, fallback, createWalletClient, publicActions } from 'viem'

export const mainnetClient = () =>
  createWalletClient({
    chain: mainnet,
    transport: fallback(
      mainnetTransports.map(transport =>
        http(transport.url, {
          batch: true,
          name: transport.name
        })
      )
    )
  }).extend(publicActions)
