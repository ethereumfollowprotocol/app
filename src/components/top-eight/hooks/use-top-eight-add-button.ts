import type { Address } from 'viem'
import { useCart } from '#/hooks/use-cart'
import { listOpAddListRecord, listOpAddTag, listOpRemoveTag } from '#/utils/list-ops'
import { useFollowButton } from '@encrypteddegen/identity-kit'

export const useTopEightAddButton = (profileAddress: Address, tags: string[]) => {
  const { buttonState } = useFollowButton({ lookupAddress: profileAddress })
  const { addToCart, removeFromCart, hasListOpAddTag, hasListOpRemoveTag } = useCart()

  const isFollowing = buttonState === 'Following'
  const isPendingFollow = buttonState === 'Pending Following'
  const isPendingTopEight = (isFollowing || isPendingFollow) && hasListOpAddTag(profileAddress, 'top8')
  const isPendingRemove = hasListOpRemoveTag(profileAddress, 'top8')
  const isInTopEight = !isPendingRemove && tags.includes('top8')

  const handleAdd = () => {
    if (isPendingTopEight || isPendingRemove) {
      removeFromCart([
        isPendingTopEight ? listOpAddTag(profileAddress, 'top8') : listOpRemoveTag(profileAddress, 'top8'),
      ])
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
