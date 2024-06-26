import { toast } from 'sonner'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'

import {
  isTagListOp,
  listOpAddListRecord,
  extractAddressAndTag,
  listOpRemoveListRecord,
  listOpRemoveTag
} from '#/utils/list-ops'
import { useCart } from '#/contexts/cart-context'
import useFollowState from '#/hooks/use-follow-state'
import { useEFPProfile } from '#/contexts/efp-profile-context'

export type FollowButtonState =
  | 'Block'
  | 'Blocked'
  | 'Follow'
  | 'Following'
  | 'Mute'
  | 'Muted'
  | 'Pending Following'
  | 'Pending Block'
  | 'Pending Mute'
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

export const useFollowButton = ({ address }: { address: Address }) => {
  const { roles } = useEFPProfile()
  const { address: userAddress } = useAccount()
  const { followState, isFollowStateLoading } = useFollowState({
    address,
    type: 'followings'
  })
  const { t } = useTranslation('common', { keyPrefix: 'follow btn' })
  const {
    hasListOpAddRecord,
    hasListOpRemoveRecord,
    hasListOpAddTag,
    hasListOpRemoveTag,
    addCartItem,
    removeCartItem,
    removeAddTagFromCart,
    removeRemoveTagFromCart,
    cartItems
  } = useCart()

  const isPendingBlock = useMemo(
    () => hasListOpAddTag({ address, tag: 'block' }),
    [hasListOpAddTag, address]
  )
  const isPendingUnblock = useMemo(
    () => hasListOpRemoveTag({ address, tag: 'block' }),
    [hasListOpRemoveTag, address]
  )
  const isPendingMute = useMemo(
    () => hasListOpAddTag({ address, tag: 'mute' }),
    [hasListOpAddTag, address]
  )
  const isPendingUnmute = useMemo(
    () => hasListOpRemoveTag({ address, tag: 'mute' }),
    [hasListOpRemoveTag, address]
  )
  const isPendingFollow = useMemo(() => hasListOpAddRecord(address), [hasListOpAddRecord, address])
  const isPendingUnfollow = useMemo(
    () => hasListOpRemoveRecord(address),
    [hasListOpRemoveRecord, address]
  )

  const buttonState = useMemo<FollowButtonState>(() => {
    if (!userAddress) return 'Follow'

    if (isPendingBlock) return 'Pending Block'
    if (isPendingUnblock) return 'Unblock'
    if (isPendingMute) return 'Pending Mute'
    if (isPendingUnmute) return 'Unmute'
    if (isPendingFollow) return 'Pending Following'
    if (isPendingUnfollow) return 'Unfollow'

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
  }, [
    isPendingBlock,
    isPendingUnblock,
    isPendingMute,
    isPendingUnmute,
    isPendingFollow,
    isPendingUnfollow,
    followState,
    userAddress
  ])

  const buttonText = useMemo<FollowButtonText>(() => {
    if (!userAddress) return 'Follow'

    if (isPendingBlock) return 'Blocked'
    if (isPendingUnblock) return 'Unblock'
    if (isPendingMute) return 'Muted'
    if (isPendingUnmute) return 'Unmute'
    if (isPendingFollow) return 'Following'
    if (isPendingUnfollow) return 'Unfollow'

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
  }, [
    isPendingBlock,
    isPendingUnblock,
    isPendingMute,
    isPendingUnmute,
    followState,
    isPendingFollow,
    isPendingUnfollow,
    userAddress
  ])

  const handleAction = () => {
    // cannot perform list operations if not list manager
    if (!roles?.isManager) return toast.error(t('not manager'))

    if (isPendingBlock) {
      removeCartItem(listOpAddListRecord(address))
      removeAddTagFromCart({ address, tag: 'block' })
      return
    }

    if (isPendingUnblock) {
      removeRemoveTagFromCart({ address, tag: 'block' })
      return
    }

    if (isPendingMute) {
      removeCartItem(listOpAddListRecord(address))
      removeAddTagFromCart({ address, tag: 'mute' })
      return
    }

    if (isPendingUnmute) {
      removeRemoveTagFromCart({ address, tag: 'mute' })
      return
    }

    // remove address and tags for this address from cart if it's a pending follow
    if (isPendingFollow) {
      const addressTags = cartItems.filter(item =>
        item.listOp.opcode > 2 && isTagListOp(item.listOp)
          ? extractAddressAndTag(item.listOp).address === address
          : false
      )
      removeCartItem(listOpAddListRecord(address))
      addressTags.flatMap(item => removeCartItem(item.listOp))
      return
    }

    // remove from cart if it's a pending unfollow
    if (isPendingUnfollow) return removeCartItem(listOpRemoveListRecord(address))

    if (buttonText === 'Block') {
      if (followState !== 'follows') addCartItem({ listOp: listOpRemoveListRecord(address) })
      return addCartItem({ listOp: listOpRemoveTag(address, 'block') })
    }
    if (buttonText === 'Blocked') {
      // addCartItem({ listOp: listOpRemoveListRecord(address) })
      return addCartItem({ listOp: listOpRemoveTag(address, 'block') })
    }

    if (buttonText === 'Mute') {
      if (followState !== 'follows') addCartItem({ listOp: listOpRemoveListRecord(address) })
      return addCartItem({ listOp: listOpRemoveTag(address, 'mute') })
    }
    if (buttonText === 'Muted') {
      // addCartItem({ listOp: listOpRemoveListRecord(address) })
      return addCartItem({ listOp: listOpRemoveTag(address, 'mute') })
    }

    // add to cart if it's a follow
    if (buttonText === 'Follow') return addCartItem({ listOp: listOpAddListRecord(address) })
    // add to cart if it's an unfollow
    if (buttonText === 'Following') return addCartItem({ listOp: listOpRemoveListRecord(address) })
  }

  return { buttonText, buttonState, handleAction, isLoading: isFollowStateLoading }
}
