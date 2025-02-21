import { keccak256, toHex } from 'viem/utils'

export function generateListStorageLocationSlot(address: `0x${string}` | undefined) {
    const hash = keccak256(toHex(Date.now() * Math.floor(Math.random() * 1000)))
    const trimmedHash = BigInt(hash.slice(0, 26)) & ((1n << 96n) - 1n)
    return BigInt(address + trimmedHash.toString(16))
//   const hash = keccak256(toHex(Date.now() * Math.floor(Math.random() * 1000)))
//   return BigInt(hash.slice(0, 66)) & ((1n << 255n) - 1n)
}
