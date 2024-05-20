import clsx from 'clsx'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { type FollowButtonState, useFollowButton } from './use-follow-button'

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

interface FollowButtonProps {
  address: Address
  className?: string
}

export function FollowButton({ address, className = '', ...props }: FollowButtonProps) {
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { buttonText, buttonState, handleAction } = useFollowButton({
    address
  })

  return (
    <button
      className={clsx([
        theme[buttonState].bg,
        theme[buttonState].text,
        'rounded-lg font-bold h-full',
        'w-[107px] max-h-[37px] px-2 py-1.5', // Fixed width for consistent layout
        className
      ])}
      onClick={() => {
        if (!userAddress && openConnectModal) {
          openConnectModal()
          return
        }

        handleAction()
      }}
      {...props}
    >
      <Image alt='mainnet logo' src='/assets/mainnet-black.svg' width={16} height={16} />
      {buttonText}
    </button>
  )
}
