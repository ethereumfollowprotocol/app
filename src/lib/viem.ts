import './patch.ts'
import {
  http,
  fallback,
  webSocket,
  walletActions,
  publicActions,
  createTestClient,
  createPublicClient
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, optimism, sepolia, optimismSepolia, foundry } from 'viem/chains'

export const evmClient = {
  '31337': () =>
    createTestClient({
      chain: foundry,
      mode: 'anvil',
      transport: http(process.env.NEXT_PUBLIC_LOCAL_RPC || 'http://0.0.0.0:8545'),
      account: privateKeyToAccount(
        process.env.NEXT_PUBLIC_ANVIL_ACCOUNT_PRIVATE_KEY ||
          '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
      )
    })
      .extend(publicActions)
      .extend(walletActions),
  mainnet: () =>
    createPublicClient({
      key: 'mainnet-client',
      name: 'Mainnet Client',
      chain: mainnet,
      transport: fallback(
        [
          http(`https://rpc.ankr.com/eth/${process.env.NEXT_PUBLIC_ANKR_ID}`),
          http(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`),
          http(`https://mainnet.ethfollow.xyz/v1/mainnet`),
          http(`https://eth.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`),
          http(
            `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ID}`
          ),
          webSocket(
            `wss://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ID}`
          ),
          webSocket(`wss://eth.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`),
          webSocket(`wss://mainnet.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`)
        ],
        {
          /**
           * TODO: investigate why public actions hang when rank is enabled
           * @link https://discord.com/channels/1156791276818157609/1156791519089541241/1178111399839399937
           */
          rank: false
        }
      ),
      batch: { multicall: true }
    }).extend(walletActions),
  optimism: () =>
    createPublicClient({
      key: 'optimism-client',
      name: 'Optimism Client',
      chain: optimism,
      transport: fallback(
        [
          http(`https://rpc.ankr.com/optimism/${process.env.NEXT_PUBLIC_ANKR_ID}`),
          http(
            `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID}`
          ),
          http(`https://optimism-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`),
          http(`https://optimism.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`),
          webSocket(
            `wss://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID}`
          ),
          webSocket(`wss://optimism.llamarpc.com/rpc/${process.env.NEXT_PUBLIC_LLAMAFOLIO_ID}`)
        ],
        { rank: true }
      ),
      batch: { multicall: true }
    }).extend(walletActions),
  sepolia: () =>
    createPublicClient({
      key: 'sepolia-client',
      name: 'Sepolia Client',
      chain: sepolia,
      transport: fallback(
        [
          http(`https://rpc.ankr.com/eth_sepolia/${process.env.NEXT_PUBLIC_ANKR_ID}`),
          http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`),
          http(
            `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_SEPOLIA_ALCHEMY_ID}`
          ),
          webSocket(`wss://sepolia.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`),
          webSocket(
            `wss://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_SEPOLIA_ALCHEMY_ID}`
          )
        ],
        { rank: true }
      ),
      batch: { multicall: true }
    }).extend(walletActions),
  optimismSepolia: () =>
    createPublicClient({
      key: 'op-sepolia-client',
      name: 'OP Sepolia Client',
      chain: optimismSepolia,
      transport: fallback(
        [
          http(`https://optimism-sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`),
          http('https://sepolia.optimism.io'),
          http('https://sepolia-rollup.arbitrum.io/rpc')
        ],
        { rank: true }
      ),
      batch: { multicall: true }
    }).extend(walletActions)
}

export type EVMClient = ReturnType<(typeof evmClient)['31337'] | (typeof evmClient)['mainnet']>
