'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import LoadingCell from '../loading-cell'
import { type FollowButtonState, useFollowButton } from './use-follow-button'

const theme = {
  Follow: {
    bg: 'bg-kournikova-300',
    text: 'text-zinc-800',
    border: 'border-0 '
  },
  'Pending Following': {
    bg: 'bg-white',
    text: 'text-gray-900',
    border: 'border-2 border-gray-200'
  },
  Following: {
    bg: 'bg-white',
    text: 'text-gray-900',
    border: 'border-2 border-gray-200'
  },
  Unfollow: {
    bg: 'bg-deletion',
    text: 'text-gray-900',
    border: 'border-0 '
  },
  Subscribe: {
    bg: 'bg-kournikova-300',
    text: 'text-zinc-800',
    border: 'border-0 '
  },
  Subscribed: {
    bg: 'bg-addition',
    text: 'text-zinc-800',
    border: 'border-2 border-gray-200'
  },
  Unsubscribe: {
    bg: 'bg-deletion',
    text: 'text-gray-900',
    border: 'border-0 '
  },
  Block: {
    bg: 'bg-kournikova-300',
    text: 'text-zinc-800',
    border: 'border-0 '
  },
  'Pending Block': {
    bg: 'bg-white',
    text: 'deletion',
    border: 'border-2 border-red-500'
  },
  Blocked: {
    bg: 'bg-white',
    text: 'deletion',
    border: 'border-2 border-red-500'
  },
  Unblock: {
    bg: 'bg-deletion',
    text: 'text-zinc-800',
    border: 'border-0 '
  },
  Mute: {
    bg: 'bg-kournikova-300',
    text: 'text-deletion',
    border: 'border-0 '
  },
  'Pending Mute': {
    bg: 'bg-white',
    text: 'deletion',
    border: 'border-2 border-red-500'
  },
  Muted: {
    bg: 'bg-white',
    text: 'text-deletion',
    border: 'border-2 border-red-500'
  },
  Unmute: {
    bg: 'bg-deletion',
    text: 'text-red-700',
    border: 'border-0 '
  }
} satisfies Record<FollowButtonState, { bg: string; text: string; border: string }>

interface FollowButtonProps {
  address: Address
  className?: string
}

export const FollowButton = ({ address, className = '', ...props }: FollowButtonProps) => {
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { t } = useTranslation('common', { keyPrefix: 'follow btn' })
  const { buttonText, buttonState, handleAction, isLoading } = useFollowButton({ address })

  // if (address?.toLowerCase() === userAddress?.toLowerCase()) return null

  return isLoading ? (
    <div className='rounded-lg w-[107px] h-[37px]'>
      <LoadingCell className='h-full w-full rounded-lg' />
    </div>
  ) : (
    <button
      className={clsx([
        theme[buttonState].bg,
        theme[buttonState].text,
        theme[buttonState].border,
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
