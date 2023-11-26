import clsx from 'clsx'
import { Spinner } from './spinner.tsx'
import { Button } from '@radix-ui/themes'
import type { PropsWithChildren, ComponentPropsWithoutRef } from 'react'

export type FollowButtonState =
  | 'Follow'
  | 'Following'
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
  Following: {
    bg: 'bg-lime-400',
    text: 'text-zinc-800'
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
  text,
  pending,
  loading,
  ...properties
}: PropsWithChildren<ComponentPropsWithoutRef<typeof Button>> & {
  text: string
  pending?: boolean
  loading?: boolean
}) {
  return (
    <Button
      size={'2'}
      className={clsx([
        // follows ? 'bg-[#ffe065]' : 'bg-white'
        'bg-[#ffe065]',
        '!rounded-xl px-4 text-sm sm:text-base font-bold',
        pending ? 'cursor-not-allowed' : theme[text as FollowButtonState].bg,
        theme[text as FollowButtonState].text
      ])}
      disabled={pending}
      {...properties}
    >
      <div className='mt-0.5 -mr-1'>
        <img alt='mainnet logo' src='/assets/mainnet-black.svg' />
      </div>
      {text}
      {loading && <Spinner />}
    </Button>
  )
}
