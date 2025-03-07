// hooks/useCart.ts
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useCallback } from 'react'
import {
  EFPActionIds,
  formatListOpsTransaction,
  getListOpsFromTransaction,
  useTransactions,
  type ListOpType,
} from '@encrypteddegen/identity-kit'

import type { ListOp } from '#/types/list-op'
import type { ImportPlatformType } from '#/types/common'
import { extractAddressAndTag, isTagListOp, listOpAddTag, listOpRemoveTag } from '#/utils/list-ops'

export type CartItemType = {
  listOp: ListOp
  import?: ImportPlatformType
}

export function useCart() {
  const { address } = useAccount()

  const { pendingTxs, addListOpsTransaction, nonce, selectedChainId, removeListOpsTransaction, setPendingTxs } =
    useTransactions()

  const cart = pendingTxs
    .filter((tx) => tx.id === EFPActionIds.UpdateEFPList)
    .flatMap((tx) => getListOpsFromTransaction(tx))

  const addToCart = (payload: ListOpType[] | ListOp[]) => {
    if (!nonce || !selectedChainId || !address) return

    const tx = formatListOpsTransaction({
      listOps: payload,
      chainId: selectedChainId,
      nonce: nonce,
      connectedAddress: address,
    })

    addListOpsTransaction(tx)
  }

  const removeFromCart = (payload: ListOpType[] | ListOp[]) => {
    removeListOpsTransaction(payload.map((op) => op.data))
  }

  const resetCart = () => {
    setPendingTxs(pendingTxs.filter((tx) => tx.id !== EFPActionIds.UpdateEFPList))
  }

  const hasListOpAddRecord = (address: string) => {
    return cart.some((item) => item.opcode === 1 && item.data.toLowerCase() === address.toLowerCase())
  }

  const hasListOpRemoveRecord = (address: string) => {
    return cart.some((item) => item.opcode === 2 && item.data.toLowerCase() === address.toLowerCase())
  }

  const hasListOpAddTag = (address: Address, tag: string) => {
    return cart.some((item) => item.opcode === 3 && item.data === listOpAddTag(address, tag).data)
  }

  const hasListOpRemoveTag = (address: Address, tag: string) => {
    return cart.some((item) => item.opcode === 4 && item.data === listOpRemoveTag(address, tag).data)
  }

  // Retrieves all tags associated with a specific address from the cart items.
  const getTagsFromCartByAddress = useCallback(
    (address: Address): string[] => {
      return cart.reduce((tags, listOp) => {
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
  const getAddressesFromCart = useCallback((): Address[] => {
    const addresses = cart.map((item) => item.data.slice(0, 42).toLowerCase() as Address)

    return [...new Set(addresses)]
  }, [cart])

  return {
    cart,
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
