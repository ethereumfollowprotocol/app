'use client'
// import '@radix-ui/themes/styles.css'

import en from '#/locales/en'
import type { ReactNode } from 'react'
import { APP_URL } from '#/lib/constants'
import { Header } from '#/app/components/Header.tsx'
import { Footer } from '#/app/components/Footer.tsx'
import { WagmiConfig, createConfig } from 'wagmi'
import { I18nProviderClient } from '#/locales/client'
import { Theme } from '@radix-ui/themes'

import { ConnectKitProvider, getDefaultConfig } from 'connectkit'

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    appName: en.APP_NAME.SHORT,
    appDescription: en.APP_NAME.LONG,
    appUrl: APP_URL,
    appIcon: '/assets/logo.svg',
  }),
)

export default function Layout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  return (
    <I18nProviderClient
      locale={locale}
      fallback={<p> Loading...</p>}
      fallbackLocale={en}
    >
      <WagmiConfig config={config}>
        <ConnectKitProvider mode='light'>
          <Theme>
            <Header />
            {children}
            <Footer />
          </Theme>
        </ConnectKitProvider>
      </WagmiConfig>
    </I18nProviderClient>
  )
}
