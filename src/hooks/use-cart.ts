// hooks/useCart.ts
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { DAY } from '#/lib/constants'
import type { ListOp } from '#/types/list-op'
import type { ImportPlatformType } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { extractAddressAndTag, isTagListOp, listOpAddTag, listOpRemoveTag } from '#/utils/list-ops'

export type CartItemType = {
  listOp: ListOp
  import?: ImportPlatformType
}

export function useCart() {
  const queryClient = useQueryClient()

  const { address } = useAccount()
  const { listToFetch } = useEFPProfile()

  const { data: cart = [] } = useQuery<CartItemType[]>({
    queryKey: ['cart', address, listToFetch],
    staleTime: Infinity,
    gcTime: 1 * DAY,
    meta: {
      persist: true,
    },
  })

  const setCartState = (newState: CartItemType[]) => {
    queryClient.setQueryData(['cart', address, listToFetch], newState)
  }

  const setCart = (payload: CartItemType[]) => {
    setCartState(payload)
  }

  const addToCart = (payload: CartItemType[] | CartItemType) => {
    const newItems = Array.isArray(payload)
      ? payload.filter(
          (item) => !cart.some((cartItem) => cartItem.listOp.data.toLowerCase() === item.listOp.data.toLowerCase())
        )
      : [payload]
    setCartState([...cart, ...newItems])
  }

  const removeFromCart = (payload: ListOp | ListOp[]) => {
    const filteredCart = Array.isArray(payload)
      ? cart.filter((item) => !payload.some((op) => op.data.toLowerCase() === item.listOp.data.toLowerCase()))
      : cart.filter((item) => item.listOp.data.toLowerCase() !== payload.data.toLowerCase())
    setCartState(filteredCart)
  }

  const resetCart = () => {
    setCartState([])
  }

  const hasListOpAddRecord = (address: string) => {
    return cart.some((item) => item.listOp.opcode === 1 && item.listOp.data.toLowerCase() === address.toLowerCase())
  }

  const hasListOpRemoveRecord = (address: string) => {
    return cart.some((item) => item.listOp.opcode === 2 && item.listOp.data.toLowerCase() === address.toLowerCase())
  }

  const hasListOpAddTag = (address: Address, tag: string) => {
    return cart.some((item) => item.listOp.opcode === 3 && item.listOp.data === listOpAddTag(address, tag).data)
  }

  const hasListOpRemoveTag = (address: Address, tag: string) => {
    return cart.some((item) => item.listOp.opcode === 4 && item.listOp.data === listOpRemoveTag(address, tag).data)
  }

  // Retrieves all tags associated with a specific address from the cart items.
  const getTagsFromCartByAddress = useCallback(
    (address: Address): string[] => {
      return cart.reduce((tags, { listOp }) => {
        if (isTagListOp(listOp)) {
          const { address: opAddress, tag } = extractAddressAndTag(listOp)
          if (opAddress.toLowerCase() === address.toLowerCase()) {
            tags.push(tag)
          }
        }
        return tags
      }, [] as string[])
    },
    [cart]
  )

  // Retrieves all unique addresses involved in the cart items.
  const getAddressesFromCart = useCallback(
    (platform?: ImportPlatformType): Address[] => {
      const addresses = cart
        .filter((item) => item.import === platform)
        .map(({ listOp }) => listOp.data.slice(0, 42).toLowerCase() as Address)

      return [...new Set(addresses)]
    },
    [cart]
  )

  return {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    resetCart,
    hasListOpAddRecord,
    hasListOpRemoveRecord,
    hasListOpAddTag,
    hasListOpRemoveTag,
    getTagsFromCartByAddress,
    getAddressesFromCart,
  }
}
