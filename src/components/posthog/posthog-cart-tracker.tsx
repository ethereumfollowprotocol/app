'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useTransactions } from 'ethereum-identity-kit'

import { track } from '#/lib/analytics'
import { useCart } from '#/hooks/use-cart'

type CartBreakdown = {
  cart_size: number
  follows: number
  unfollows: number
  tag_adds: number
  tag_removes: number
}

export default function PostHogCartTracker() {
  const { cart } = useCart()
  const { isCheckoutFinished } = useTransactions()

  const breakdown = useMemo<CartBreakdown>(() => {
    let follows = 0
    let unfollows = 0
    let tag_adds = 0
    let tag_removes = 0
    for (const op of cart) {
      if (op.opcode === 1) follows++
      else if (op.opcode === 2) unfollows++
      else if (op.opcode === 3) tag_adds++
      else if (op.opcode === 4) tag_removes++
    }
    return { cart_size: cart.length, follows, unfollows, tag_adds, tag_removes }
  }, [cart])

  const lastNonEmpty = useRef<CartBreakdown | null>(null)
  useEffect(() => {
    if (cart.length > 0) lastNonEmpty.current = breakdown
  }, [cart.length, breakdown])

  const wasFinished = useRef(false)
  useEffect(() => {
    if (isCheckoutFinished && !wasFinished.current && lastNonEmpty.current) {
      track('cart_submitted', { ...lastNonEmpty.current })
    }
    wasFinished.current = isCheckoutFinished
  }, [isCheckoutFinished])

  return null
}
