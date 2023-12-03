/**
 * All constants related to blockchain chain go here
 */

export const chains = ['mainnet', 'optimism', 'arbitrum', 'polygon', 'zkSync'] as const

export type Chain = (typeof chains)[number]
