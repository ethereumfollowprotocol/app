import { UserRejectedRequestError } from 'viem'
import { APP_DESCRIPTION, APP_NAME, APP_URL } from '#/lib/constants'
import { mainnet, sepolia, foundry, optimism, optimismSepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, mock, walletConnect, safe } from 'wagmi/connectors'
import { http, fallback, webSocket, createConfig, unstable_connector, createStorage } from 'wagmi'

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig
  }
}

const WALLET_CONNECT_PROJECT_ID = 'f2d8f8260bf3a600ec651ad51f2d4a70'

export const connectors = [
  injected({ shimDisconnect: true, unstable_shimAsyncInject: true, target: 'metaMask' }),
  injected({ shimDisconnect: true, unstable_shimAsyncInject: true, target: 'rainbow' }),
  injected({ shimDisconnect: true, unstable_shimAsyncInject: true, target: 'trust' }),
  injected({ shimDisconnect: true, unstable_shimAsyncInject: true, target: 'zerion' }),
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
  safe({ shimDisconnect: true, debug: process.env.NODE_ENV === 'development' }),
  coinbaseWallet({ appName: APP_NAME, appLogoUrl: 'https://app.ethfollow.xyz/logo.png' }),
  mock({
    accounts: [
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
      '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
      '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
      '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
      '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
      '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f',
      '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720'
    ],
    features: {
      reconnect: false,
      connectError: new UserRejectedRequestError(new Error('Failed to connect'))
    }
  })
]

// const unstableConnector = unstable_connector(injected, {
//   retryCount: 3,
//   name: 'Injected',
//   key: 'unstable_injected'
// })

export const wagmiConfig = createConfig({
  // ssr: true,
  connectors,
  cacheTime: 4_000,
  pollingInterval: 4_000,
  syncConnectedChain: true,
  batch: { multicall: true },
  // multiInjectedProviderDiscovery: true,
  // storage: createStorage({ key: 'wagmi', storage: window.localStorage }),
  chains: [mainnet, sepolia, foundry, optimism, optimismSepolia],
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
        http(`https://ethereum.ethfollow.xyz/v1/mainnet`, { batch: true }),
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
