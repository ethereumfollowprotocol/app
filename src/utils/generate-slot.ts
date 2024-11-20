import { keccak256, toHex } from 'viem/utils'

export function generateListStorageLocationSlot() {
  const hash = keccak256(toHex(Date.now() * Math.floor(Math.random() * 1000)))
  return BigInt(hash.slice(0, 66)) & ((1n << 255n) - 1n)
}
