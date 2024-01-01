'use server'

import type { EnsProfile } from '#lib/types.ts'

export async function getEnsProfile(ensOrAddress: string) {
  const response = await fetch(`https://ens.ethfollow.xyz/u/${ensOrAddress}`, { cache: 'default' })
  const data = await response.json()
  return data as EnsProfile
}

/**
 * @param requestedFrom - The path of the page that requested draft mode to be enabled.
 * Used for redirecting back to the page after draft mode is enabled.
 */
export async function toggleDraftMode({
  state,
  requestedFrom
}: {
  requestedFrom: string
  state: 'enable' | 'disable'
}) {
  const searchParams = new URLSearchParams({ requestedFrom })
  const response = await fetch(`/api/draft/${state}?${searchParams}`, { method: 'GET' })
  const data = await response.text()
  return data
}
