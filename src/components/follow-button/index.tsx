'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { type FollowButtonState, useFollowButton } from './use-follow-button'

const theme = {
  Follow: {
    bg: 'bg-kournikova-300',
    text: 'text-zinc-800'
  },
  'Pending Following': {
    bg: 'bg-addition',
    text: 'text-zinc-800'
  },
  Following: {
    bg: 'bg-white',
    text: 'text-gray-900'
  },
  'Pending Unfollow': {
    bg: 'bg-deletion',
    text: 'text-gray-900'
  },
  Unfollow: {
    bg: 'bg-deletion',
    text: 'text-gray-900'
  },
  Subscribe: {
    bg: 'bg-kournikova-300',
    text: 'text-zinc-800'
  },
  Subscribed: {
    bg: 'bg-addition',
    text: 'text-zinc-800'
  },
  Unsubscribe: {
    bg: 'bg-deletion',
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
    bg: 'bg-deletion',
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
    bg: 'bg-deletion',
    text: 'text-red-700'
  }
} satisfies Record<FollowButtonState, { bg: string; text: string }>

interface FollowButtonProps {
  address: Address
  list?: string | number
  className?: string
}

export function FollowButton({ address, list, className = '', ...props }: FollowButtonProps) {
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { t } = useTranslation('common', { keyPrefix: 'follow btn' })
  const { buttonText, buttonState, handleAction } = useFollowButton({ address })

  // if (address?.toLowerCase() === userAddress?.toLowerCase()) return null

  return (
    <button
      className={clsx([
        theme[buttonState].bg,
        theme[buttonState].text,
        buttonState === 'Following' && 'border-2 border-darkGrey',
        'rounded-lg text-sm flex items-center gap-1.5 justify-center font-bold',
        'w-[107px] h-[37px] px-2 py-1.5', // Fixed width for consistent layout
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
      {t(buttonText)}
    </button>
  )
}
