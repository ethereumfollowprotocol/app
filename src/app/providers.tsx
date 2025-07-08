'use client'

import { useMemo, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { ThirdwebProvider } from 'thirdweb/react'
import { WagmiProvider, type State } from 'wagmi'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TransactionProvider, TranslationProvider } from 'ethereum-identity-kit'

import wagmiConfig from '#/lib/wagmi'
import { DAY, MINUTE } from '#/lib/constants'
import Navigation from '#/components/navigation'
import { SoundsProvider } from '#/contexts/sounds-context'
import { translations } from '#/lib/constants/translations'
import TransactionModal from '#/components/transaction-modal'
import { EFPProfileProvider } from '#/contexts/efp-profile-context'
import { RecommendedProfilesProvider } from '#/contexts/recommended-profiles-context'
import { useIsClient } from '@uidotdev/usehooks'

type ProviderProps = {
  children: React.ReactNode
  initialState?: State
}

const darkThemes = ['dark', 'glass-dark', 'halloween']

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { gcTime: 1 * DAY, staleTime: 5 * MINUTE },
  },
})

const Providers: React.FC<ProviderProps> = ({ children, initialState }) => {
  const { resolvedTheme } = useTheme()
  const isClient = useIsClient()

  // Apply both glass and base theme classes for library compatibility
  useEffect(() => {
    if (!isClient) return

    const body = document.querySelector('body')
    if (resolvedTheme === 'glass-dark' || resolvedTheme === 'dark') {
      // Apply both glass-dark and dark classes
      body?.classList.add('dark')
    } else if (resolvedTheme === 'glass-light' || resolvedTheme === 'light') {
      // Remove dark class for glass-light
      body?.classList.remove('dark')
    }
    // For standard 'dark' and 'light' themes, next-themes handles this automatically
  }, [resolvedTheme, isClient])

  const rainbowKitTheme = useMemo(() => {
    return darkThemes.includes(resolvedTheme || 'dark') ? darkTheme() : undefined
  }, [resolvedTheme])

  const providers = useMemo(
    () => (
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig} initialState={initialState}>
          <RainbowKitProvider coolMode={false} theme={rainbowKitTheme}>
            <ThirdwebProvider>
              <TranslationProvider translations={translations}>
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
              </TranslationProvider>
            </ThirdwebProvider>
          </RainbowKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    ),
    [rainbowKitTheme, initialState, children]
  )

  return providers
}

export default Providers
