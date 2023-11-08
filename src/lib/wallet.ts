import en from '#locales/en.ts'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { mainnet, optimism, arbitrum } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

export const { chains, publicClient } = configureChains(
  [mainnet, optimism, arbitrum],
  [
    jsonRpcProvider({
      rpc: _chain => ({
        http: `https://eth.llamarpc.com/rpc/${process.env['NEXT_PUBLIC_LLAMAFOLIO_ID']}`
      })
    }),
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    infuraProvider({ apiKey: process.env.INFURA_ID }),
    publicProvider()
  ]
)

const { connectors } = getDefaultWallets({
  appName: en.APP_NAME.SHORT,
  projectId,
  chains
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})
