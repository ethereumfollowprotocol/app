import { useCart } from '#/contexts/cart-context.tsx'
import { listOpAddListRecord, listOpRemoveListRecord } from '#/types/list-op.ts'
import { Button } from '@radix-ui/themes'
import clsx from 'clsx'
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import type { Address } from 'viem'
import { Spinner } from './spinner.tsx'

export type FollowButtonState =
  | 'Follow'
  | 'Pending_Following'
  | 'Following'
  | 'Pending_Unfollow'
  | 'Unfollow'
  | 'Subscribe'
  | 'Subscribed'
  | 'Unsubscribe'
  | 'Block'
  | 'Blocked'
  | 'Unblock'
  | 'Mute'
  | 'Muted'
  | 'Unmute'

const theme = {
  Follow: {
    bg: 'bg-kournikova-300',
    text: 'text-zinc-800'
  },
  Pending_Following: {
    bg: 'bg-lime-400',
    text: 'text-zinc-800'
  },
  // Following: {
  //   bg: 'bg-lime-400',
  //   text: 'text-zinc-800'
  // },
  Following: {
    bg: 'bg-white',
    text: 'text-gray-900'
  },
  Pending_Unfollow: {
    bg: 'bg-[#FF7C7C]',
    text: 'text-gray-900'
  },
  Unfollow: {
    bg: 'bg-salmon-500',
    text: 'text-gray-900'
  },
  Subscribe: {
    bg: 'bg-kournikova-300',
    text: 'text-zinc-800'
  },
  Subscribed: {
    bg: 'bg-lime-400',
    text: 'text-zinc-800'
  },
  Unsubscribe: {
    bg: 'bg-salmon-500',
    text: 'text-gray-900'
  },
  Block: {
    bg: 'bg-kournikova-300',
    text: 'text-zinc-800'
  },
  Blocked: {
    bg: 'bg-gray-200',
    text: 'text-salmon-500'
  },
  Unblock: {
    bg: 'bg-salmon-500',
    text: 'text-zinc-800'
  },
  Mute: {
    bg: 'bg-kournikova-300',
    text: 'text-salmon-500'
  },
  Muted: {
    bg: 'bg-gray-200',
    text: 'text-salmon-500'
  },
  Unmute: {
    bg: 'bg-salmon-500',
    text: 'text-red-700'
  }
} satisfies Record<FollowButtonState, { bg: string; text: string }>

export function FollowButton({
  address,
  text,
  pending,
  loading,
  ...properties
}: PropsWithChildren<ComponentPropsWithoutRef<typeof Button>> & {
  address: Address
  text: FollowButtonState
  pending?: boolean
  loading?: boolean
}) {
  const { addCartItem, removeCartItem } = useCart()

  return (
    <Button
      size={'2'}
      className={clsx([
        theme[text].bg,
        'rounded-lg text-xs font-bold w-[90px]',
        pending ? 'cursor-not-allowed' : theme[text as FollowButtonState].bg,
        theme[text as FollowButtonState].text
      ])}
      disabled={pending}
      onClick={() => {
        console.log(`${text} ${address}`)
        if (text === 'Follow') {
          addCartItem({ listOp: listOpAddListRecord(address) })
        } else if (text === 'Pending_Follow') {
          removeCartItem(listOpAddListRecord(address))
        } else if (text === 'Following') {
          addCartItem({ listOp: listOpRemoveListRecord(address) })
        } else if (text === 'Pending_Unfollow') {
          removeCartItem(listOpRemoveListRecord(address))
        }
      }}
      {...properties}
    >
      <img alt='mainnet logo' src='/assets/mainnet-black.svg' className='mt-0.5 -mr-1' />
      {text.replace('Pending_', '')}
      {loading && <Spinner />}
    </Button>
  )
}
