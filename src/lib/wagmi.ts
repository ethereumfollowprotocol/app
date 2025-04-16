import {
  rabbyWallet,
  rainbowWallet,
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
  safeWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { mainnet, optimism, base } from 'wagmi/chains'
import { type Chain, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { http, fallback, createStorage, cookieStorage, createConfig } from 'wagmi'
import { createThirdwebClient, defineChain as thirdwebDefineChain } from 'thirdweb'
import { inAppWalletConnector } from '@thirdweb-dev/wagmi-adapter'

import { APP_DESCRIPTION, APP_NAME, APP_URL } from '#/lib/constants'

const thirdwebClientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || '4e8c81182c3709ee441e30d776223354'
const unicornFactoryAddress =
  process.env.NEXT_PUBLIC_NEXT_PUBLIC_UNICORN_FACTORY_ADDRESS || '0xD771615c873ba5a2149D5312448cE01D677Ee48A'

// Create Thirdweb Client
const client = createThirdwebClient({
  clientId: thirdwebClientId,
})

// Create the Unicorn Wallet Connector (using Thirdweb In-App Wallet)
// Note: The chain specified here is for the smart account functionality as per Unicorn docs.
const unicornConnector = inAppWalletConnector({
  client,
  smartAccount: {
    sponsorGas: true, // or false based on your needs / Unicorn requirements
    chain: thirdwebDefineChain(mainnet.id),
    factoryAddress: unicornFactoryAddress,
  },
})

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
    iconUrl: '/assets/icons/chains/base.svg',
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
    iconUrl: '/assets/icons/chains/optimism.svg',
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
    iconUrl: '/assets/icons/chains/ethereum.svg',
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
]

const combinedConnectors = [unicornConnector, ...connectors]

const config = createConfig({
  ssr: true,
  connectors: combinedConnectors,
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
      http('https://eth.llamarpc.com', {
        batch: true,
      }),
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
    [base.id]: fallback([
      http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_ALCHEMY_ID}`, {
        batch: true,
      }),
      http(`https://smart-cosmological-telescope.base-mainnet.quiknode.pro/${process.env.NEXT_PUBLIC_QUICKNODE_ID}`, {
        batch: true,
      }),
      http('https://mainnet.base.org/', { batch: true }),
    ]),
  },
})

export default config
