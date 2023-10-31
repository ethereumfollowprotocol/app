'use client'

import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'
import { useAccount } from 'wagmi'
import { IconButton } from '@radix-ui/themes'
import { Pencil1Icon } from '@radix-ui/react-icons'

export function CartButton(props: { cartItemsCount: number }) {
  const { isConnected, isDisconnected, isConnecting, isReconnecting } = useAccount()

  const notConnected = !isConnected || isDisconnected || isConnecting || isReconnecting

  if (notConnected) return null

  return (
    <IconButton
      hidden
      disabled={props.cartItemsCount === 0 || notConnected}
      radius='full'
      className={clsx(['relative mx-4 flex bg-zinc-50', notConnected ? 'hidden' : 'flex'])}
      variant='solid'
      size={'3'}
      asChild
    >
      <Link href={'/cart'}>
        <Pencil1Icon
          className='text-zinc-700'
          width='18'
          height='18'
        />
        {props.cartItemsCount === 0 ? null : (
          <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-salmon-500 p-2 text-xs font-bold text-white'>
            {props.cartItemsCount}
          </span>
        )}
      </Link>
    </IconButton>
  )
}
