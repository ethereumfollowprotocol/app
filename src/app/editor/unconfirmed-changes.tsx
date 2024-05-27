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
        listClassName='gap-4 rounded-xl '
        listItemClassName='rounded-xl p-4 hover:bg-white/80'
        showFollowsYouBadges={true}
        showTags={true}
      />
      <div className='flex justify-end'>
        <div className='flex gap-6 items-center p-4 glass-card bg-opacity-50 shadow-lg rounded-xl'>
          <div className='flex gap-2 items-center'>
            <p className='text-6xl font-bold'>{totalCartItems}</p>
            <div className='flex flex-col text-lg text-left'>
              <p className='font-bold'>Unconfirmed</p>
              <p className='font-bold'>Changes</p>
            </div>
          </div>

          {isConnected ? (
            <Modal
              triggerButton={
                <PrimaryButton
                  className='py-[14px] px-4 text-xl font-medium rounded-full'
                  onClick={() => setOpenModal(true)}
                  label='Confirm'
                />
              }
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
