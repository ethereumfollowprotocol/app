'use client'

import posthog from 'posthog-js'
import { useAccount } from 'wagmi'
import { useEffect, useRef } from 'react'

import { useEFPProfile } from '#/contexts/efp-profile-context'

export default function PostHogProfileProperties() {
  const { isConnected, address } = useAccount()
  const { stats, selectedList } = useEFPProfile()
  const last = useRef<string | null>(null)

  useEffect(() => {
    if (!posthog.__loaded) return
    if (!isConnected || !address) {
      last.current = null
      return
    }
    if (!stats) return

    const properties = {
      followers_count: stats.followers_count,
      following_count: stats.following_count,
      active_list_id: selectedList ?? null,
    }
    const key = `${address.toLowerCase()}|${JSON.stringify(properties)}`
    if (last.current === key) return
    last.current = key

    posthog.setPersonProperties(properties)
  }, [isConnected, address, stats, selectedList])

  return null
}
