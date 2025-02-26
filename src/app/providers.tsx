'use client'

import { useTheme } from 'next-themes'
import { useIsClient } from '@uidotdev/usehooks'
import { WagmiProvider, type State } from 'wagmi'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import wagmiConfig from '#/lib/wagmi'
import { DAY, MINUTE } from '#/lib/constants'
import Navigation from '#/components/navigation'
import { SoundsProvider } from '#/contexts/sounds-context'
import { ActionsProvider } from '#/contexts/actions-context'
import { EFPProfileProvider } from '#/contexts/efp-profile-context'
import { RecommendedProfilesProvider } from '#/contexts/recommended-profiles-context'
import { TransactionModal, TransactionProvider } from '@encrypteddegen/identity-kit'

type ProviderProps = {
  children: React.ReactNode
  initialState?: State
}

const darkThemes = ['dark', 'halloween']

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { gcTime: 1 * DAY, staleTime: 5 * MINUTE },
  },
})

const Providers: React.FC<ProviderProps> = ({ children, initialState }) => {
  const isClient = useIsClient()
  const { resolvedTheme } = useTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig} initialState={initialState}>
        <RainbowKitProvider
          coolMode={false}
          theme={isClient && darkThemes.includes(resolvedTheme || 'dark') ? darkTheme() : undefined}
        >
          <TransactionProvider batchTransactions={true}>
            <EFPProfileProvider>
              <ActionsProvider>
                <SoundsProvider>
                  <RecommendedProfilesProvider>
                    <Navigation />
                    {children}
                    <TransactionModal />
                    <div id='modal-root' />
                  </RecommendedProfilesProvider>
                </SoundsProvider>
              </ActionsProvider>
            </EFPProfileProvider>
          </TransactionProvider>
        </RainbowKitProvider>
      </WagmiProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default Providers
