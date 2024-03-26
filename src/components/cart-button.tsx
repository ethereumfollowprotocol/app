'use client'

import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'
import { IconButton } from '@radix-ui/themes'
import { Pencil1Icon } from '@radix-ui/react-icons'

export function CartButton({ cartItemsCount }: { cartItemsCount: number }) {
  return (
    <Link href='/editor' passHref={true} legacyBehavior={true}>
      <IconButton
        className={clsx(
          'bg-white hover:cursor-pointer hover:opacity-100 relative flex rounded-full'
        )}
        variant='solid'
        size='3'
      >
        <Pencil1Icon className='text-zinc-700' width='18' height='18' />
        {cartItemsCount === 0 ? null : (
          <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 p-2 text-xs font-bold text-white'>
            {cartItemsCount}
          </span>
        )}
      </IconButton>
    </Link>
  )
}

export default CartButton
