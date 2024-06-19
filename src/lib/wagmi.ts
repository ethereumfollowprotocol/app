'use client'

import { type Chain, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { http, fallback, createStorage, cookieStorage, createConfig } from 'wagmi'
import { injectedWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { mainnet, sepolia, optimism, optimismSepolia, baseSepolia, base } from 'wagmi/chains'

import { APP_DESCRIPTION, APP_NAME, APP_URL } from '#/lib/constants'

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
        http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ID}`, {
          batch: true
        }),
        http(`https://mainnet.infura.io/v3/`, {
          batch: true
        })
      ],
      { rank: true }
    ),
    [optimism.id]: fallback(
      [
        http(
          `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID}`,
          { batch: true }
        ),
        http(`https://mainnet.optimism.io`, {
          batch: true
        })
      ],
      { rank: true }
    ),
    [sepolia.id]: fallback(
      [
        http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_SEPOLIA_ALCHEMY_ID}`, {
          batch: true
        })
      ],
      { rank: true }
    ),
    [optimismSepolia.id]: fallback(
      [
        http(
          `https://opt-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OP_SEPOLIA_ALCHEMY_ID}`,
          {
            batch: true
          }
        ),
        http('https://sepolia.optimism.io', { batch: true })
      ],
      { rank: true }
    ),
    [base.id]: fallback(
      [
        http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_ALCHEMY_ID}`, {
          batch: true
        }),
        http('https://mainnet.base.org/', { batch: true })
      ],
      { rank: true }
    ),
    [baseSepolia.id]: fallback(
      [
        http(
          `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA_ALCHEMY_ID}`,
          {
            batch: true
          }
        ),
        http('https://sepolia.base.org', { batch: true })
      ],
      { rank: true }
    )
  }
})

export default config
