/**
 * All constants related to blockchain chain go here
 */

import { base, mainnet, optimism, baseSepolia, optimismSepolia, sepolia } from 'viem/chains'

export const chains = ['mainnet', 'optimism', 'base', 'baseSepolia'] as const
export const DEFAULT_CHAIN = baseSepolia

export type Chain = (typeof chains)[number]

export const LIST_OP_LIMITS: Record<number, number> = {
  [mainnet.id]: Number(process.env.NEXT_PUBLIC_MAINNET_LIMIT || 500),
  [optimism.id]: Number(process.env.NEXT_PUBLIC_OPTIMISM_LIMIT || 500),
  [base.id]: Number(process.env.NEXT_PUBLIC_BASE_LIMIT || 500),
  [sepolia.id]: Number(process.env.NEXT_PUBLIC_SEPOLIA_LIMIT || 500),
  [optimismSepolia.id]: Number(process.env.NEXT_PUBLIC_OPTIMISM_SEPOLIA_LIMIT || 500),
  [baseSepolia.id]: Number(process.env.NEXT_PUBLIC_BASE_SEPOLIA_LIMIT || 500),
} as const
