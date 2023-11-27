'use server'

import { redirect } from 'next/navigation'
import { headers, cookies } from 'next/headers'
import type { ENStateResponse } from '#lib/types.ts'
import { revalidateTag, revalidatePath } from 'next/cache'
import { isAddress } from 'viem'

export async function getEnsProfile(ensOrAddress: string) {
  const path = isAddress(ensOrAddress) ? `a/${ensOrAddress}` : `n/${ensOrAddress}`
  const response = await fetch(`https://ens.ethfollow.xyz/${path}`, { cache: 'default' })
  const data = (await response.json()) as ENStateResponse
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
