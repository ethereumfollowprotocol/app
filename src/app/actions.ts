'use server'

import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'
import type { EnsProfile } from '#lib/types.ts'
import { checkAddressOrEnsValid } from '#lib/utilities.ts'

export async function getEnsProfile(ensOrAddress: string) {
  checkAddressOrEnsValid(ensOrAddress)
  const response = await fetch(`https://ens.ethfollow.xyz/u/${ensOrAddress}`, { cache: 'default' })
  const data = await response.json()
  return data as EnsProfile
}

export const readCookie = (name: string) => cookies().get(name)

export const deleteCookie = (name: string) => cookies().delete(name)

export async function follow() {
  /**
   * TODO: follow logic
   */
  revalidateTag('follow-list')
}
