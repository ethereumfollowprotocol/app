'use client'

import Image from 'next/image'
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useState, type Ref } from 'react'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { cn } from '#/lib/utilities'
import LoadingCell from '../loaders/loading-cell'
import { useCoolMode } from './hooks/useCoolMode'
import MainnetRed from 'public/assets/mainnet-red.svg'
import MainnetBlack from 'public/assets/mainnet-black.svg'
import { type FollowButtonState, useFollowButton } from './hooks/use-follow-button'

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
    hover:
      'hover:bg-none hover:bg-[#D0D0D0] hover:border-none hover:rounded-[15px] hover:rounded-[11px] hover:py-1.5 hover:scale-110 transition-transform',
    text: 'text-gray-900',
    border:
      'border-[3px] after:absolute after:h-4 after:w-4 after:rounded-full after:-top-2 after:-right-2 after:bg-green-400'
  },
  Following: {
    bg: 'btn-following',
    hover:
      'hover:bg-none hover:bg-deletion hover:border-none hover:rounded-[15px] hover:rounded-[11px] hover:py-1.5 hover:scale-110 transition-transform',
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
    border: 'border-[3px] border-zinc-200'
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
    border: 'border-0'
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
    bg: 'bg-deletion',
    hover: 'hover:bg-[#CF4C4C]',
    text: 'text-darkGrey',
    border: 'border-0'
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

const coolEmoji: Record<FollowButtonState, string> = {
  Follow: '/assets/logo.svg',
  'Pending Following': '',
  Following: '/assets/icons/unfollow-emoji.svg',
  Unfollow: '',
  Subscribe: '',
  Subscribed: '',
  Unsubscribe: '',
  Block: '/assets/icons/block-emoji.svg',
  'Pending Block': '',
  Blocked: '',
  Unblock: '',
  Mute: '/assets/icons/mute-emoji.svg',
  'Pending Mute': '',
  Muted: '',
  Unmute: ''
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

  const coolEfpLogo = useCoolMode(
    coolEmoji[buttonState],
    coolEmoji[buttonState] === '',
    true,
    isLoading
  )

  return isLoading ? (
    <div className={`rounded-xl ${isBlockedBy ? 'w-[132px]' : 'w-[109px]'} py-1`}>
      <LoadingCell className='h-9 w-full rounded-lg' />
    </div>
  ) : (
    <div ref={coolEfpLogo as Ref<HTMLDivElement>}>
      <button
        className={cn([
          theme[buttonState].bg,
          theme[buttonState].text,
          theme[buttonState].border,
          'rounded-xl relative text-sm flex items-center w-[109px] gap-1.5 transition-all px-2 duration-200 justify-center font-bold',
          disableHover
            ? buttonState === 'Pending Following'
              ? ''
              : 'bg-right'
            : `hover:scale-110 ${theme[buttonState].hover}`,
          className
        ])}
        style={{
          minWidth: isBlockedBy ? '132px' : '107px',
          height: '37px'
        }}
        onMouseLeave={() => {
          setDisableHover(false)
        }}
        onClick={e => {
          e.stopPropagation()

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
