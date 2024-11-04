import { base, mainnet, optimism } from 'viem/chains'

export const rpcProviders: Record<number, string> = {
  [mainnet.id]: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ID}`,
  // [sepolia.id]: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_SEPOLIA_ALCHEMY_ID}`,
  [optimism.id]: `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID}`,
  // [optimismSepolia.id]: `https://opt-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OP_SEPOLIA_ALCHEMY_ID}`,
  [base.id]: `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_ALCHEMY_ID}`
  // [baseSepolia.id]: `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA_ALCHEMY_ID}`
}
