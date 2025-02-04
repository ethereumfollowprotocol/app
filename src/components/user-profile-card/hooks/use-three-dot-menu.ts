import { useState } from 'react'
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useClickAway } from '@uidotdev/usehooks'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { listOpAddTag, listOpRemoveTag, listOpAddListRecord, listOpRemoveListRecord } from '#/utils/list-ops'
import { useCart } from '#/contexts/cart-context'
import type { FollowState } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { toast } from 'sonner'

export const useThreeDotMenu = ({ address, followState }: { address: Address; followState: FollowState }) => {
  const [threeDotMenuOpen, setThreeDotMenuOpen] = useState(false)
  const threeDotMenuRef = useClickAway<HTMLDivElement>(() => {
    setThreeDotMenuOpen(false)
  })

  const { topEight, roles } = useEFPProfile()
  const { openConnectModal } = useConnectModal()
  const { address: connectedAddress } = useAccount()
  const { addCartItem, removeCartItem, hasListOpAddTag, hasListOpRemoveTag } = useCart()

  const isPendingBlock = hasListOpAddTag({ address, tag: 'block' })
  const isPendingUnblock = hasListOpRemoveTag({ address, tag: 'block' })
  const isPendingMute = hasListOpAddTag({ address, tag: 'mute' })
  const isPendingUnmute = hasListOpRemoveTag({ address, tag: 'mute' })

  const isInTopEight = topEight.find((item) => item.address?.toLowerCase() === address.toLowerCase())
  const isAddingToTopEight = hasListOpAddTag({ address, tag: 'top8' })
  const isRemovingFromTopEight = hasListOpRemoveTag({ address, tag: 'top8' })

  const onClickOption = (buttonText: 'block' | 'mute') => {
    if (!connectedAddress && openConnectModal) {
      openConnectModal()
      return
    }

    if (!roles?.isManager) {
      toast.error('You are not the manager of this list')
      return
    }

    setThreeDotMenuOpen(false)

    if (buttonText === 'block') {
      if (isPendingBlock || isPendingUnblock) {
        if (isPendingBlock) {
          if (followState === 'none') removeCartItem(listOpAddListRecord(address))
          if (followState === 'mutes') removeCartItem(listOpRemoveTag(address, 'mute'))
        }

        if (isPendingUnblock) {
          if (followState === 'blocks') removeCartItem(listOpRemoveListRecord(address))
          if (isPendingMute && followState === 'blocks') removeCartItem(listOpAddTag(address, 'mute'))
        }
        return removeCartItem(
          followState === 'blocks' ? listOpRemoveTag(address, 'block') : listOpAddTag(address, 'block')
        )
      }

      if (followState === 'mutes') {
        addCartItem({
          listOp: listOpRemoveTag(address, 'mute'),
        })
        if (isPendingUnmute) removeCartItem(listOpRemoveListRecord(address))
      }
      if (isPendingMute) removeCartItem(listOpAddTag(address, 'mute'))
      if (followState === 'none') addCartItem({ listOp: listOpAddListRecord(address) })
      if (followState === 'blocks') addCartItem({ listOp: listOpRemoveListRecord(address) })

      addCartItem({
        listOp: followState === 'blocks' ? listOpRemoveTag(address, 'block') : listOpAddTag(address, 'block'),
      })
    }

    if (buttonText === 'mute') {
      if (isPendingMute || isPendingUnmute) {
        if (isPendingMute) {
          if (followState === 'none') removeCartItem(listOpAddListRecord(address))
          if (isPendingUnblock) removeCartItem(listOpRemoveTag(address, 'block'))
        }

        if (isPendingUnmute) {
          removeCartItem(listOpRemoveListRecord(address))
          if (followState === 'blocks') removeCartItem(listOpRemoveListRecord(address))
          if (isPendingBlock && followState === 'mutes') removeCartItem(listOpAddTag(address, 'block'))
        }

        return removeCartItem(
          followState === 'mutes' ? listOpRemoveTag(address, 'mute') : listOpAddTag(address, 'mute')
        )
      }

      if (followState === 'blocks') {
        addCartItem({
          listOp: listOpRemoveTag(address, 'block'),
        })
        if (isPendingUnblock) removeCartItem(listOpRemoveListRecord(address))
      }
      if (isPendingBlock) removeCartItem(listOpAddTag(address, 'block'))
      if (followState === 'none') addCartItem({ listOp: listOpAddListRecord(address) })
      if (followState === 'mutes') addCartItem({ listOp: listOpRemoveListRecord(address) })
      addCartItem({
        listOp: followState === 'mutes' ? listOpRemoveTag(address, 'mute') : listOpAddTag(address, 'mute'),
      })
    }
  }

  const toggleTopEight = () => {
    setThreeDotMenuOpen(false)

    if (isAddingToTopEight) return removeCartItem(listOpAddTag(address, 'top8'))
    if (isRemovingFromTopEight) return removeCartItem(listOpRemoveTag(address, 'top8'))

    if (isInTopEight)
      return addCartItem({
        listOp: listOpRemoveTag(address, 'top8'),
      })

    if (followState === 'none') addCartItem({ listOp: listOpAddListRecord(address) })
    addCartItem({ listOp: listOpAddTag(address, 'top8') })
  }

  return {
    threeDotMenuOpen,
    setThreeDotMenuOpen,
    threeDotMenuRef,
    onClickOption,
    toggleTopEight,
    isPendingBlock,
    isPendingMute,
    isInTopEight,
    isAddingToTopEight,
    isRemovingFromTopEight,
  }
}
