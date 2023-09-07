'use client'

import Link from 'next/link'
import { IconButton } from '@radix-ui/themes'
import { Pencil1Icon } from '@radix-ui/react-icons'

export function CartButton() {
  return (
    <IconButton
      radius='full'
      className='bg-zinc-50 relative flex'
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
        <span className='absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-xs font-bold bg-salmon-500 rounded-full p-2'>
          24
        </span>
      </Link>
    </IconButton>
  )
}
