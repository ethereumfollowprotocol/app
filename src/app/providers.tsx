'use client'

import { sepolia } from 'viem/chains'
import { WagmiProvider, type State } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

import wagmiConfig from '#/lib/wagmi'
import { DAY, MINUTE } from '#/lib/constants'
import Navigation from '#/components/navigation'
import { CartProvider } from '#/contexts/cart-context'
import { ActionsProvider } from '#/contexts/actions-context'
import { TransactionsProvider } from '#/contexts/transactions-context'
import { useState } from 'react'
import { EFPProfileProvider } from '#/contexts/efp-profile-context'

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
  const [queryClient] = useState(
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
          <RainbowKitProvider
            coolMode={true}
            initialChain={DEFAULT_CHAIN_ID}
            showRecentTransactions={true}
          >
            <EFPProfileProvider>
              <TransactionsProvider>
                <CartProvider>
                  <ActionsProvider>
                    <Navigation />
                    {children}
                  </ActionsProvider>
                </CartProvider>
              </TransactionsProvider>
            </EFPProfileProvider>
          </RainbowKitProvider>
          {/* </PersistQueryClientProvider> */}
        </WagmiProvider>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
