'use client'

import { Header } from '#/components/header.tsx'
import { CartProvider } from '#/contexts/cart-context'
import { DAY, MINUTE } from '#/lib/constants'
import { wagmiConfig } from '#/lib/wagmi'
import { Theme } from '@radix-ui/themes'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import * as React from 'react'
import { WagmiProvider, type State } from 'wagmi'

type Props = {
  children: React.ReactNode
  initialState?: State
}

// const persister = createSyncStoragePersister({
//   serialize,
//   deserialize,
//   storage: window.localStorage
// })

export function Providers({ children, initialState }: Props) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { gcTime: 1 * DAY, staleTime: 1 * MINUTE }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <WagmiProvider config={wagmiConfig} reconnectOnMount={true} initialState={initialState}>
          {/* <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}> */}
          <RainbowKitProvider coolMode={true} initialChain={1}>
            <CartProvider>
              <Theme scaling='100%' appearance='inherit' accentColor='gray'>
                <React.Suspense>
                  <Header />
                </React.Suspense>
                {children}
              </Theme>
            </CartProvider>
          </RainbowKitProvider>
          {/* </PersistQueryClientProvider> */}
        </WagmiProvider>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
