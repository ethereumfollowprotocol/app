'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MdFeedback } from 'react-icons/md'
import { WagmiProvider, type State } from 'wagmi'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
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

  const { resolvedTheme } = useTheme()
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <WagmiProvider config={wagmiConfig} initialState={initialState}>
          {/* <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}> */}
          <RainbowKitProvider
            coolMode={true}
            theme={isClient && resolvedTheme === 'dark' ? darkTheme() : undefined}
          >
            <CartProvider>
              <EFPProfileProvider>
                <TransactionsProvider>
                  <ActionsProvider>
                    <Navigation />
                    <div className='fixed bottom-4 left-4 p-3 text-3xl rounded-full cursor-pointer z-50 dark:bg-zinc-600 hover:scale-110 bg-zinc-300 hover:bg-zinc-400 dark:hover:bg-zinc-500 transition-all'>
                      <a
                        className='h-full w-full'
                        href='https://discord.com/invite/hDTFKmxwwV'
                        target='_blank'
                        rel='noreferrer'
                      >
                        <MdFeedback />
                      </a>
                    </div>
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
