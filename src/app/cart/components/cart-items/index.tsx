import type React from 'react'
import { useMemo } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

import CartItemsList from './cart-items-list'
import { useCart } from '#/hooks/use-cart'
import FarcasterIcon from 'public/assets/icons/socials/farcaster.svg?url'
import { useEFPProfile } from '#/contexts/efp-profile-context'

interface CartItemsProps {
  setClearCartModalOpen: (open: boolean) => void
  containerRef: React.RefObject<HTMLDivElement | null>
}

const CartItems = ({ setClearCartModalOpen, containerRef }: CartItemsProps) => {
  const { t } = useTranslation()
  const { selectedList } = useEFPProfile()
  const { cart, getAddressesFromCart } = useCart()

  const hasCreatedEfpList = !!selectedList
  const totalCartItems = cart.length
  const cartAddresses = useMemo(() => getAddressesFromCart(), [cart])
  const socialAddresses = useMemo(() => getAddressesFromCart('farcaster'), [cart])

  const profiles = useMemo(() => {
    return cartAddresses.map((address) => ({
      address,
      tags: [],
    }))
  }, [cartAddresses])

  const socialProfiles = [
    {
      platform: 'farcaster',
      profiles: socialAddresses.map((address) => ({
        address,
        tags: [],
      })),
      icon: FarcasterIcon,
    },
    // {
    //   platform: 'lens',
    //   profiles: socialAddresses.lens.map(address => ({
    //     address,
    //     tags: []
    //   })),
    //   icon: LensIcon
    // }
  ]

  return (
    <>
      <div className='flex flex-row items-center justify-between gap-2 px-2'>
        <h3 className='xxs:w-2/3 text-left text-xl font-bold sm:text-3xl'>{t('cart unc-changes')}</h3>
        {totalCartItems > 0 && (
          <button
            className='flex cursor-pointer items-center gap-2 transition-transform hover:scale-110 hover:opacity-80'
            onClick={() => setClearCartModalOpen(true)}
          >
            <p className='font-bold text-nowrap'>{t('clear cart')}</p>
            <FiTrash2 className='text-xl' />
          </button>
        )}
      </div>
      {totalCartItems === 0 && (
        <div className='flex h-28 items-center justify-center px-4 text-lg font-bold italic xl:h-[86vh]'>
          {t('empty cart')}
        </div>
      )}
      <CartItemsList
        containerRef={containerRef}
        isLoading={false}
        profiles={profiles}
        socialProfiles={socialProfiles}
        listClassName='rounded-xl gap-1 2xl:gap-0'
        createListItem={!hasCreatedEfpList}
      />
    </>
  )
}

export default CartItems
