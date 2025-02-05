import { useState } from 'react'
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useClickAway } from '@uidotdev/usehooks'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { listOpAddTag, listOpRemoveTag, listOpAddListRecord, listOpRemoveListRecord } from '#/utils/list-ops'
import { useCart } from '#/hooks/use-cart'
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
  const { addToCart, removeFromCart, hasListOpAddTag, hasListOpRemoveTag } = useCart()

  const isPendingBlock = hasListOpAddTag(address, 'block')
  const isPendingUnblock = hasListOpRemoveTag(address, 'block')
  const isPendingMute = hasListOpAddTag(address, 'mute')
  const isPendingUnmute = hasListOpRemoveTag(address, 'mute')

  const isInTopEight = topEight.find((item) => item.address?.toLowerCase() === address.toLowerCase())
  const isAddingToTopEight = hasListOpAddTag(address, 'top8')
  const isRemovingFromTopEight = hasListOpRemoveTag(address, 'top8')

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
          if (followState === 'none') removeFromCart(listOpAddListRecord(address))
          if (followState === 'mutes') removeFromCart(listOpRemoveTag(address, 'mute'))
        }

        if (isPendingUnblock) {
          if (followState === 'blocks') removeFromCart(listOpRemoveListRecord(address))
          if (isPendingMute && followState === 'blocks') removeFromCart(listOpAddTag(address, 'mute'))
        }
        return removeFromCart(
          followState === 'blocks' ? listOpRemoveTag(address, 'block') : listOpAddTag(address, 'block')
        )
      }

      if (followState === 'mutes') {
        addToCart({
          listOp: listOpRemoveTag(address, 'mute'),
        })
        if (isPendingUnmute) removeFromCart(listOpRemoveListRecord(address))
      }
      if (isPendingMute) removeFromCart(listOpAddTag(address, 'mute'))
      if (followState === 'none') addToCart({ listOp: listOpAddListRecord(address) })
      if (followState === 'blocks') addToCart({ listOp: listOpRemoveListRecord(address) })

      addToCart({
        listOp: followState === 'blocks' ? listOpRemoveTag(address, 'block') : listOpAddTag(address, 'block'),
      })
    }

    if (buttonText === 'mute') {
      if (isPendingMute || isPendingUnmute) {
        if (isPendingMute) {
          if (followState === 'none') removeFromCart(listOpAddListRecord(address))
          if (isPendingUnblock) removeFromCart(listOpRemoveTag(address, 'block'))
        }

        if (isPendingUnmute) {
          removeFromCart(listOpRemoveListRecord(address))
          if (followState === 'blocks') removeFromCart(listOpRemoveListRecord(address))
          if (isPendingBlock && followState === 'mutes') removeFromCart(listOpAddTag(address, 'block'))
        }

        return removeFromCart(
          followState === 'mutes' ? listOpRemoveTag(address, 'mute') : listOpAddTag(address, 'mute')
        )
      }

      if (followState === 'blocks') {
        addToCart({
          listOp: listOpRemoveTag(address, 'block'),
        })
        if (isPendingUnblock) removeFromCart(listOpRemoveListRecord(address))
      }
      if (isPendingBlock) removeFromCart(listOpAddTag(address, 'block'))
      if (followState === 'none') addToCart({ listOp: listOpAddListRecord(address) })
      if (followState === 'mutes') addToCart({ listOp: listOpRemoveListRecord(address) })
      addToCart({
        listOp: followState === 'mutes' ? listOpRemoveTag(address, 'mute') : listOpAddTag(address, 'mute'),
      })
    }
  }

  const toggleTopEight = () => {
    setThreeDotMenuOpen(false)

    if (isAddingToTopEight) return removeFromCart(listOpAddTag(address, 'top8'))
    if (isRemovingFromTopEight) return removeFromCart(listOpRemoveTag(address, 'top8'))

    if (isInTopEight)
      return addToCart({
        listOp: listOpRemoveTag(address, 'top8'),
      })

    if (followState === 'none') addToCart({ listOp: listOpAddListRecord(address) })
    addToCart({ listOp: listOpAddTag(address, 'top8') })
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
