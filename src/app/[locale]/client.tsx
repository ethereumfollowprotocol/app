'use client'

import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import { Theme } from '@radix-ui/themes'
import { wagmiConfig } from '#lib/wallet'
import { Header } from '#components/header'
import { Footer } from '#components/footer'
import { ConnectKitProvider } from 'connectkit'
import { I18nProviderClient } from '#locales/client'

export default function Layout({
  params: { locale },
  children,
}: {
  params: { locale: string }
  children: React.ReactElement
}) {
  return (
    <I18nProviderClient
      fallback={
        /**
         * TODO: add proper loading state
         */
        <p> Loading...</p>
      }
      locale={locale}
    >
      <WagmiConfig config={wagmiConfig}>
        <ConnectKitProvider
          mode='light'
          options={{
            /**
             * TODO: detect locale and move this outside
             */
            language: 'en-US',
          }}
        >
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
