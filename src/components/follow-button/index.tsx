import { Button } from '@radix-ui/themes'
import clsx from 'clsx'
import Image from 'next/image'
import type { Address } from 'viem'
import { useFollowButton, type FollowButtonState } from './useFollowButton'

const theme = {
  Follow: {
    bg: 'bg-kournikova-300',
    text: 'text-zinc-800'
  },
  'Pending Following': {
    bg: 'bg-lime-400',
    text: 'text-zinc-800'
  },
  Following: {
    bg: 'bg-white',
    text: 'text-gray-900'
  },
  'Pending Unfollow': {
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

interface FollowButtonProps extends React.ComponentProps<typeof Button> {
  address: Address
  className?: string
}

export function FollowButton({ address, className = '', ...props }: FollowButtonProps) {
  const { buttonText, buttonState, handleAction } = useFollowButton({ address })

  return (
    <Button
      className={clsx([
        theme[buttonState].bg,
        theme[buttonState].text,
        'rounded-lg font-bold h-full',
        'w-[107px] px-2 py-1.5', // Fixed width for consistent layout
        className
      ])}
      onClick={handleAction}
      {...props}
    >
      <Image alt='mainnet logo' src='/assets/mainnet-black.svg' width={16} height={16} />
      {buttonText}
    </Button>
  )
}
