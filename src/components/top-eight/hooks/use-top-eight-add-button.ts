import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useFollowButton } from '@encrypteddegen/identity-kit'

import { useCart } from '#/hooks/use-cart'
import { listOpAddListRecord, listOpAddTag, listOpRemoveListRecord, listOpRemoveTag } from '#/utils/list-ops'

export const useTopEightAddButton = (profileAddress: Address, tags: string[]) => {
  const { address: connectedAddress } = useAccount()
  const { buttonState } = useFollowButton({ lookupAddress: profileAddress, connectedAddress })
  const { addToCart, removeFromCart, hasListOpAddTag, hasListOpRemoveTag } = useCart()

  const isFollowing = buttonState === 'Following'
  const isPendingFollow = buttonState === 'Pending Following'
  const isPendingUnfollow = buttonState === 'Unfollow'
  const isPendingTopEight =
    (isFollowing || isPendingFollow || isPendingUnfollow) && hasListOpAddTag(profileAddress, 'top8')
  const isPendingRemove = hasListOpRemoveTag(profileAddress, 'top8') || (isPendingUnfollow && tags.includes('top8'))
  const isInTopEight = !isPendingRemove && tags.includes('top8')

  const handleAdd = () => {
    if (isPendingUnfollow) {
      removeFromCart([listOpRemoveListRecord(profileAddress)])
      if (!tags.includes('top8')) addToCart([listOpAddTag(profileAddress, 'top8')])
    } else if (isPendingTopEight || isPendingRemove) {
      const itemsToRemove = [
        isPendingTopEight ? listOpAddTag(profileAddress, 'top8') : listOpRemoveTag(profileAddress, 'top8'),
      ]
      if (isPendingUnfollow) {
        if (tags.includes('top8')) addToCart([listOpAddTag(profileAddress, 'top8')])
        itemsToRemove.push(listOpRemoveListRecord(profileAddress))
      }
      removeFromCart(itemsToRemove)
    } else if (isFollowing || isPendingFollow) {
      if (isInTopEight) {
        addToCart([listOpRemoveTag(profileAddress, 'top8')])
      } else {
        addToCart([listOpAddTag(profileAddress, 'top8')])
      }
    } else {
      addToCart([listOpAddListRecord(profileAddress), listOpAddTag(profileAddress, 'top8')])
    }
  }

  return {
    isPendingTopEight,
    isPendingRemove,
    isInTopEight,
    handleAdd,
  }
}
