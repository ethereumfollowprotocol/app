'use server'

import { efpContracts } from '#/lib/constants/contracts.ts'
import type { ENSProfile } from '#/lib/types.ts'
import type { EVMClient } from '#/lib/viem.ts'
import * as abi from 'src/lib/abi'

export async function efpTotalSupply(client: EVMClient) {
  return await client.readContract({
    abi: abi.efpListRegistryAbi,
    functionName: 'getMintState',
    address: efpContracts['EFPListRegistry'],
    args: undefined
  })
}

export async function getEnsProfile(ensOrAddress: string) {
  // Check if the environment variable is set
  if (!process.env.NEXT_PUBLIC_ENS_API_URL) {
    throw new Error(
      "Environment variable 'NEXT_PUBLIC_ENS_API_URL' is not set. Please configure it in your environment."
    )
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_ENS_API_URL}/u/${ensOrAddress}`, {
    /**
     * TODO _PRODUCTION_CHECKLIST_:
     * This is set to `force-cache` on purpose while in development
     * Unset this or set to `default` before launch
     */
    cache: 'force-cache'
  })
  const data = await response.json()
  return data as ENSProfile
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
