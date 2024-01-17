'use client'

import * as React from 'react'
import { Theme } from '@radix-ui/themes'
import { ThemeProvider } from 'next-themes'
import { DAY, MINUTE } from '#/lib/constants'
import { Header } from '#/components/header.tsx'
import { WagmiProvider, type State } from 'wagmi'
import { wagmiConfig } from '#/lib/wallet/config.ts'
// import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

type Props = {
  children: React.ReactNode
  initialState?: State
}

// const persister = createSyncStoragePersister({
//   serialize,
//   deserialize,
//   storage: window.localStorage
// })

// const queryClient = new QueryClient(queryClientConfig)

export function Providers({ children, initialState }: Props) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1 * DAY,
            staleTime: 1 * MINUTE
          }
        }
      })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <WagmiProvider config={wagmiConfig} reconnectOnMount={true} initialState={initialState}>
          {/* <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}> */}
          {/* <RainbowKitProvider coolMode chains={chains} theme={rainbowTheme}> */}
          <ThemeProvider attribute='class' themes={['pink', 'red', 'blue', 'light', 'dark']}>
            <Theme
              scaling='100%'
              appearance='inherit'
              accentColor='gray'
              data-radix-provider={true}
            >
              <React.Suspense>
                <Header />
              </React.Suspense>
              {children}
            </Theme>
          </ThemeProvider>
          {/* </RainbowKitProvider> */}
          {/* </PersistQueryClientProvider> */}
        </WagmiProvider>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
