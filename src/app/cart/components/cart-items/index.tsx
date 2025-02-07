import type React from 'react'
import { useMemo } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

import CartItemsList from './cart-items-list'
import { useCart } from '#/hooks/use-cart'
import FarcasterIcon from 'public/assets/icons/farcaster.svg'
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
      <div className='flex justify-between gap-2 flex-row items-center px-2'>
        <h3 className='font-bold text-left text-xl sm:text-3xl xxs:w-2/3'>{t('cart unc-changes')}</h3>
        {totalCartItems > 0 && (
          <button
            className='flex gap-2 cursor-pointer hover:scale-110 transition-transform items-center hover:opacity-80'
            onClick={() => setClearCartModalOpen(true)}
          >
            <p className='font-bold text-nowrap'>{t('clear cart')}</p>
            <FiTrash2 className='text-xl' />
          </button>
        )}
      </div>
      {totalCartItems === 0 && (
        <div className='font-bold h-28 xl:h-[86vh] px-4 justify-center flex text-lg items-center italic'>
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
