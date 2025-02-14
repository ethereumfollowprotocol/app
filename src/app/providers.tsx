'use client'

import localforage from 'localforage'
import { useTheme } from 'next-themes'
import { useIsClient } from '@uidotdev/usehooks'
import { WagmiProvider, type State } from 'wagmi'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { isServer, QueryClient, type Query } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

import wagmiConfig from '#/lib/wagmi'
import { DAY, MINUTE } from '#/lib/constants'
import Navigation from '#/components/navigation'
import { SoundsProvider } from '#/contexts/sounds-context'
import { ActionsProvider } from '#/contexts/actions-context'
import { EFPProfileProvider } from '#/contexts/efp-profile-context'
import { RecommendedProfilesProvider } from '#/contexts/recommended-profiles-context'

type ProviderProps = {
  children: React.ReactNode
  initialState?: State
}

const darkThemes = ['dark', 'halloween']

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { gcTime: 1 * DAY, staleTime: 5 * MINUTE },
    },
  })

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

const Providers: React.FC<ProviderProps> = ({ children, initialState }) => {
  const queryClient = getQueryClient()
  const asyncStoragePersistor = createAsyncStoragePersister({
    storage: localforage,
  })

  const isClient = useIsClient()
  const { resolvedTheme } = useTheme()

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersistor,
        dehydrateOptions: {
          shouldDehydrateQuery: (query: Query) => query.state.status === 'success' && !!query.meta?.persist,
        },
      }}
    >
      <WagmiProvider config={wagmiConfig} initialState={initialState}>
        <RainbowKitProvider
          coolMode={false}
          theme={isClient && darkThemes.includes(resolvedTheme || 'dark') ? darkTheme() : undefined}
        >
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
        </RainbowKitProvider>
      </WagmiProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </PersistQueryClientProvider>
  )
}

export default Providers
