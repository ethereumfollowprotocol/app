'use client'

import { useMemo } from 'react'
import { useTheme } from 'next-themes'
import { WagmiProvider, type State } from 'wagmi'
import { TransactionProvider } from '@encrypteddegen/identity-kit'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import wagmiConfig from '#/lib/wagmi'
import { DAY, MINUTE } from '#/lib/constants'
import Navigation from '#/components/navigation'
import { SoundsProvider } from '#/contexts/sounds-context'
import TransactionModal from '#/components/transaction-modal'
import { EFPProfileProvider } from '#/contexts/efp-profile-context'
import { RecommendedProfilesProvider } from '#/contexts/recommended-profiles-context'

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
  const { resolvedTheme } = useTheme()

  const rainbowKitTheme = useMemo(() => {
    return darkThemes.includes(resolvedTheme || 'dark') ? darkTheme() : undefined
  }, [resolvedTheme])

  const providers = useMemo(
    () => (
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig} initialState={initialState}>
          <RainbowKitProvider coolMode={false} theme={rainbowKitTheme}>
            <TransactionProvider batchTransactions={true}>
              <EFPProfileProvider>
                <SoundsProvider>
                  <RecommendedProfilesProvider>
                    <Navigation />
                    {children}
                    <TransactionModal />
                    <div id='modal-root' />
                  </RecommendedProfilesProvider>
                </SoundsProvider>
              </EFPProfileProvider>
            </TransactionProvider>
          </RainbowKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    ),
    [rainbowKitTheme, initialState, children]
  )

  return providers
}

export default Providers
