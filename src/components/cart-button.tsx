'use client'

import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'
import { IconButton } from '@radix-ui/themes'
import { Pencil1Icon } from '@radix-ui/react-icons'

export function CartButton(props: { cartItemsCount: number; disabled?: boolean }) {
  return (
    <IconButton
      hidden={true}
      disabled={props.cartItemsCount === 0 || props.disabled}
      radius='full'
      className={clsx(['bg-white hover:cursor-pointer hover:opacity-100 relative flex'])}
      variant='solid'
      size={'3'}
      asChild={true}
    >
      <Link href={'/cart'}>
        <Pencil1Icon className='text-zinc-700' width='18' height='18' />
        {props.cartItemsCount === 0 ? null : (
          <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 p-2 text-xs font-bold text-white'>
            {props.cartItemsCount}
          </span>
        )}
      </Link>
    </IconButton>
  )
}

export default CartButton
