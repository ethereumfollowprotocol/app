import { mainnet, optimism } from 'wagmi/chains'
import { configureChains, createConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit'

const projectId = '8432b61498678159cf0d8e0c90a75da4'

export const { chains, publicClient } = configureChains(
  [mainnet, optimism],
  [
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
    jsonRpcProvider({
      rpc: chain => {
        const chainIdentifier = chain.id === 1 ? 'eth' : 'optimism'
        return {
          http: `https://rpc.ankr.com/${chainIdentifier}/${process.env.NEXT_PUBLIC_ANKR_ID}`
        }
      }
    }),
    jsonRpcProvider({
      rpc: () => ({ http: 'https://ethereum.ethfollow.xyz/v1/mainnet' })
    }),
    publicProvider()
  ],
  {
    rank: true,
    batch: { multicall: true }
  }
)

const { connectors } = getDefaultWallets({
  appName: 'Ethereum Follow Protocol',
  projectId,
  chains
})

export const wagmiConfig = createConfig({
  connectors,
  publicClient,
  autoConnect: true
})

export const rainbowTheme = {
  blurs: darkTheme().blurs,
  fonts: darkTheme().fonts,
  radii: darkTheme().radii,
  colors: {
    ...darkTheme().colors,
    accentColor: '#f9f9f9',
    accentColorForeground: '#000',
    connectButtonBackground: '#f9f9f9',
    connectButtonText: '#000'
  },
  shadows: darkTheme().shadows
}
