import { useConnectedProfile } from '#/api/actions'
import { fetchUserProfile } from '#/api/requests'
import { FollowList, type FollowListProfile } from '#/components/follow-list'
import { useCart } from '#/contexts/cart-context'
import { hexlify } from '#/lib/utilities'
import { useMemo } from 'react'
import { getAddress } from 'viem'

export function UnconfirmedChanges() {
  const { profile: connectedProfile } = useConnectedProfile()
  const { cartItems } = useCart()

  // map the cart items to the FollowListProfile type
  // use the op add tag, remove tag, add list, remove list to determine the operation
  const unconfirmedProfiles = useMemo<FollowListProfile[]>(
    () =>
      cartItems.map(item => ({
        address: hexlify(item.listOp.data),
        tags: []
      })),
    [cartItems]
  )

  if (!connectedProfile) return null
  if (!cartItems.length) return null // TODO handle no items in cart

  return (
    <FollowList
      profiles={unconfirmedProfiles}
      listClassName='gap-2 p-4 rounded-xl bg-white/50'
      listItemClassName='rounded-xl p-2'
    />
  )
}
