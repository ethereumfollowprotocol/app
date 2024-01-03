import { keccak256 } from 'viem/utils'
import type { Address } from '#lib/types.ts'

export const generateNonce = () => keccak256(Date.now().toString() as Address)
