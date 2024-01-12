import { unixTimestamp } from '#/lib/utilities'
import { keccak256, toHex } from 'viem/utils'

export function generateListStorageLocationSlot() {
  const hash = keccak256(toHex(Date.now().toString()))
  return BigInt(hash.slice(0, 64)) & ((1n << 255n) - 1n)
}
