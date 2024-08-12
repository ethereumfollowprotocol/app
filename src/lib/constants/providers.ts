import { base, baseSepolia, mainnet, optimism, optimismSepolia, sepolia } from 'viem/chains'

export const rpcProviders: Record<number, string> = {
  [mainnet.id]: `https://eth-mainnet.g.alchemy.com/v2/${process.env.MAINNET_ALCHEMY_ID}`,
  [optimism.id]: `https://opt-mainnet.g.alchemy.com/v2/${process.env.OPTIMISM_ALCHEMY_ID}`,
  [sepolia.id]: `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_ALCHEMY_ID}`,
  [optimismSepolia.id]: `https://opt-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_ALCHEMY_ID}`,
  [base.id]: `https://base-mainnet.g.alchemy.com/v2/${process.env.BASE_ALCHEMY_ID}`,
  [baseSepolia.id]: `https://base-sepolia.g.alchemy.com/v2/${process.env.BASE_SEPOLIA_ALCHEMY_ID}`
}
