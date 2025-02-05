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
  listOpRemoveListRecord,
} from '#/utils/list-ops'
import { useCart } from '#/hooks/use-cart'
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
  // | 'Subscribe'
  // | 'Subscribed'
  | 'Unblock'
  | 'Unfollow'
  | 'Unmute'
// | 'Unsubscribe'

type FollowButtonText =
  | 'Block'
  | 'Block Back'
  | 'Mute Back'
  | 'Blocked'
  | 'Follow'
  | 'Following'
  | 'Mute'
  | 'Muted'
  // | 'Subscribe'
  // | 'Subscribed'
  | 'Unblock'
  | 'Unfollow'
  | 'Unmute'
// | 'Unsubscribe'

export const useFollowButton = ({ address, isBlockedBy }: { address: Address; isBlockedBy?: boolean }) => {
  const { t } = useTranslation()

  const { roles } = useEFPProfile()
  const { address: userAddress } = useAccount()

  const { followingState: followState, isFollowingStateLoading } = useFollowingState({ address })
  const { followState: followerState } = useFollowerState({
    address,
    showFollowerBadge: isBlockedBy,
  })

  const {
    cart,
    addToCart,
    removeFromCart,
    hasListOpAddTag,
    hasListOpAddRecord,
    hasListOpRemoveTag,
    hasListOpRemoveRecord,
  } = useCart()

  const pendingState = useMemo(() => {
    if (hasListOpAddTag(address, 'block')) return 'Pending Block'
    if (hasListOpAddTag(address, 'mute')) return 'Pending Mute'
    if (hasListOpRemoveTag(address, 'block')) return 'Unblock'
    if (hasListOpRemoveTag(address, 'mute')) return 'Unmute'
    if (hasListOpAddRecord(address)) return 'Pending Following'
    if (hasListOpRemoveRecord(address)) return 'Unfollow'
  }, [address, cart])

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
      if (followState === 'mutes') removeFromCart(listOpRemoveTag(address, 'mute'))
      removeFromCart(listOpAddListRecord(address))
      removeFromCart(listOpAddTag(address, 'block'))
      return
    }
    if (buttonState === 'Unblock') {
      removeFromCart(listOpRemoveTag(address, 'block'))
      removeFromCart(listOpRemoveListRecord(address))
      return
    }

    if (buttonState === 'Pending Mute') {
      if (followState === 'blocks') removeFromCart(listOpRemoveTag(address, 'block'))
      removeFromCart(listOpAddListRecord(address))
      removeFromCart(listOpAddTag(address, 'mute'))
      return
    }
    if (buttonState === 'Unmute') {
      removeFromCart(listOpRemoveTag(address, 'mute'))
      removeFromCart(listOpRemoveListRecord(address))
      return
    }

    // remove address and tags for this address from cart if it's a pending follow
    if (buttonState === 'Pending Following') {
      const addressTags = cart.filter((item) =>
        isTagListOp(item.listOp) ? extractAddressAndTag(item.listOp).address === address : false
      )
      removeFromCart(listOpAddListRecord(address))
      addressTags.flatMap((item) => removeFromCart(item.listOp))
      return
    }
    // remove from cart if it's a pending unfollow
    if (buttonState === 'Unfollow') return removeFromCart(listOpRemoveListRecord(address))

    if (buttonState === 'Block') {
      if (followState !== 'follows') addToCart({ listOp: listOpAddListRecord(address) })
      return addToCart({ listOp: listOpAddTag(address, 'block') })
    }
    if (buttonState === 'Blocked') {
      addToCart({ listOp: listOpRemoveListRecord(address) })
      addToCart({ listOp: listOpRemoveTag(address, 'block') })
      return
    }

    if (buttonState === 'Mute') {
      if (followState !== 'follows') addToCart({ listOp: listOpRemoveListRecord(address) })
      return addToCart({ listOp: listOpRemoveTag(address, 'mute') })
    }
    if (buttonState === 'Muted') {
      addToCart({ listOp: listOpRemoveListRecord(address) })
      addToCart({ listOp: listOpRemoveTag(address, 'mute') })
      return
    }

    // add to cart if it's a follow
    if (buttonText === 'Follow') return addToCart({ listOp: listOpAddListRecord(address) })
    // add to cart if it's an unfollow
    if (buttonText === 'Following') return addToCart({ listOp: listOpRemoveListRecord(address) })
  }

  return { buttonText, buttonState, handleAction, isLoading: isFollowingStateLoading }
}
