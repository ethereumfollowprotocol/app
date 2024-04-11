import { FollowList } from '#/components/follow-list'
import { Modal } from '#/components/modal'
import { useCart } from '#/contexts/cart-context'
import { Box, Text } from '@radix-ui/themes'
import { useMemo, useState } from 'react'
import { CreateOrUpdateEFPList } from '#/app/editor/create-or-update-efp-list'
import { PrimaryButton } from '#/components/primary-button'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

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

  if (!cartItems.length) return null // TODO handle no items in cart

  return (
    <>
      <FollowList
        profiles={profiles}
        listClassName='gap-2 p-4 rounded-xl bg-white/50'
        listItemClassName='rounded-xl p-2'
        showFollowsYouBadges={true}
        showTags={true}
      />
      <Box className='mr-8 flex justify-end'>
        <Box className='flex gap-6 p-6 bg-white rounded-xl'>
          <Box className='flex gap-2 items-center'>
            <Text size='8' weight='bold'>
              {totalCartItems}
            </Text>
            <Box className='flex flex-col text-right'>
              <Text size='1' weight='bold'>
                Unconfirmed
              </Text>
              <Text size='1' weight='bold'>
                Changes
              </Text>
            </Box>
          </Box>

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
        </Box>
      </Box>
    </>
  )
}
