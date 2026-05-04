'use client'

import posthog from 'posthog-js'
import { useAccount } from 'wagmi'
import { useEffect, useRef } from 'react'

export default function PostHogIdentify() {
  const { address, isConnected, connector } = useAccount()
  const lastIdentified = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!posthog.__loaded) return

    if (isConnected && address) {
      const distinctId = address.toLowerCase()
      if (lastIdentified.current === distinctId) return
      posthog.identify(distinctId, {
        wallet_address: distinctId,
        wallet_connector: connector?.name,
      })
      lastIdentified.current = distinctId
      return
    }

    if (lastIdentified.current) {
      posthog.reset()
      lastIdentified.current = undefined
    }
  }, [address, isConnected, connector?.name])

  return null
}
