'use client'

import { WagmiConfig } from 'wagmi'
import type { ReactNode } from 'react'
import { Theme } from '@radix-ui/themes'
import { wagmiConfig } from '#lib/wallet'
import { Header } from '#components/header'
import { Footer } from '#components/footer'
import { ConnectKitProvider } from 'connectkit'
import { I18nProviderClient } from '#locales/client'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <I18nProviderClient
      fallback={
        /**
         * TODO: add proper loading state
         */
        <p> Loading...</p>
      }
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
