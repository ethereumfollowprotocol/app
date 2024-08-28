'use client'

import { useEffect, useState } from 'react'
import { WagmiProvider, type State } from 'wagmi'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

import wagmiConfig from '#/lib/wagmi'
import { DAY, MINUTE } from '#/lib/constants'
import Navigation from '#/components/navigation'
import { CartProvider } from '#/contexts/cart-context'
import { ActionsProvider } from '#/contexts/actions-context'
import { EFPProfileProvider } from '#/contexts/efp-profile-context'
import { TransactionsProvider } from '#/contexts/transactions-context'

type ProviderProps = {
  children: React.ReactNode
  initialState?: State
}

const Providers: React.FC<ProviderProps> = ({ children, initialState }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { gcTime: 1 * DAY, staleTime: 1 * MINUTE }
        }
      })
  )

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme')
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark')
        return
      }

      if (storedTheme === 'light') {
        document.documentElement.classList.remove('dark')
        return
      }

      const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
      if (userMedia.matches) {
        document.documentElement.classList.add('dark')
        return
      }
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <WagmiProvider config={wagmiConfig} initialState={initialState}>
          {/* <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}> */}
          <RainbowKitProvider
            coolMode={true}
            theme={localStorage.getItem('theme') === 'dark' ? darkTheme() : undefined}
          >
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
          {/* </PersistQueryClientProvider> */}
        </WagmiProvider>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
