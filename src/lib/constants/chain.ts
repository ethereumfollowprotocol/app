/**
 * All constants related to blockchain chain go here
 */

import { baseSepolia } from 'viem/chains'

export const chains = ['mainnet', 'optimism', 'base'] as const
export const DEFAULT_CHAIN = baseSepolia

export type Chain = (typeof chains)[number]
