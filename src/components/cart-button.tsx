'use client'

import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'
import Image from 'next/image'
import Pencil from 'public/assets/common/pencil.png'

export function CartButton({ cartItemsCount }: { cartItemsCount: number }) {
  return (
    <Link href='/editor' passHref={true} legacyBehavior={true}>
      <div
        className={clsx(
          ' glass-card border-2 h-12 justify-center items-center w-12 border-grey cursor-pointer hover:opacity-80 relative flex rounded-full'
        )}
      >
        <Image src={Pencil} alt='cart button' className='text-zinc-700' width='20' height='20' />
        {cartItemsCount === 0 ? null : (
          <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 p-2 text-xs font-bold text-white'>
            {cartItemsCount}
          </span>
        )}
      </div>
    </Link>
  )
}

export default CartButton
