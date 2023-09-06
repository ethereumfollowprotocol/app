'use client'

import en from '#/locales/en'
import { WagmiConfig } from 'wagmi'
import type { ReactNode } from 'react'
import { Theme } from '@radix-ui/themes'
import { wagmiConfig } from '#/lib/wallet'
import { ConnectKitProvider } from 'connectkit'
import { Header } from '#/components/Header'
import { Footer } from '#/components/Footer'
import { I18nProviderClient } from '#/locales/client'



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
      <WagmiConfig config={wagmiConfig}>
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
