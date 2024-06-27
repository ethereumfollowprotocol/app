'use client'

import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import Pencil from 'public/assets/icons/pencil.png'

const CartButton = ({ cartItemsCount }: { cartItemsCount: number }) => {
  return (
    <Link href='/editor' passHref={true} legacyBehavior={true}>
      <div
        className={clsx(
          'glass-card border-2 h-12 justify-center items-center w-12 border-gray-300 cursor-pointer hover:opacity-80 relative flex rounded-full'
        )}
      >
        <Image src={Pencil} alt='cart button' className='text-gray-200' width='20' height='20' />
        {cartItemsCount === 0 ? null : (
          <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-400 p-2 text-xs font-bold text-black'>
            {cartItemsCount}
          </span>
        )}
      </div>
    </Link>
  )
}

export default CartButton
