import { useConnectedProfile } from '#/api/actions'
import { FollowList } from '#/components/follow-list'
import { useCart } from '#/contexts/cart-context'
import { useMemo } from 'react'

export function UnconfirmedChanges() {
  const { profile: connectedProfile } = useConnectedProfile()
  const { cartItems } = useCart()
  console.log('🦄 ~ UnconfirmedChanges ~ cartItems:', cartItems)

  const unconfirmedProfiles = useMemo(
    () =>
      cartItems.map(item => ({
        address: item.listOp.data.toString('hex'),
        operation: item.listOp.opcode === 1 ? 'Add' : 'Remove'
      })),
    [cartItems]
  )
  console.log('🦄 ~ unconfirmedProfiles ~ unconfirmedProfiles:', unconfirmedProfiles)

  if (!connectedProfile) return null
  if (!cartItems) return null
  return (
    <FollowList profiles={unconfirmedProfiles} listClassName='gap-2 p-4 rounded-xl bg-white/50' />
  )
}
