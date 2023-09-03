/**
 * This file is passed in a `<script></script>` in the root layout at `src/layouts/Layout.astro`
 */

import { Web3Modal } from '@web3modal/html'
import { configureChains, createConfig } from '@wagmi/core'
import { arbitrum, mainnet, polygon, optimism } from '@wagmi/core/chains'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'

const chains = [arbitrum, mainnet, polygon, optimism]

const projectId = import.meta.env.PUBLIC_WALLET_CONNECT_PROJECT_ID
if (!projectId) throw new Error('Missing PUBLIC_WALLET_CONNECT_PROJECT_ID')

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

const wagmiConfig = createConfig({
  publicClient,
  autoConnect: true,
  connectors: w3mConnectors({
    projectId,
    chains,
  }),
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
const web3modal = new Web3Modal(
  {
    projectId,
    defaultChain: mainnet,

    themeMode: 'light',
    themeVariables: {
      // connect button background
      '--w3m-accent-color': '#ffffff47',
      '--w3m-background-color': '#E990A3',
      '--w3m-accent-fill-color': '#222022',
      '--w3m-font-feature-settings': 'tnums',
      '--w3m-overlay-background-color': '#e990a344',
      '--w3m-font-family': 'IBM Plex Mono, sans-serif',
      '--w3m-text-big-bold-font-family': 'IBM Plex Mono, sans-serif',
      '--w3m-text-medium-regular-font-family': 'IBM Plex Mono, sans-serif',
    },
  },
  ethereumClient,
)
