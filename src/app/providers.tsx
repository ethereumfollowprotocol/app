'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useIsClient } from '@uidotdev/usehooks'
import { WagmiProvider, type State } from 'wagmi'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

import wagmiConfig from '#/lib/wagmi'
import { DAY, MINUTE } from '#/lib/constants'
import Navigation from '#/components/navigation'
import { CartProvider } from '#/contexts/cart-context'
import { SoundsProvider } from '#/contexts/sounds-context'
import { ActionsProvider } from '#/contexts/actions-context'
import { EFPProfileProvider } from '#/contexts/efp-profile-context'
import { RecommendedProfilesProvider } from '#/contexts/recommended-profiles-context'

type ProviderProps = {
  children: React.ReactNode
  initialState?: State
}

const darkThemes = ['dark', 'halloween']

const Providers: React.FC<ProviderProps> = ({ children, initialState }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { gcTime: 1 * DAY, staleTime: 1 * MINUTE },
        },
      })
  )

  const isClient = useIsClient()
  const { resolvedTheme } = useTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <WagmiProvider config={wagmiConfig} initialState={initialState}>
          <RainbowKitProvider
            coolMode={false}
            theme={isClient && darkThemes.includes(resolvedTheme || 'dark') ? darkTheme() : undefined}
          >
            <CartProvider>
              <EFPProfileProvider>
                <ActionsProvider>
                  <SoundsProvider>
                    <RecommendedProfilesProvider>
                      <Navigation />
                      {children}
                    </RecommendedProfilesProvider>
                  </SoundsProvider>
                </ActionsProvider>
              </EFPProfileProvider>
            </CartProvider>
          </RainbowKitProvider>
        </WagmiProvider>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
