'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import Cart from 'public/assets/icons/cart.png'
import { formatNumber } from '#/utils/formatNumber'

const CartButton = ({ cartItemsCount }: { cartItemsCount: number }) => {
  const pathname = usePathname()
  return (
    <Link href='/cart' passHref={true} legacyBehavior={true}>
      <div
        className={`glass-card border-[3px] h-[48px] group justify-center items-center w-[48px] border-darkGrey transition-all cursor-pointer hover:border-opacity-100 hover:scale-110 relative flex rounded-full ${
          pathname === '/cart' ? 'border-opacity-100 hover:scale-100' : 'border-opacity-40'
        }`}
      >
        <Image
          src={Cart}
          alt='cart button'
          width='22'
          className={`${
            pathname === '/cart' ? 'opacity-100' : 'opacity-40'
          } group-hover:opacity-100 transition-opacity -translate-x-px`}
        />
        {cartItemsCount === 0 ? null : (
          <span className='absolute -right-3 sm:-right-[14px] -top-3 sm:-top-[14px] flex h-6 sm:h-7 w-fit min-w-6 sm:min-w-7 items-center px-1 justify-center rounded-full bg-green-400 text-sm font-bold text-black'>
            {formatNumber(cartItemsCount)}
          </span>
        )}
      </div>
    </Link>
  )
}

export default CartButton
