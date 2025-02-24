'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { cn } from '#/lib/utilities'
import { useCart } from '#/hooks/use-cart'
import { formatNumber } from '#/utils/format/format-number'
import CartIcon from 'public/assets/icons/ui/cart.svg'
import { useTranslation } from 'react-i18next'

const CartButton = () => {
  const { cart } = useCart()
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()

  if (!userAddress) return null

  return (
    <Link
      href='/cart'
      className='group/cart-button relative z-10'
      onClick={(e) => {
        if (!userAddress && openConnectModal) {
          e.preventDefault()
          openConnectModal()
        }
      }}
    >
      <div className='transition-transform hover:scale-110'>
        <CartIcon className={cn('h-8 w-8 sm:h-9 sm:w-9')} />
        {cart.length === 0 ? null : (
          <span className='absolute -top-1.5 -right-1.5 flex h-6 w-fit min-w-6 items-center justify-center rounded-full bg-green-400 px-1 text-sm font-bold text-black sm:h-5 sm:min-w-5'>
            {formatNumber(cart.length)}
          </span>
        )}
      </div>
      <div className='absolute top-1 left-[66px] hidden w-fit opacity-0 transition-all transition-discrete group-hover/cart-button:hidden group-hover/cart-button:opacity-100 sm:group-hover/cart-button:block starting:opacity-0'>
        <p className='bg-neutral shadow-small text-text rounded-sm px-4 py-2 text-lg font-semibold text-nowrap capitalize'>
          {t('cart')}
        </p>
      </div>
    </Link>
  )
}

export default CartButton
