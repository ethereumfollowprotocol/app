import { isAddress } from 'viem/utils'

export function raise(error: unknown): never {
  throw typeof error === 'string' ? new Error(error) : error
}

export function checkEnsValid(value?: string) {
  if (!value) return false
  const ens = value.trim().toLowerCase()
  return ens.endsWith('.eth') && ens.length >= 7 && /^[^.]*\.?[^.]*$/.test(ens)
}

export function checkAddressOrEnsValid(value: string) {
  return isAddress(value) || checkEnsValid(value)
}
