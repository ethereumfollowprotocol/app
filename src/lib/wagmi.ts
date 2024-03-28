'use client'

import { APP_DESCRIPTION, APP_NAME, APP_URL } from '#/lib/constants'
import { mainnet, sepolia, foundry, optimism, optimismSepolia } from 'wagmi/chains'
import { http, fallback, webSocket } from 'wagmi'
import { getDefaultConfig, getDefaultWallets, type Chain } from '@rainbow-me/rainbowkit'

const { wallets } = getDefaultWallets()

export type ChainWithDetails = Chain & {
  iconBackground?: string
  iconUrl: string
  custom: {
    chainDetail: string
    gasFeeDetail: string
  }
}

// Define the chains for rainbow/wagmi and their respective icons
// These are the current supported chains for this app
// `chainDetail` and `gasFeeDetail` are custom fields to be used in the ChainList component
export const chains: [ChainWithDetails, ...ChainWithDetails[]] = [
  {
    ...foundry,
    iconBackground: 'bg-gray-400',
    iconUrl: '/assets/chains/ethereum.svg',
    custom: {
      chainDetail: 'Local Testnet',
      gasFeeDetail: 'Low gas fees'
    }
  },
  {
    ...mainnet,
    iconBackground: 'bg-gray-300',
    iconUrl: '/assets/chains/ethereum.svg',
    custom: {
      chainDetail: '',
      gasFeeDetail: 'High gas fees'
    }
  },
  {
    ...sepolia,
    iconBackground: 'bg-gray-200',
    iconUrl: '/assets/chains/ethereum.svg',
    custom: {
      chainDetail: 'Testnet',
      gasFeeDetail: 'Low gas fees'
    }
  },
  {
    ...optimism,
    iconUrl: '/assets/chains/optimism.svg',
    custom: {
      chainDetail: 'Ethereum L2',
      gasFeeDetail: 'Low gas fees'
    }
  },
  {
    ...optimismSepolia,
    iconUrl: '/assets/chains/optimism.svg',
    custom: {
      chainDetail: 'Ethereum L2 Testnet',
      gasFeeDetail: 'Low gas fees'
    }
  }
]

const config = getDefaultConfig({
  appName: APP_NAME,
  appIcon: 'https://app.ethfollow.xyz/logo.png',
  appDescription: APP_DESCRIPTION,
  appUrl: APP_URL,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  wallets: [...wallets],
  chains,
  transports: {
    [foundry.id]: http(process.env.NEXT_PUBLIC_LOCAL_RPC || 'http://0.0.0.0:8545', { batch: true }),
    [mainnet.id]: fallback(
      [
        http(`https://rpc.ankr.com/eth/${process.env.NEXT_PUBLIC_ANKR_ID}`, { batch: true }),
        http(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`, { batch: true }),
        http(`https://mainnet.ethfollow.xyz/v1/mainnet`, { batch: true }),
        http(`https://eth.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`, {
          batch: true
        }),
        http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ID}`, {
          batch: true
        }),
        webSocket(
          `wss://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ID}`
        ),
        webSocket('wss://www.noderpc.xyz/rpc-mainnet/ws/n4ieL_MU-2jm3Tfp73BVT6eJF9M'),
        webSocket(`wss://mainnet.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`),
        webSocket(`wss://eth.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`)
      ],
      { rank: true }
    ),
    [optimism.id]: fallback(
      [
        http(`https://rpc.ankr.com/optimism/${process.env.NEXT_PUBLIC_ANKR_ID}`, { batch: true }),
        http(
          `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID}`,
          { batch: true }
        ),
        http(`https://optimism-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`, {
          batch: true
        }),
        http(`https://optimism.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`, {
          batch: true
        }),
        webSocket(
          `wss://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID}`
        ),
        webSocket(`wss://optimism.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`)
      ],
      { rank: true }
    ),
    [sepolia.id]: fallback(
      [
        http(`https://rpc.ankr.com/eth_sepolia/${process.env.NEXT_PUBLIC_ANKR_ID}`, {
          batch: true
        }),
        http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`, { batch: true }),
        http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_SEPOLIA_ALCHEMY_ID}`, {
          batch: true
        }),
        webSocket(`wss://sepolia.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`),
        webSocket(
          `wss://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_SEPOLIA_ALCHEMY_ID}`
        )
      ],
      { rank: true }
    ),
    [optimismSepolia.id]: fallback(
      [
        http(`https://optimism-sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`, {
          batch: true
        }),
        http('https://sepolia.optimism.io', { batch: true }),
        http('https://sepolia-rollup.arbitrum.io/rpc', { batch: true })
      ],
      { rank: true }
    )
  }
})

export { config as wagmiConfig }
