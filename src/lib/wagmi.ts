import {
  rabbyWallet,
  rainbowWallet,
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
  safeWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { mainnet, optimism, base, baseSepolia, optimismSepolia, sepolia } from 'wagmi/chains'
import { type Chain, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { http, fallback, createStorage, cookieStorage, createConfig } from 'wagmi'

import { APP_DESCRIPTION, APP_NAME, APP_URL } from '#/lib/constants'

coinbaseWallet.preference = 'all'

// Define the connectors for the app
// Purposely using only these for now because of a localStorage error with the Coinbase Wallet connector
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [coinbaseWallet, injectedWallet],
    },
    {
      groupName: 'Popular',
      wallets: [rainbowWallet, metaMaskWallet, walletConnectWallet],
    },
    {
      groupName: 'Other',
      wallets: [rabbyWallet, safeWallet],
    },
  ],
  {
    appName: APP_NAME,
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    appDescription: APP_DESCRIPTION,
    appUrl: APP_URL,
    appIcon: 'https://efp.app/logo.png',
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
  {
    ...base,
    iconUrl: '/assets/chains/base.svg',
    custom: {
      chainDetail: 'Ethereum L2',
      gasFeeDetail: 'Super Low gas fees',
    },
    blockExplorers: {
      default: {
        name: 'Blockscout',
        url: 'https://explorer.base.org',
      },
      blockscout: {
        name: 'Blockscout',
        url: 'https://base.blockscout.com/',
      },
    },
  },
  {
    ...optimism,
    iconUrl: '/assets/chains/optimism.svg',
    custom: {
      chainDetail: 'Ethereum L2',
      gasFeeDetail: 'Low gas fees',
    },
    blockExplorers: {
      default: {
        name: 'Blockscout',
        url: 'https://explorer.optimism.io',
      },
      blockscout: {
        name: 'Blockscout',
        url: 'https://optimistic.blockscout.com/',
      },
    },
  },
  {
    ...mainnet,
    iconBackground: 'bg-zinc-300',
    iconUrl: '/assets/chains/ethereum.svg',
    custom: {
      chainDetail: '',
      gasFeeDetail: 'High gas fees',
    },
    blockExplorers: {
      default: {
        name: 'Blockscout',
        url: 'https://explorer.base.org',
      },
      blockscout: {
        name: 'Blockscout',
        url: 'https://eth.blockscout.com/',
      },
    },
  },
  {
    ...baseSepolia,
    iconUrl: '/assets/chains/base.svg',
    custom: {
      chainDetail: 'Ethereum L2 Testnet',
      gasFeeDetail: 'Super Low gas fees'
    }
  },
  {
    ...optimismSepolia,
    iconUrl: '/assets/chains/optimism.svg',
    custom: {
      chainDetail: 'Ethereum L2 Testnet',
      gasFeeDetail: 'Low gas fees'
    }
  },
  {
    ...sepolia,
    iconBackground: 'bg-zinc-200',
    iconUrl: '/assets/chains/ethereum.svg',
    custom: {
      chainDetail: 'Ethereum Testnet',
      gasFeeDetail: 'Low gas fees'
    }
  }
]

const config = createConfig({
  ssr: true,
  connectors,
  chains,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: fallback([
      http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ID}`, {
        batch: true,
      }),
      http(`https://smart-cosmological-telescope.quiknode.pro/${process.env.NEXT_PUBLIC_QUICKNODE_ID}`, {
        batch: true,
      }),
      http(`https://mainnet.infura.io/v3/`, {
        batch: true,
      }),
    ]),
    [sepolia.id]: fallback([
      http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_SEPOLIA_ALCHEMY_ID}`, {
        batch: true
      }),
      http(
        `https://smart-cosmological-telescope.ethereum-sepolia.quiknode.pro/${process.env.NEXT_PUBLIC_QUICKNODE_ID}`,
        {
          batch: true
        }
      )
    ]),
    [optimism.id]: fallback([
      http(`https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID}`, {
        batch: true,
      }),
      http(`https://smart-cosmological-telescope.optimism.quiknode.pro/${process.env.NEXT_PUBLIC_QUICKNODE_ID}`, {
        batch: true,
      }),
      http(`https://mainnet.optimism.io`, {
        batch: true,
      }),
    ]),
    [optimismSepolia.id]: fallback([
      http(
        `https://opt-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OP_SEPOLIA_ALCHEMY_ID}`,
        {
          batch: true
        }
      ),
      http(
        `https://smart-cosmological-telescope.optimism-sepolia.quiknode.pro/${process.env.NEXT_PUBLIC_QUICKNODE_ID}`,
        {
          batch: true
        }
      ),
      http('https://sepolia.optimism.io', { batch: true })
    ]),
    [base.id]: fallback([
      http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_ALCHEMY_ID}`, {
        batch: true,
      }),
      http(`https://smart-cosmological-telescope.base-mainnet.quiknode.pro/${process.env.NEXT_PUBLIC_QUICKNODE_ID}`, {
        batch: true,
      }),
      http('https://mainnet.base.org/', { batch: true }),
    ]),
    [baseSepolia.id]: fallback([
      http(
        `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA_ALCHEMY_ID}`,
        {
          batch: true
        }
      ),
      http(
        `https://smart-cosmological-telescope.base-sepolia.quiknode.pro/${process.env.NEXT_PUBLIC_QUICKNODE_ID}`,
        {
          batch: true
        }
      ),
      http('https://sepolia.base.org', { batch: true })
    ])
  },
})

export default config
