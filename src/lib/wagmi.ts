'use client'

import { APP_DESCRIPTION, APP_NAME, APP_URL } from '#/lib/constants'
import { mainnet, sepolia, optimism, optimismSepolia, baseSepolia } from 'wagmi/chains'
import { http, fallback, createStorage, cookieStorage, createConfig } from 'wagmi'
import { type Chain, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { injectedWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'

// Define the connectors for the app
// Purposely using only these for now because of a localStorage error with the Coinbase Wallet connector
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [injectedWallet, walletConnectWallet]
    }
  ],
  {
    appName: APP_NAME,
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    appDescription: APP_DESCRIPTION,
    appUrl: APP_URL,
    appIcon: 'https://app.ethfollow.xyz/logo.png'
  }
)

export type ChainWithDetails = Chain & {
  iconBackground?: string
  iconUrl?: string
  custom: {
    chainDetail?: string
    gasFeeDetail?: string
  }
}

// Define the chains for rainbow/wagmi and their respective icons
// These are the current supported chains for this app
// `chainDetail` and `gasFeeDetail` are custom fields to be used in the ChainList component
export const chains: [ChainWithDetails, ...ChainWithDetails[]] = [
  // {
  //   ...mainnet,
  //   iconBackground: 'bg-gray-300',
  //   iconUrl: '/assets/chains/ethereum.svg',
  //   custom: {
  //     chainDetail: '',
  //     gasFeeDetail: 'High gas fees'
  //   }
  // },
  {
    ...baseSepolia,
    iconUrl: '/assets/chains/base.svg',
    custom: {
      chainDetail: 'Testnet',
      gasFeeDetail: 'Super Low gas fees'
    }
  },
  // {
  //   ...sepolia,
  //   iconBackground: 'bg-gray-200',
  //   iconUrl: '/assets/chains/ethereum.svg',
  //   custom: {
  //     chainDetail: 'Testnet',
  //     gasFeeDetail: 'Low gas fees'
  //   }
  // },
  // {
  //   ...optimism,
  //   iconUrl: '/assets/chains/optimism.svg',
  //   custom: {
  //     chainDetail: 'Ethereum L2',
  //     gasFeeDetail: 'Low gas fees'
  //   }
  // },
  {
    ...optimismSepolia,
    iconUrl: '/assets/chains/optimism.svg',
    custom: {
      chainDetail: 'Ethereum L2 Testnet',
      gasFeeDetail: 'Low gas fees'
    }
  }
]

const config = createConfig({
  ssr: true,
  connectors,
  chains,
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: {
    // [foundry.id]: http(process.env.NEXT_PUBLIC_LOCAL_RPC || 'http://0.0.0.0:8545', { batch: true }),
    [mainnet.id]: fallback(
      [
        // http(`https://rpc.ankr.com/eth/${process.env.NEXT_PUBLIC_ANKR_ID}`, { batch: true }),
        // http(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`, { batch: true }),
        // http(`https://mainnet.ethfollow.xyz/v1/mainnet`, { batch: true }),
        // http(`https://eth.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`, {
        //   batch: true
        // }),
        http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ID}`, {
          batch: true
        })
      ],
      { rank: true }
    ),
    [optimism.id]: fallback(
      [
        // http(`https://rpc.ankr.com/optimism/${process.env.NEXT_PUBLIC_ANKR_ID}`, { batch: true }),
        http(
          `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID}`,
          { batch: true }
        )
        // http(`https://optimism-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`, {
        //   batch: true
        // }),
        // http(`https://optimism.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`, {
        //   batch: true
        // })
      ],
      { rank: true }
    ),
    [sepolia.id]: fallback(
      [
        // http(`https://rpc.ankr.com/eth_sepolia/${process.env.NEXT_PUBLIC_ANKR_ID}`, {
        //   batch: true
        // }),
        http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_SEPOLIA_ALCHEMY_ID}`, {
          batch: true
        })
      ],
      { rank: true }
    ),
    [optimismSepolia.id]: fallback(
      [
        // http(`https://optimism-sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`, {
        //   batch: true
        // }),
        http('https://sepolia.optimism.io', { batch: true }),
        http('https://sepolia-rollup.arbitrum.io/rpc', { batch: true })
      ],
      { rank: true }
    ),
    [baseSepolia.id]: fallback(
      [
        // http(`https://optimism-sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`, {
        //   batch: true
        // }),
        http('https://sepolia.base.org', { batch: true })
      ],
      { rank: true }
    )
  }
})

export default config
