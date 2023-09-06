import clsx from 'clsx'
import { Button } from '@radix-ui/themes'
import type { PropsWithChildren, ComponentPropsWithoutRef } from 'react'
import { Spinner } from '#/components/Spinner'

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
    text: 'text-zinc-800',
  },
  Following: {
    bg: 'bg-lime-400',
    text: 'text-zinc-800',
  },
  Unfollow: {
    bg: 'bg-salmon-500',
    text: 'text-gray-900',
  },
  Subscribe: {
    bg: 'bg-kournikova-300',
    text: 'text-zinc-800',
  },
  Subscribed: {
    bg: 'bg-lime-400',
    text: 'text-zinc-800',
  },
  Unsubscribe: {
    bg: 'bg-salmon-500',
    text: 'text-gray-900',
  },
  Block: {
    bg: 'bg-kournikova-300',
    text: 'text-zinc-800',
  },
  Blocked: {
    bg: 'bg-gray-200',
    text: 'text-salmon-500',
  },
  Unblock: {
    bg: 'bg-salmon-500',
    text: 'text-zinc-800',
  },
  Mute: {
    bg: 'bg-kournikova-300',
    text: 'text-salmon-500',
  },
  Muted: {
    bg: 'bg-gray-200',
    text: 'text-salmon-500',
  },
  Unmute: {
    bg: 'bg-salmon-500',
    text: 'text-red-700',
  },
} satisfies Record<FollowButtonState, { bg: string; text: string }>

export function FollowButton({
  text,
  pending,
  loading,
  ...props
}: PropsWithChildren<ComponentPropsWithoutRef<typeof Button>> & {
  text: string
  pending?: boolean
  loading?: boolean
}) {
  return (
    <Button
      size={'3'}
      className={clsx([
        'px-4 py-4 !rounded-xl font-bold text-base',
        pending ? 'bg-gray-200' : theme[text as FollowButtonState].bg,
        theme[text as FollowButtonState].text,
      ])}
      {...props}
    >
      <svg
        width='15'
        height='21'
        viewBox='0 0 15 21'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='inline-block -mr-2 text-black opacity-100'
      >
        <path
          d='M0 9.21289L5.35156 0.306641L10.6641 9.21289L5.35156 12.4551L0 9.21289Z'
          fill='#333333'
        />
        <path
          d='M5.35156 13.4316L0 10.1895L5.35156 17.7285L10.6641 10.1895L5.35156 13.4316Z'
          fill='#333333'
        />
        <path
          d='M12.1875 14.291H10.6641V16.5566H8.55469V17.9629H10.6641V20.3066H12.1875V17.9629H14.2578V16.5566H12.1875V14.291Z'
          fill='#333333'
        />
      </svg>
      {text}
      {loading && <Spinner />}
    </Button>
  )
}
