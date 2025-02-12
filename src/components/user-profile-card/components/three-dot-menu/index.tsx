import React from 'react'
import type { Address } from 'viem'
import { useTheme } from 'next-themes'
import { FaQrcode } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import CopyValue from './components/copy-value'
import { useCoolMode } from '#/hooks/use-cool-mode'
import type { FollowState } from '#/types/common'
import { useThreeDotMenu } from '../../hooks/use-three-dot-menu'
import RestrictButton from './components/restrict-button'
import OpenModalButton from './components/open-modal-button'
import { FOLLOW_BUTTON_COOL_EMOJI } from '#/lib/constants/follow-button'

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

  const blockCoolEmoji =
    FOLLOW_BUTTON_COOL_EMOJI[followState === 'blocks' || isPendingBlock ? 'Unblock' : 'Block'][resolvedTheme || 'light']
  const blockCoolMode = useCoolMode(blockCoolEmoji || '', !blockCoolEmoji, !threeDotMenuOpen)

  const muteCoolEmoji =
    FOLLOW_BUTTON_COOL_EMOJI[followState === 'mutes' || isPendingMute ? 'Unmute' : 'Mute'][resolvedTheme || 'light']
  const muteCoolMode = useCoolMode(muteCoolEmoji || '', !muteCoolEmoji, !threeDotMenuOpen)

  return (
    <div className={showMoreOptions ? 'block' : 'hidden'} ref={threeDotMenuRef}>
      <div
        className='flex cursor-pointer items-center gap-[3px] rounded-md bg-zinc-300 px-1.5 py-2 transition-all hover:scale-110 hover:opacity-50'
        onClick={() => setThreeDotMenuOpen(!threeDotMenuOpen)}
      >
        <div className='h-1 w-1 rounded-full bg-black'></div>
        <div className='h-1 w-1 rounded-full bg-black'></div>
        <div className='h-1 w-1 rounded-full bg-black'></div>
      </div>
      <div
        className={cn(
          threeDotMenuOpen && showMoreOptions ? 'flex' : 'hidden',
          'bg-neutral border-grey absolute top-9 right-0 z-50 w-fit flex-col items-center gap-2 rounded-xl border-[3px] p-1 drop-shadow-lg'
        )}
      >
        {!isConnectedUserCard && (
          <div className='flex w-full flex-col items-center justify-center gap-3 pt-2'>
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
            icon={<FaQrcode className='mr-1 text-lg' />}
          />
        )}
        {!isConnectedUserCard && (
          <button
            onClick={toggleTopEight}
            className='hover:bg-text/5 relative flex w-full cursor-pointer items-center justify-center gap-1 rounded-sm p-3 text-xs font-bold text-nowrap transition-colors'
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
            icon={<IoMdSettings className='text-lg' />}
          />
        )}
      </div>
    </div>
  )
}

export default ThreeDotMenu
