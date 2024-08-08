'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import Cart from 'public/assets/icons/cart.svg'
import { formatNumber } from '#/utils/formatNumber'

const CartButton = ({ cartItemsCount }: { cartItemsCount: number }) => {
  const pathname = usePathname()
  return (
    <Link href='/editor' passHref={true} legacyBehavior={true}>
      <div
        className={`glass-card border-2 h-[48px] group justify-center items-center w-[48px] border-darkGrey transition-all cursor-pointer hover:border-opacity-100 relative flex rounded-full ${
          pathname === '/editor' ? 'border-opacity-100' : 'border-opacity-40'
        }`}
      >
        <Image
          src={Cart}
          alt='cart button'
          width='22'
          className={`${
            pathname === '/editor' ? 'opacity-100' : 'opacity-40'
          } group-hover:opacity-100 transition-opacity`}
        />
        {cartItemsCount === 0 ? null : (
          <span className='absolute -right-1.5 -top-1.5 flex h-5 w-fit min-w-5 items-center px-0.5 justify-center rounded-full bg-green-400 text-xs font-bold text-black'>
            {formatNumber(cartItemsCount)}
          </span>
        )}
      </div>
    </Link>
  )
}

export default CartButton
