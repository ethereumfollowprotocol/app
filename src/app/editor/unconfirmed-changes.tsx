import { useAccount } from 'wagmi'
import { useMemo, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { Modal } from '#/components/modal'
import { useCart } from '#/contexts/cart-context'
import { FollowList } from '#/components/follow-list'
import { PrimaryButton } from '#/components/primary-button'
import { CreateOrUpdateEFPList } from '#/app/editor/create-or-update-efp-list'

export function UnconfirmedChanges() {
  const { isConnected } = useAccount()
  const { cartItems, totalCartItems, cartAddresses } = useCart()

  const [openModal, setOpenModal] = useState(false)

  const profiles = useMemo(
    () =>
      cartAddresses.map(address => ({
        address,
        tags: []
      })),
    [cartAddresses]
  )

  if (cartItems.length === 0) return null // TODO handle no items in cart

  return (
    <>
      <FollowList
        profiles={profiles}
        listClassName='gap-2 p-4 rounded-xl bg-white/50'
        listItemClassName='rounded-xl p-2'
        showFollowsYouBadges={true}
        showTags={true}
      />
      <div className='mr-8 flex justify-end'>
        <div className='flex gap-6 p-6 bg-white rounded-xl'>
          <div className='flex gap-2 items-center'>
            <p className='text-xl font-bold'>{totalCartItems}</p>
            <div className='flex flex-col text-right'>
              <p className='font-bold'>Unconfirmed</p>
              <p className='font-bold'>Changes</p>
            </div>
          </div>

          {isConnected ? (
            <Modal
              triggerButton={<PrimaryButton label='Confirm' />}
              open={openModal}
              setOpen={setOpenModal}
            >
              <CreateOrUpdateEFPList setOpen={setOpenModal} />
            </Modal>
          ) : (
            <ConnectButton />
          )}
        </div>
      </div>
    </>
  )
}
