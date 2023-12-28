import { isAddress } from 'viem/utils'
import { clsx, type ClassValue } from 'clsx'
import { twMerge as tailwindMerge } from 'tailwind-merge'

export function raise(error: unknown): never {
  throw typeof error === 'string' ? new Error(error) : error
}

/**
 * @see https://www.youtube.com/watch?v=re2JFITR7TI
 */
export function cn(...args: Array<ClassValue>): string {
  return tailwindMerge(clsx(...args))
}

export function urlSearchParams(
  params: Record<string, string | number | boolean | undefined | null>
) {
  return new URLSearchParams(
    JSON.parse(
      JSON.stringify({
        ...params
      })
    ) as Record<string, string>
  )
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
