'use server'

import { isAddress } from 'viem'
import { redirect } from 'next/navigation'
import type { EnsProfile } from '#lib/types.ts'
import { headers, cookies } from 'next/headers'
import { revalidateTag, revalidatePath } from 'next/cache'

export async function getEnsProfile(ensOrAddress: string) {
  const path = isAddress(ensOrAddress) ? `a/${ensOrAddress}` : `n/${ensOrAddress}`
  const response = await fetch(`https://ens.ethfollow.xyz/${path}`, { cache: 'default' })
  const data = (await response.json()) as EnsProfile
  return data
}

export const readCookie = (name: string) => cookies().get(name)

export const deleteCookie = (name: string) => cookies().delete(name)

export async function follow() {
  /**
   * TODO: follow logic
   */
  revalidateTag('follow-list')
}
