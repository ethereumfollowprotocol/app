'use client'

import {
  RainbowKitSiweNextAuthProvider,
  type GetSiweMessageOptions
} from '@rainbow-me/rainbowkit-siwe-next-auth'
import { WagmiProvider, type State } from 'wagmi'
import { SessionProvider } from 'next-auth/react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

import wagmiConfig from '#/lib/wagmi'
import Navigation from '#/components/navigation'
import { DEFAULT_CHAIN } from '#/lib/constants/chain'
import { CartProvider } from '#/contexts/cart-context'
import { ActionsProvider } from '#/contexts/actions-context'
import { EFPProfileProvider } from '#/contexts/efp-profile-context'
import { TransactionsProvider } from '#/contexts/transactions-context'

type ProviderProps = {
  children: React.ReactNode
  initialState?: State
}

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to my RainbowKit app'
})

const queryClient = new QueryClient()

const Providers: React.FC<ProviderProps> = ({ children, initialState }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <WagmiProvider config={wagmiConfig} initialState={initialState}>
          {/* <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}> */}
          <SessionProvider refetchInterval={0}>
            <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
              <RainbowKitProvider coolMode={true} initialChain={DEFAULT_CHAIN.id}>
                <CartProvider>
                  <EFPProfileProvider>
                    <TransactionsProvider>
                      <ActionsProvider>
                        <Navigation />
                        {children}
                      </ActionsProvider>
                    </TransactionsProvider>
                  </EFPProfileProvider>
                </CartProvider>
              </RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </SessionProvider>
          {/* </PersistQueryClientProvider> */}
        </WagmiProvider>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
