import type { Address } from 'viem'

/**
 * @description This hook returns a list of suggested tags for a given address.
 * @param address
 * @returns {string[]} An array of strings representing the suggested tags for the given address.
 */
const useSuggestedTags = (address: Address): string[] => {
  return ['ens', 'crypto', 'eth']
}

export default useSuggestedTags
