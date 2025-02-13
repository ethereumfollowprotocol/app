'use client'

import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect, useMemo, useRef, useState, type Ref } from 'react'

import { cn } from '#/lib/utilities'
import LoadingCell from '../loaders/loading-cell'
import { useCoolMode } from '#/hooks/use-cool-mode'
import { useSounds } from '#/contexts/sounds-context'
import MainnetBlack from 'public/assets/mainnet-black.svg'
import { useFollowButton } from './hooks/use-follow-button'
import { FOLLOW_BUTTON_SOUND, FOLLOW_BUTTON_STYLES, FOLLOW_BUTTON_COOL_EMOJI } from '#/lib/constants/follow-button'

interface FollowButtonProps {
  address: Address
  className?: string
  isBlockedBy?: boolean
}

const FollowButton: React.FC<FollowButtonProps> = ({ address, className = '', isBlockedBy, ...props }) => {
  const [disableHover, setDisableHover] = useState(false)

  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const { actionsSoundsMuted } = useSounds()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { buttonText, buttonState, handleAction, isLoading } = useFollowButton({
    address,
    isBlockedBy,
  })

  const theme = resolvedTheme || 'light'

  const buttonStyle = useMemo(() => FOLLOW_BUTTON_STYLES[buttonState], [buttonState])
  const hoverStyle = disableHover
    ? buttonState === 'Follow'
      ? 'bg-right'
      : ''
    : `hover:scale-110 ${buttonStyle.hover}`

  const coolModeRef = useCoolMode(
    FOLLOW_BUTTON_COOL_EMOJI[buttonState][theme] || '',
    !FOLLOW_BUTTON_COOL_EMOJI[buttonState][theme],
    isLoading
  )

  const soundRef = useRef<HTMLAudioElement>(null)
  const clickSound = useMemo(() => FOLLOW_BUTTON_SOUND[buttonState][theme], [buttonState, theme])

  useEffect(() => {
    if (!soundRef.current) return

    if (actionsSoundsMuted) soundRef.current.volume = 0
    else soundRef.current.volume = 0.3
  }, [clickSound, actionsSoundsMuted])

  return isLoading ? (
    <div className={`rounded-xl ${isBlockedBy ? 'w-[132px]' : 'w-[110px] 2xl:w-[120px]'}`}>
      <LoadingCell className='h-9 w-full rounded-sm 2xl:h-10' />
    </div>
  ) : (
    <div ref={coolModeRef as Ref<HTMLDivElement>}>
      <audio ref={soundRef} src={clickSound} key={theme} preload='auto' />
      <button
        className={cn([
          buttonStyle.bg,
          buttonStyle.text,
          buttonStyle.border,
          hoverStyle,
          // Base styles are applied before className so they can be overridden
          'relative flex h-9 w-[110px] items-center justify-center gap-1.5 rounded-[11px] px-2 text-[13px] font-bold transition-all duration-200 2xl:h-10 2xl:w-[120px] 2xl:rounded-xl 2xl:text-sm',
          className,
        ])}
        onMouseLeave={() => setDisableHover(false)}
        onClick={(e) => {
          e.stopPropagation()

          if (!userAddress && openConnectModal) return openConnectModal()
          if (clickSound && !actionsSoundsMuted) soundRef.current?.play()

          setDisableHover(true)
          handleAction()
        }}
        {...props}
      >
        {buttonStyle.imageSrc ? (
          <buttonStyle.imageSrc className='pointer-events-none w-3.5 2xl:w-4' />
        ) : (
          <MainnetBlack className='pointer-events-none w-3.5 2xl:w-4' />
        )}

        <p className='max-w-[90px] text-wrap break-words'>{t(buttonText)}</p>
      </button>
    </div>
  )
}

export default FollowButton
