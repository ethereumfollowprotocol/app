'use client'

import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import Cart from 'public/assets/icons/cart.svg'

const CartButton = ({ cartItemsCount }: { cartItemsCount: number }) => {
  return (
    <Link href='/editor' passHref={true} legacyBehavior={true}>
      <div
        className={clsx(
          'glass-card border-2 h-[48px] justify-center items-center w-[48px] border-gray-200 cursor-pointer hover:opacity-80 relative flex rounded-full'
        )}
      >
        <Image src={Cart} alt='cart button' className='text-gray-200' width='22' />
        {cartItemsCount === 0 ? null : (
          <span className='absolute -right-1.5 -top-1.5 flex h-5 w-fit min-w-5 items-center px-0.5 justify-center rounded-full bg-green-400 text-xs font-bold text-black'>
            {cartItemsCount}
          </span>
        )}
      </div>
    </Link>
  )
}

export default CartButton
