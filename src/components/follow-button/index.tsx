'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import LoadingCell from '../loading-cell'
import { useCoolMode } from './useCoolMode'
import MainnetRed from 'public/assets/mainnet-red.svg'
import MainnetBlack from 'public/assets/mainnet-black.svg'
import { type FollowButtonState, useFollowButton } from './use-follow-button'
import { useState } from 'react'

const theme: Record<
  FollowButtonState,
  { bg: string; hover?: string; text: string; border: string; imageSrc?: string }
> = {
  Follow: {
    // bg: 'bg-kournikova-300 hover:bg-[#EEBE00]',
    bg: 'bg-kournikova-300 btn-grad',
    text: 'text-zinc-800',
    border: 'border-0'
  },
  'Pending Following': {
    bg: 'btn-following-pending',
    hover: 'hover:bg-none hover:bg-[#D0D0D0]',
    text: 'text-gray-900',
    border:
      'border-[3px] after:absolute after:h-4 after:w-4 after:rounded-full after:-top-2 after:-right-2 after:bg-green-400'
  },
  Following: {
    bg: 'bg-white',
    hover: 'hover:bg-deletion hover:border-deletion hover:border-0',
    text: 'text-gray-900',
    border: 'border-[3px]'
  },
  Unfollow: {
    bg: 'bg-deletion',
    hover: 'hover:bg-[#CF4C4C]',
    text: 'text-gray-900',
    border:
      'border-0 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-1.5 after:-right-1.5 after:bg-green-400'
  },
  Subscribe: {
    bg: 'bg-kournikova-300',
    text: 'text-zinc-800',
    border: 'border-0 '
  },
  Subscribed: {
    bg: 'bg-addition',
    text: 'text-zinc-800',
    border: 'border-[3px] border-gray-200'
  },
  Unsubscribe: {
    bg: 'bg-deletion',
    text: 'text-gray-900',
    border:
      'border-0 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-1.5 after:-right-1.5 after:bg-green-400'
  },
  Block: {
    bg: 'bg-deletion',
    hover: 'hover:bg-[#CF4C4C]',
    text: 'text-zinc-800',
    border: 'border-0 '
  },
  'Pending Block': {
    bg: 'bg-white',
    hover: 'hover:bg-[#FFC6C6]',
    text: 'text-red-500',
    border:
      'border-[3px] border-red-500 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-2 after:-right-2 after:bg-green-400',
    imageSrc: MainnetRed
  },
  Blocked: {
    bg: 'bg-white',
    hover: 'hover:bg-[#FFC6C6]',
    text: 'text-red-500',
    border: 'border-[3px] border-red-500',
    imageSrc: MainnetRed
  },
  Unblock: {
    bg: 'bg-deletion',
    hover: 'hover:bg-[#CF4C4C]',
    text: 'text-zinc-800',
    border:
      'border-0 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-1.5 after:-right-1.5 after:bg-green-400'
  },
  Mute: {
    bg: 'bg-kournikova-300',
    hover: 'hover:bg-[#CF4C4C]',
    text: 'text-red-500',
    border: 'border-0 '
  },
  'Pending Mute': {
    bg: 'bg-white',
    hover: 'hover:bg-[#FFC6C6]',
    text: 'text-red-500',
    border:
      'border-[3px] border-red-500 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-2 after:-right-2 after:bg-green-400',
    imageSrc: MainnetRed
  },
  Muted: {
    bg: 'bg-white',
    hover: 'hover:bg-[#FFC6C6]',
    text: 'text-red-500',
    border: 'border-[3px] border-red-500',
    imageSrc: MainnetRed
  },
  Unmute: {
    bg: 'bg-deletion',
    hover: 'hover:bg-[#CF4C4C]',
    text: 'text-zinc-800',
    border:
      'border-0 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-1.5 after:-right-1.5 after:bg-green-400'
  }
}

interface FollowButtonProps {
  address: Address
  className?: string
  isBlockedBy?: boolean
}

const FollowButton: React.FC<FollowButtonProps> = ({
  address,
  className = '',
  isBlockedBy,
  ...props
}) => {
  const [disableHover, setDisableHover] = useState(false)

  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { t } = useTranslation()
  const { buttonText, buttonState, handleAction, isLoading } = useFollowButton({
    address,
    isBlockedBy
  })

  const coolEfpLogo = useCoolMode('/assets/logo.svg', buttonState !== 'Follow', true, isLoading)

  return isLoading ? (
    <div className={`rounded-xl ${isBlockedBy ? 'w-[132px]' : 'w-[107px]'} h-[37px]`}>
      <LoadingCell className='h-full w-full rounded-lg' />
    </div>
  ) : (
    <div ref={coolEfpLogo}>
      <button
        className={clsx([
          theme[buttonState].bg,
          theme[buttonState].text,
          theme[buttonState].border,
          'rounded-xl relative text-sm flex items-center gap-1.5 transition-all duration-200 justify-center font-bold',
          'h-[37px] px-2 py-1.5', // Fixed width for consistent layout
          disableHover
            ? buttonState === 'Pending Following'
              ? ''
              : 'bg-right'
            : theme[buttonState].hover,
          className
        ])}
        style={{
          width: isBlockedBy ? '132px' : '107px'
        }}
        onMouseLeave={() => {
          setDisableHover(false)
        }}
        onClick={() => {
          if (!userAddress && openConnectModal) {
            openConnectModal()
            return
          }

          setDisableHover(true)
          handleAction()
        }}
        {...props}
      >
        <Image
          alt='mainnet logo'
          src={theme[buttonState].imageSrc || MainnetBlack}
          width={16}
          className='pointer-events-none'
        />
        {t(buttonText)}
      </button>
    </div>
  )
}

export default FollowButton
