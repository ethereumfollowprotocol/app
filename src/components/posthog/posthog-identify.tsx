'use client'

import posthog from 'posthog-js'
import { useAccount } from 'wagmi'
import { useEffect, useRef } from 'react'

export default function PostHogIdentify() {
  const { address, isConnected, connector } = useAccount()
  const lastAddress = useRef<string | undefined>(undefined)
  const lastConnector = useRef<string | undefined>(undefined)

  useEffect(() => {
    const run = () => {
      if (isConnected && address) {
        const distinctId = address.toLowerCase()
        const connectorName = connector?.name
        const phId = posthog.get_distinct_id?.()
        const needsIdentify = lastAddress.current !== distinctId || phId !== distinctId

        if (needsIdentify) {
          if (lastAddress.current && lastAddress.current !== distinctId) {
            posthog.reset()
          }
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
    }

    if (posthog.__loaded) {
      run()
      return
    }

    const off = posthog.onFeatureFlags(() => {
      off?.()
      run()
    })
    return () => off?.()
  }, [address, isConnected, connector?.name])

  return null
}
