import { type ClassValue, clsx } from 'clsx'
import { twMerge as tailwindMerge } from 'tailwind-merge'
import { isAddress } from 'viem/utils'

export function raise(error: unknown): never {
  throw typeof error === 'string' ? new Error(error) : error
}

export const unixTimestamp = () => Math.floor(Date.now() / 1000)

export function truncateAddress(address?: string) {
  if (!address) return null
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`
}

/**
 * @see https://www.youtube.com/watch?v=re2JFITR7TI
 */
export function cn(...args: ClassValue[]): string {
  return tailwindMerge(clsx(...args))
}

export function toBufferBigEndian(value: bigint, length: number) {
  const hex = value.toString(16).padStart(length * 2, '0')
  return Buffer.from(hex, 'hex')
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

export function hexlify(data: Buffer): `0x${string}` {
  return `0x${data.toString('hex')}`
}
