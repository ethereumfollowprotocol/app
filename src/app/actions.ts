'use server'

import { cookies } from 'next/headers'
import type { EnsProfile } from '#lib/types.ts'

export async function getEnsProfile(ensOrAddress: string) {
  const response = await fetch(`https://ens.ethfollow.xyz/u/${ensOrAddress}`, { cache: 'default' })
  const data = await response.json()
  return data as EnsProfile
}

export const readCookie = (name: string) => cookies().get(name)

export const deleteCookie = (name: string) => cookies().delete(name)
