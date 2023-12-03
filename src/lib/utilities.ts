import { isAddress } from 'viem/utils'

export function raise(error: unknown): never {
  throw typeof error === 'string' ? new Error(error) : error
}

export const valueIsNotFalsy = <T>(param: T | null | undefined | false | '' | 0 | 0n): param is T =>
  !!param

export const valueIsFalsy = <T>(
  param: T | null | undefined | false | '' | 0 | 0n
): param is null | undefined | false | '' | 0 | 0n => !param

export function checkEnsValid(value?: string) {
  if (!value) return false
  const ens = value.trim().toLowerCase()
  return ens.endsWith('.eth') && ens.length >= 7 && /^[^.]*\.?[^.]*$/.test(ens)
}

export function checkAddressOrEnsValid(value: string) {
  return isAddress(value) || checkEnsValid(value)
}
