import { toast } from 'sonner'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'

import {
  isTagListOp,
  listOpAddTag,
  listOpRemoveTag,
  listOpAddListRecord,
  extractAddressAndTag,
  listOpRemoveListRecord
} from '#/utils/list-ops'
import { useCart } from '#/contexts/cart-context'
import useFollowerState from '#/hooks/use-follower-state'
import useFollowingState from '#/hooks/use-following-state'
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
  | 'Block Back'
  | 'Mute Back'
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
  address,
  isBlockedBy
}: { address: Address; isBlockedBy?: boolean }) => {
  const { roles } = useEFPProfile()
  const { address: userAddress } = useAccount()
  const { followingState: followState, isFollowingStateLoading } = useFollowingState({ address })
  const { followState: followerState } = useFollowerState({
    address,
    showFollowerBadge: isBlockedBy
  })
  const { t } = useTranslation()
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

  const pendingState = useMemo(() => {
    if (hasListOpAddTag({ address, tag: 'block' })) return 'Pending Block'
    if (hasListOpAddTag({ address, tag: 'mute' })) return 'Pending Mute'
    if (hasListOpRemoveTag({ address, tag: 'block' })) return 'Unblock'
    if (hasListOpRemoveTag({ address, tag: 'mute' })) return 'Unmute'
    if (hasListOpAddRecord(address)) return 'Pending Following'
    if (hasListOpRemoveRecord(address)) return 'Unfollow'
  }, [address, cartItems])

  const buttonState = useMemo<FollowButtonState>(() => {
    if (!userAddress) return 'Follow'
    if (pendingState) return pendingState

    if (followState === 'none' && followerState === 'blocks' && isBlockedBy) return 'Block'
    if (followState === 'none' && followerState === 'mutes' && isBlockedBy) return 'Mute'

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
  }, [pendingState, followState, userAddress, followerState])

  const buttonText = useMemo<FollowButtonText>(() => {
    if (!userAddress) return 'Follow'

    if (pendingState === 'Pending Block') return 'Blocked'
    if (pendingState === 'Pending Mute') return 'Muted'
    if (pendingState === 'Pending Following') return 'Following'
    if (pendingState) return pendingState

    if (followState === 'none' && followerState === 'blocks' && isBlockedBy) return 'Block Back'
    if (followState === 'none' && followerState === 'mutes' && isBlockedBy) return 'Mute Back'

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
  }, [pendingState, followState, userAddress, followerState])

  const handleAction = () => {
    // cannot perform list operations if not list manager
    if (!roles?.isManager) return toast.error(t('not manager'))

    if (buttonState === 'Pending Block') {
      if (followState === 'mutes') removeCartItem(listOpRemoveTag(address, 'mute'))
      removeCartItem(listOpAddListRecord(address))
      removeAddTagFromCart({ address, tag: 'block' })
      return
    }
    if (buttonState === 'Unblock') {
      removeRemoveTagFromCart({ address, tag: 'block' })
      removeCartItem(listOpRemoveListRecord(address))
      return
    }

    if (buttonState === 'Pending Mute') {
      if (followState === 'blocks') removeCartItem(listOpRemoveTag(address, 'block'))
      removeCartItem(listOpAddListRecord(address))
      removeAddTagFromCart({ address, tag: 'mute' })
      return
    }
    if (buttonState === 'Unmute') {
      removeRemoveTagFromCart({ address, tag: 'mute' })
      removeCartItem(listOpRemoveListRecord(address))
      return
    }

    // remove address and tags for this address from cart if it's a pending follow
    if (buttonState === 'Pending Following') {
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
    if (buttonState === 'Unfollow') return removeCartItem(listOpRemoveListRecord(address))

    if (buttonState === 'Block') {
      if (followState !== 'follows') addCartItem({ listOp: listOpAddListRecord(address) })
      return addCartItem({ listOp: listOpAddTag(address, 'block') })
    }
    if (buttonState === 'Blocked') {
      addCartItem({ listOp: listOpRemoveListRecord(address) })
      addCartItem({ listOp: listOpRemoveTag(address, 'block') })
      return
    }

    if (buttonState === 'Mute') {
      if (followState !== 'follows') addCartItem({ listOp: listOpRemoveListRecord(address) })
      return addCartItem({ listOp: listOpRemoveTag(address, 'mute') })
    }
    if (buttonState === 'Muted') {
      addCartItem({ listOp: listOpRemoveListRecord(address) })
      addCartItem({ listOp: listOpRemoveTag(address, 'mute') })
      return
    }

    // add to cart if it's a follow
    if (buttonText === 'Follow') return addCartItem({ listOp: listOpAddListRecord(address) })
    // add to cart if it's an unfollow
    if (buttonText === 'Following') return addCartItem({ listOp: listOpRemoveListRecord(address) })
  }

  return { buttonText, buttonState, handleAction, isLoading: isFollowingStateLoading }
}
