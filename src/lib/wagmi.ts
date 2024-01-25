import { UserRejectedRequestError } from 'viem'
import { injected, walletConnect, metaMask } from 'wagmi/connectors'
import { APP_DESCRIPTION, APP_NAME, APP_URL } from '#/lib/constants'
import { mainnet, sepolia, foundry, optimism, optimismSepolia } from 'wagmi/chains'
import {
  http,
  fallback,
  webSocket,
  createConfig,
  cookieStorage,
  createStorage,
  unstable_connector,
  type CreateConnectorFn
} from 'wagmi'

const WALLET_CONNECT_PROJECT_ID = 'f2d8f8260bf3a600ec651ad51f2d4a70'

export const connectors = [
  injected({ shimDisconnect: true, unstable_shimAsyncInject: true, target: 'metaMask' }),
  injected({ shimDisconnect: true, unstable_shimAsyncInject: true, target: 'rainbow' }),
  walletConnect({
    showQrModal: true,
    isNewChainsStale: true,
    projectId: WALLET_CONNECT_PROJECT_ID,
    relayUrl: 'wss://relay.walletconnect.org',
    qrModalOptions: { themeMode: 'light' },
    metadata: {
      url: APP_URL,
      name: APP_NAME,
      description: APP_DESCRIPTION,
      icons: ['https://app.ethfollow.xyz/logo.png']
    }
  }),
  metaMask({ preferDesktop: true })
] satisfies Array<CreateConnectorFn>

// const unstableConnector = unstable_connector(injected, {
//   retryCount: 3,
//   name: 'Injected',
//   key: 'unstable_injected'
// })

export const wagmiConfig = createConfig({
  ssr: true,
  connectors,
  cacheTime: 4_000,
  pollingInterval: 4_000,
  syncConnectedChain: true,
  batch: { multicall: true },
  storage: createStorage({ storage: cookieStorage }),
  chains: [foundry, mainnet, sepolia, optimism, optimismSepolia],
  transports: {
    [foundry.id]: fallback([
      // unstableConnector,
      http(process.env.NEXT_PUBLIC_LOCAL_RPC || 'http://0.0.0.0:8545', { batch: true })
    ]),
    [mainnet.id]: fallback(
      [
        // unstableConnector,
        http(`https://rpc.ankr.com/eth/${process.env.NEXT_PUBLIC_ANKR_ID}`, { batch: true }),
        http('https://www.noderpc.xyz/rpc-mainnet/n4ieL_MU-2jm3Tfp73BVT6eJF9M', { batch: true }),
        http(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`, { batch: true }),
        http(`https://mainnet.ethfollow.xyz/v1/mainnet`, { batch: true }),
        http(`https://eth.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`, {
          batch: true
        }),
        http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ID}`, {
          batch: true
        }),
        webSocket(
          `wss://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ID}`
        ),
        webSocket('wss://www.noderpc.xyz/rpc-mainnet/ws/n4ieL_MU-2jm3Tfp73BVT6eJF9M'),
        webSocket(`wss://mainnet.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`),
        webSocket(`wss://eth.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`)
      ],
      { rank: true }
    ),
    [optimism.id]: fallback(
      [
        // unstableConnector,
        http(`https://rpc.ankr.com/optimism/${process.env.NEXT_PUBLIC_ANKR_ID}`, { batch: true }),
        http(
          `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID}`,
          { batch: true }
        ),
        http(`https://optimism-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`, {
          batch: true
        }),
        http(`https://optimism.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`, {
          batch: true
        }),
        webSocket(
          `wss://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID}`
        ),
        webSocket(`wss://optimism.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`)
      ],
      { rank: true }
    ),
    [sepolia.id]: fallback(
      [
        // unstableConnector,
        http(`https://rpc.ankr.com/eth_sepolia/${process.env.NEXT_PUBLIC_ANKR_ID}`, {
          batch: true
        }),
        http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`, { batch: true }),
        http('https://www.noderpc.xyz/rpc-sepolia/n4ieL_MU-2jm3Tfp73BVT6eJF9M', { batch: true }),
        http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_SEPOLIA_ALCHEMY_ID}`, {
          batch: true
        }),
        webSocket(`wss://sepolia.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`),
        webSocket('wss://www.noderpc.xyz/rpc-sepolia/ws/n4ieL_MU-2jm3Tfp73BVT6eJF9M'),
        webSocket(
          `wss://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_SEPOLIA_ALCHEMY_ID}`
        )
      ],
      { rank: true }
    ),
    [optimismSepolia.id]: fallback(
      [
        // unstableConnector,
        http(`https://optimism-sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`, {
          batch: true
        }),
        http('https://sepolia.optimism.io', { batch: true }),
        http('https://sepolia-rollup.arbitrum.io/rpc', { batch: true })
      ],
      { rank: true }
    )
  }
})

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig
  }
}
