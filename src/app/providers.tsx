'use client'

import * as React from 'react'
import { Theme } from '@radix-ui/themes'
import { Header } from '#/components/header.tsx'
import { DAY, HOUR, MINUTE } from '#/lib/constants'
import { wagmiConfig } from '#/lib/wallet/config.ts'
// import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { WagmiProvider, type State, serialize, deserialize } from 'wagmi'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { QueryClient, QueryClientProvider, type QueryClientConfig } from '@tanstack/react-query'

type Props = {
  children: React.ReactNode
  initialState?: State
}

const queryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 1 * DAY,
      /**
       * With SSR, we usually want to set some default staleTime
       * above 0 to avoid refetching immediately on the client
       */
      staleTime: 1 * MINUTE
    }
  }
} satisfies QueryClientConfig

// const persister = createSyncStoragePersister({
//   serialize,
//   deserialize,
//   storage: window.localStorage
// })

// const queryClient = new QueryClient(queryClientConfig)

export function Providers({ children, initialState }: Props) {
  const [queryClient] = React.useState(() => new QueryClient(queryClientConfig))
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <WagmiProvider config={wagmiConfig} reconnectOnMount={true} initialState={initialState}>
          {/* <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}> */}
          {/* <RainbowKitProvider coolMode chains={chains} theme={rainbowTheme}> */}
          <Theme scaling='100%' appearance='inherit' accentColor='gray'>
            <React.Suspense>
              <Header />
            </React.Suspense>
            {children}
          </Theme>
          {/* </RainbowKitProvider> */}
          {/* </PersistQueryClientProvider> */}
        </WagmiProvider>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
