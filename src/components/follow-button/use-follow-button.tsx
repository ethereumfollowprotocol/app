import { useCart } from '#/contexts/cart-context'
import { listOpAddListRecord, listOpRemoveListRecord } from '#/types/list-op'
import { useFollowState } from '#/hooks/use-follow-state'
import { useMemo } from 'react'
import type { Address } from 'viem'

export type FollowButtonState =
  | 'Block'
  | 'Blocked'
  | 'Follow'
  | 'Following'
  | 'Mute'
  | 'Muted'
  | 'Pending Following'
  | 'Pending Unfollow'
  | 'Subscribe'
  | 'Subscribed'
  | 'Unblock'
  | 'Unfollow'
  | 'Unmute'
  | 'Unsubscribe'

type FollowButtonText =
  | 'Block'
  | 'Blocked'
  | 'Follow'
  | 'Following'
  | 'Mute'
  | 'Muted'
  | 'Subscribe'
  | 'Subscribed'
  | 'Unblock'
  | 'Unfollow'
  | 'Unmute'
  | 'Unsubscribe'

export const useFollowButton = ({
  address
}: {
  address: Address
}) => {
  const followState = useFollowState(address)
  const { hasListOpAddRecord, hasListOpRemoveRecord, addCartItem, removeCartItem } = useCart()

  const isPendingFollow = useMemo(() => hasListOpAddRecord(address), [hasListOpAddRecord, address])
  const isPendingUnfollow = useMemo(
    () => hasListOpRemoveRecord(address),
    [hasListOpRemoveRecord, address]
  )

  const buttonState = useMemo<FollowButtonState>(() => {
    if (isPendingFollow) return 'Pending Following'
    if (isPendingUnfollow) return 'Pending Unfollow'
    switch (followState) {
      case 'follows':
        return 'Following'
      case 'blocks':
        return 'Blocked'
      case 'mutes':
        return 'Muted'
      default:
        return 'Follow'
    }
  }, [isPendingFollow, isPendingUnfollow, followState])

  const buttonText = useMemo<FollowButtonText>(() => {
    if (isPendingFollow) return 'Following'
    if (isPendingUnfollow) return 'Unfollow'

    switch (followState) {
      case 'follows':
        return 'Following'
      case 'blocks':
        return 'Unblock'
      case 'mutes':
        return 'Unmute'
      default:
        return 'Follow'
    }
  }, [followState, isPendingFollow, isPendingUnfollow])

  const handleAction = () => {
    // remove from cart if it's a pending follow
    if (isPendingFollow) {
      return removeCartItem(listOpAddListRecord(address))
    }

    // remove from cart if it's a pending unfollow
    if (isPendingUnfollow) {
      return removeCartItem(listOpRemoveListRecord(address))
    }

    // add to cart if it's a follow
    if (buttonText === 'Follow') {
      return addCartItem({ listOp: listOpAddListRecord(address) })
    }

    // add to cart if it's an unfollow
    if (buttonText === 'Unfollow') {
      return addCartItem({ listOp: listOpRemoveListRecord(address) })
    }
  }

  return { buttonText, buttonState, handleAction }
}
