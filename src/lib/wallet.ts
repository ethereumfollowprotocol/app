import en from '#locales/en.ts'
import { createConfig } from 'wagmi'
import { APP_URL } from '#lib/constants.ts'
import { getDefaultConfig } from 'connectkit'

export const wagmiConfig = createConfig(
  getDefaultConfig({
    appUrl: APP_URL,
    appIcon: '/assets/logo.svg',
    appName: en.APP_NAME.SHORT,
    appDescription: en.APP_NAME.LONG,
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  }),
)
