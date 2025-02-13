'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { cn } from '#/lib/utilities'
import { useCart } from '#/hooks/use-cart'
import { formatNumber } from '#/utils/format/format-number'
import CartIcon from 'public/assets/icons/ui/cart.svg'

const CartButton = () => {
  const { cart } = useCart()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()

  return (
    <Link
      href='/cart'
      className='relative transition-transform hover:scale-110'
      onClick={(e) => {
        if (!userAddress && openConnectModal) {
          e.preventDefault()
          openConnectModal()
        }
      }}
    >
      <CartIcon className={cn('h-11 w-9')} />
      {cart.length === 0 ? null : (
        <span className='absolute -top-1.5 -right-1.5 flex h-6 w-fit min-w-6 items-center justify-center rounded-full bg-green-400 px-1 text-sm font-bold text-black sm:h-5 sm:min-w-5'>
          {formatNumber(cart.length)}
        </span>
      )}
    </Link>
  )
}

export default CartButton
