// hooks/useCart.ts
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { ImportPlatformType } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import type { ListOp, ListOpTagOpParams } from '#/types/list-op'
import { extractAddressAndTag, isTagListOp, listOpAddTag, listOpRemoveTag } from '#/utils/list-ops'
import { DAY } from '#/lib/constants'

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

  const addToCart = (payload: CartItemType) => {
    const alreadyExists = cart.some((item) => item.listOp.data.toLowerCase() === payload.listOp.data.toLowerCase())
    if (alreadyExists) return

    setCartState([...cart, payload])
  }

  const addAddTagToCart = (payload: ListOpTagOpParams) => {
    const newOp = listOpAddTag(payload.address, payload.tag)
    const exists = cart.some(
      (item) => item.listOp.opcode === 3 && item.listOp.data.toLowerCase() === newOp.data.toLowerCase()
    )
    if (exists) return

    setCartState([...cart, { listOp: newOp }])
  }

  const addRemoveTagToCart = (payload: ListOpTagOpParams) => {
    const newOp = listOpRemoveTag(payload.address, payload.tag)
    const exists = cart.some(
      (item) => item.listOp.opcode === 4 && item.listOp.data.toLowerCase() === newOp.data.toLowerCase()
    )
    if (exists) return

    setCartState([...cart, { listOp: newOp }])
  }

  const removeFromCart = (payload: ListOp) => {
    setCartState(cart.filter((item) => item.listOp.data.toLowerCase() !== payload.data.toLowerCase()))
  }

  const resetCart = () => {
    setCartState([])
  }

  const hasListOpAddRecord = (address: string) => {
    return cart.some((item) => item.listOp.opcode === 1 && item.listOp.data === address)
  }

  const hasListOpRemoveRecord = (address: string) => {
    return cart.some((item) => item.listOp.opcode === 2 && item.listOp.data === address)
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
    addAddTagToCart,
    addRemoveTagToCart,
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
