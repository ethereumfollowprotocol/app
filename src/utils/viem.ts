const addressRegex = /^0x[a-fA-F0-9]{40}$/

/** @internal */
export const isAddressCache = /*#__PURE__*/ new Map<string, boolean>()

export type IsAddressOptions = {
  /**
   * Enables strict mode. Whether or not to compare the address against its checksum.
   *
   * @default true
   */
  strict?: boolean | undefined
}

type Address = `0x${string}`

export function isAddress(address: string): address is Address {
  const cacheKey = `${address}`

  if (isAddressCache.has(cacheKey)) return isAddressCache.get(cacheKey)!

  const result = (() => {
    if (!addressRegex.test(address)) return false
    if (address.toLowerCase() === address) return true
    return true
  })()
  isAddressCache.set(cacheKey, result)
  return result
}

type Hex = `0x${string}`

export function isHex(value: unknown, { strict = true }: { strict?: boolean | undefined } = {}): value is Hex {
  if (!value) return false
  if (typeof value !== 'string') return false
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith('0x')
}
