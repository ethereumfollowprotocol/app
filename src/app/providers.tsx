'use client'

import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import { Theme } from '@radix-ui/themes'
import { Header } from '#components/header.tsx'
import { Footer } from '#components/footer.tsx'
import { chains, rainbowTheme, wagmiConfig } from '#lib/wallet.ts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            coolMode
            chains={chains}
            showRecentTransactions
            theme={lightTheme({ overlayBlur: 'small' })}
          >
            <Theme scaling='100%'>
              <Header />
              {children}
              {/* <Footer /> */}
            </Theme>
          </RainbowKitProvider>
        </WagmiConfig>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
