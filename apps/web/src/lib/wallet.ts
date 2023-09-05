import { createConfig } from 'wagmi'
import { getDefaultConfig } from 'connectkit'

export const walletConfig = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID,
    appName: 'EFP',
    appDescription: 'Ethereum Follow Protocol',
    appUrl: 'https://family.co',
    appIcon: '/assets/logo.svg',
  }),
)
