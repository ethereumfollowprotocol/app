import { toast } from 'sonner'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useClickAway } from '@uidotdev/usehooks'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { useCart } from '#/hooks/use-cart'
import type { FollowState } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { listOpAddTag, listOpRemoveTag, listOpAddListRecord, listOpRemoveListRecord } from '#/utils/list-ops'

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
        const removeItems = [
          followState === 'blocks' ? listOpRemoveTag(address, 'block') : listOpAddTag(address, 'block'),
        ]
        if (isPendingBlock) {
          if (followState === 'none') removeItems.push(listOpAddListRecord(address))
          if (followState === 'mutes') removeItems.push(listOpRemoveTag(address, 'mute'))
        }

        if (isPendingUnblock) {
          if (followState === 'blocks') removeItems.push(listOpRemoveListRecord(address))
          if (isPendingMute && followState === 'blocks') removeItems.push(listOpAddTag(address, 'mute'))
        }

        return removeFromCart(removeItems)
      }

      const addItems = [followState === 'blocks' ? listOpRemoveTag(address, 'block') : listOpAddTag(address, 'block')]
      if (followState === 'mutes') {
        addItems.push(listOpRemoveTag(address, 'mute'))
        if (isPendingUnmute) removeFromCart([listOpRemoveListRecord(address)])
      }
      if (isPendingMute) removeFromCart([listOpAddTag(address, 'mute')])
      if (followState === 'none') addItems.push(listOpAddListRecord(address))
      if (followState === 'blocks') addItems.push(listOpRemoveListRecord(address))

      addToCart(addItems)
    }

    if (buttonText === 'mute') {
      if (isPendingMute || isPendingUnmute) {
        const removeItems = [followState === 'mutes' ? listOpRemoveTag(address, 'mute') : listOpAddTag(address, 'mute')]
        if (isPendingMute) {
          if (followState === 'none') removeItems.push(listOpAddListRecord(address))
          if (isPendingUnblock) removeItems.push(listOpRemoveTag(address, 'block'))
        }

        if (isPendingUnmute) {
          removeItems.push(listOpRemoveListRecord(address))
          if (followState === 'blocks') removeItems.push(listOpRemoveListRecord(address))
          if (isPendingBlock && followState === 'mutes') removeItems.push(listOpAddTag(address, 'block'))
        }

        return removeFromCart(removeItems)
      }

      const addItems = [followState === 'mutes' ? listOpRemoveTag(address, 'mute') : listOpAddTag(address, 'mute')]
      if (followState === 'blocks') {
        addItems.push(listOpRemoveTag(address, 'block'))
        if (isPendingUnblock) removeFromCart([listOpRemoveListRecord(address)])
      }
      if (isPendingBlock) removeFromCart([listOpAddTag(address, 'block')])
      if (followState === 'none') addItems.push(listOpAddListRecord(address))
      if (followState === 'mutes') addItems.push(listOpRemoveListRecord(address))

      addToCart(addItems)
    }
  }

  const toggleTopEight = () => {
    setThreeDotMenuOpen(false)

    if (isAddingToTopEight) return removeFromCart([listOpAddTag(address, 'top8')])
    if (isRemovingFromTopEight) return removeFromCart([listOpRemoveTag(address, 'top8')])

    if (isInTopEight) return addToCart([listOpRemoveTag(address, 'top8')])

    const addItems = [listOpAddTag(address, 'top8')]
    if (followState === 'none') addItems.push(listOpAddListRecord(address))
    addToCart(addItems)
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
