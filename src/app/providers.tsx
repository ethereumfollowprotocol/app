'use client'

import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import { Theme } from '@radix-ui/themes'
import { Header } from '#components/header'
import { Footer } from '#components/footer'
import { chains, wagmiConfig } from '#lib/wallet.ts'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

export function Providers({
  locale = 'en',
  children
}: {
  locale?: string
  children: React.ReactNode
}) {
  const [queryClient] = React.useState(() => new QueryClient())
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [setMounted])
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <Theme>
              <Header />
              {mounted && children}
              {/* <Footer /> */}
            </Theme>
          </RainbowKitProvider>
        </WagmiConfig>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
