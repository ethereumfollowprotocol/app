import { configureChains, createConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { lightTheme, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { mainnet, optimism, sepolia, optimismSepolia, foundry } from 'wagmi/chains'

const WALLET_CONNECT_PROJECT_ID = '8432b61498678159cf0d8e0c90a75da4'

export const { chains, publicClient } = configureChains(
  [mainnet, optimism, sepolia, optimismSepolia, foundry],
  [
    jsonRpcProvider({
      rpc: chain => {
        if (chain.id === 31337) return { http: 'http://127.0.0.1:8545' }
        const chainIdentifier = chain.id === 1 ? 'eth' : 'optimism'
        return {
          http: `https://rpc.ankr.com/${chainIdentifier}/${process.env.NEXT_PUBLIC_ANKR_ID}`
        }
      }
    }),
    jsonRpcProvider({
      rpc: () => ({ http: 'https://ethereum.ethfollow.xyz/v1/mainnet' })
    }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ID }),
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }),
    jsonRpcProvider({
      rpc: chain => {
        const chainIdentifier = chain.id === 1 ? 'eth' : 'optimism'
        return {
          http: `https://${chainIdentifier}.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`,
          webSocket: `wss://${chainIdentifier}.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`
        }
      }
    }),
    publicProvider()
  ],
  {
    rank: true,
    batch: { multicall: true },
    pollingInterval: 5_000
  }
)

const { connectors } = getDefaultWallets({
  appName: 'Ethereum Follow Protocol',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains
})

export const wagmiConfig = createConfig({
  connectors,
  publicClient,
  autoConnect: true
})

export const rainbowTheme = {
  blurs: lightTheme().blurs,
  fonts: lightTheme().fonts,
  radii: lightTheme().radii,
  colors: {
    ...lightTheme().colors,
    accentColor: '#f9f9f9',
    accentColorForeground: '#000',
    connectButtonBackground: '#f9f9f9',
    connectButtonText: '#000'
  },
  shadows: lightTheme().shadows
}
