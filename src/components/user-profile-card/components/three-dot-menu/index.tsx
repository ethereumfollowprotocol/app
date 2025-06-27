import React from 'react'
import type { Address } from 'viem'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import CopyValue from './components/copy-value'
import { useCoolMode } from '#/hooks/use-cool-mode'
import type { FollowState } from '#/types/common'
import { useThreeDotMenu } from '../../hooks/use-three-dot-menu'
import RestrictButton from './components/restrict-button'
import OpenModalButton from './components/open-modal-button'
import { FOLLOW_BUTTON_COOL_EMOJI } from '#/lib/constants/follow-button'
import { useGlassTheme } from '#/hooks/use-glass-theme'
import QrCode from 'public/assets/icons/ui/qr-code.svg'
import Settings from 'public/assets/icons/ui/settings.svg'

interface ThreeDotMenuProps {
  address: Address
  profileList?: number | null
  primaryList?: number | null
  profileName?: string | null
  isConnectedUserCard: boolean
  showMoreOptions: boolean
  followState: FollowState
  openBlockModal?: () => void
  openQrCodeModal?: () => void
  openListSettingsModal?: () => void
}

const ThreeDotMenu: React.FC<ThreeDotMenuProps> = ({
  address,
  profileList,
  primaryList,
  profileName,
  isConnectedUserCard,
  showMoreOptions,
  followState,
  openBlockModal,
  openQrCodeModal,
  openListSettingsModal,
}) => {
  const {
    threeDotMenuOpen,
    setThreeDotMenuOpen,
    threeDotMenuRef,
    onClickOption,
    toggleTopEight,
    isPendingBlock,
    isPendingMute,
    isInTopEight,
    isAddingToTopEight,
    isRemovingFromTopEight,
  } = useThreeDotMenu({ address, followState })

  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const { getGlassClass } = useGlassTheme()

  const blockCoolEmoji =
    FOLLOW_BUTTON_COOL_EMOJI[followState === 'blocks' || isPendingBlock ? 'Unblock' : 'Block'][resolvedTheme || 'light']
  const blockCoolMode = useCoolMode(blockCoolEmoji || '', !blockCoolEmoji, !threeDotMenuOpen)

  const muteCoolEmoji =
    FOLLOW_BUTTON_COOL_EMOJI[followState === 'mutes' || isPendingMute ? 'Unmute' : 'Mute'][resolvedTheme || 'light']
  const muteCoolMode = useCoolMode(muteCoolEmoji || '', !muteCoolEmoji, !threeDotMenuOpen)

  return (
    <div className={showMoreOptions ? 'block' : 'hidden'} ref={threeDotMenuRef}>
      <div
        className={cn(
          getGlassClass('liquid-glass-button', 'bg-nav-item shadow-small'),
          'flex h-7 w-7 cursor-pointer items-center justify-center gap-[3px] rounded-sm transition-all hover:scale-110'
        )}
        onClick={() => setThreeDotMenuOpen(!threeDotMenuOpen)}
      >
        <div className='bg-text h-1 w-1 rounded-full'></div>
        <div className='bg-text h-1 w-1 rounded-full'></div>
        <div className='bg-text h-1 w-1 rounded-full'></div>
      </div>
      <div
        className={cn(
          threeDotMenuOpen && showMoreOptions ? 'flex' : 'hidden',
          getGlassClass('glass-pseudo-dropdown', 'bg-neutral shadow-medium'),
          'absolute top-9 right-0 z-50 w-fit flex-col items-center gap-2 rounded-sm'
        )}
      >
        {!isConnectedUserCard && (
          <div className='flex w-full flex-col items-center justify-center gap-4 pt-2'>
            <RestrictButton blockCoolMode={blockCoolMode} onClickOption={onClickOption} text='Block' type='block' />
            <RestrictButton blockCoolMode={muteCoolMode} onClickOption={onClickOption} text='Mute' type='mute' />
          </div>
        )}
        {openQrCodeModal && (
          <OpenModalButton
            onClick={() => {
              openQrCodeModal()
              setThreeDotMenuOpen(false)
            }}
            text='qr code'
            icon={<QrCode className='h-auto w-4' />}
          />
        )}
        {!isConnectedUserCard && (
          <button
            onClick={toggleTopEight}
            className={cn(
              getGlassClass('glass-hover-item', 'hover:bg-text/5'),
              'relative flex w-full cursor-pointer items-center justify-center gap-1 rounded-sm p-4 text-xs font-bold text-nowrap transition-colors'
            )}
          >
            {t(
              (isInTopEight || isAddingToTopEight) && !isRemovingFromTopEight
                ? 'remove from top eight'
                : 'add to top eight'
            )}
          </button>
        )}
        <CopyValue value={address} text='copy address' />
        <CopyValue
          value={`https://efp.app/${
            profileList ? (profileList === Number(primaryList) ? address : profileList) : address
          }`}
          text='copy profile'
        />
        {profileName && <CopyValue value={profileName} text='copy ens' />}
        {openBlockModal && (
          <OpenModalButton
            onClick={() => {
              openBlockModal()
              setThreeDotMenuOpen(false)
            }}
            text='block-mute'
          />
        )}
        {openListSettingsModal && !!profileList && (
          <OpenModalButton
            onClick={() => {
              openListSettingsModal()
              setThreeDotMenuOpen(false)
            }}
            text='settings'
            icon={<Settings className='h-auto w-4' />}
          />
        )}
      </div>
    </div>
  )
}

export default ThreeDotMenu
