'use client'

import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import { Theme } from '@radix-ui/themes'
import { wagmiConfig } from '#lib/wallet'
import { Header } from '#components/header'
import { Footer } from '#components/footer'
import { ConnectKitProvider } from 'connectkit'
import { I18nProviderClient } from '#locales/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

export function Providers({ locale, children }: { locale: string; children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient())

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
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>
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
                {/* <Footer /> */}
              </Theme>
            </ConnectKitProvider>
          </WagmiConfig>
        </ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </I18nProviderClient>
  )
}
