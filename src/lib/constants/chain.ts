/**
 * All constants related to blockchain chain go here
 */

import { optimismSepolia } from 'viem/chains'

export const chains = ['mainnet', 'optimism', 'arbitrum', 'polygon', 'zkSync'] as const
export const DEFAULT_CHAIN = optimismSepolia

export type Chain = (typeof chains)[number]
