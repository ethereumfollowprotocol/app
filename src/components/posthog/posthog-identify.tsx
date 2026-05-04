'use client'

import posthog from 'posthog-js'
import { useAccount } from 'wagmi'
import { useEffect, useRef } from 'react'

export default function PostHogIdentify() {
  const { address, isConnected, connector } = useAccount()
  const lastAddress = useRef<string | undefined>(undefined)
  const lastConnector = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!posthog.__loaded) return

    if (isConnected && address) {
      const distinctId = address.toLowerCase()
      const connectorName = connector?.name

      if (lastAddress.current !== distinctId) {
        if (lastAddress.current) posthog.reset()
        posthog.identify(distinctId, {
          wallet_address: distinctId,
          wallet_connector: connectorName,
        })
        lastAddress.current = distinctId
        lastConnector.current = connectorName
        return
      }

      if (lastConnector.current !== connectorName) {
        posthog.setPersonProperties({ wallet_connector: connectorName })
        lastConnector.current = connectorName
      }
      return
    }

    if (lastAddress.current) {
      posthog.reset()
      lastAddress.current = undefined
      lastConnector.current = undefined
    }
  }, [address, isConnected, connector?.name])

  return null
}
