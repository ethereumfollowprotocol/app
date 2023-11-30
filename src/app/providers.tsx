'use client'

import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import { Theme } from '@radix-ui/themes'
import { Header } from '#components/header.tsx'
import { chains, wagmiConfig } from '#lib/wallet.ts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            /**
             * With SSR, we usually want to set some default staleTime
             * above 0 to avoid refetching immediately on the client
             */
            staleTime: 60 * 1_000
          }
        }
      })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            coolMode
            chains={chains}
            showRecentTransactions
            theme={lightTheme({
              overlayBlur: 'small',
              accentColor: '#ffffff',
              accentColorForeground: '#000000'
            })}
          >
            <Theme scaling='100%' appearance='inherit' accentColor='gray'>
              <React.Suspense>
                <Header />
              </React.Suspense>
              {children}
            </Theme>
          </RainbowKitProvider>
        </WagmiConfig>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
