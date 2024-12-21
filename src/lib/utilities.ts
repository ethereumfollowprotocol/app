import { type ClassValue, clsx } from 'clsx'
import { twMerge as tailwindMerge } from 'tailwind-merge'

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

export function hexlify(data: Buffer): `0x${string}` {
  return `0x${data.toString('hex')}`
}
