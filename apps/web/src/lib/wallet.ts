import en from '#/locales/en'
import { createConfig } from 'wagmi'
import { APP_URL } from '#/lib/constants'
import { getDefaultConfig } from 'connectkit'

export const wagmiConfig = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    appName: en.APP_NAME.SHORT,
    appDescription: en.APP_NAME.LONG,
    appUrl: APP_URL,
    appIcon: '/assets/logo.svg',
  }),
)
