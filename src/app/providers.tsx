'use client'

import { Header } from '#/components/header.tsx'
import { ActionsProvider } from '#/contexts/actions-context'
import { CartProvider } from '#/contexts/cart-context'
import { TransactionsProvider } from '#/contexts/transactions-context'
import { DAY, MINUTE } from '#/lib/constants'
import wagmiConfig from '#/lib/wagmi'
import { Theme } from '@radix-ui/themes'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import * as React from 'react'
import { sepolia } from 'viem/chains'
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

const DEFAULT_CHAIN_ID = sepolia.id

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
          <RainbowKitProvider coolMode={true} initialChain={DEFAULT_CHAIN_ID}>
            <TransactionsProvider>
              <CartProvider>
                <ActionsProvider>
                  <Theme scaling='100%' appearance='inherit' accentColor='gray'>
                    <React.Suspense>
                      <Header />
                    </React.Suspense>
                    {children}
                  </Theme>
                </ActionsProvider>
              </CartProvider>
            </TransactionsProvider>
          </RainbowKitProvider>
          {/* </PersistQueryClientProvider> */}
        </WagmiProvider>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
