'use client'

import React from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import WalletIcon from 'public/assets/icons/ui/wallet.svg'

const ConnectWalletButton = () => {
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()

  if (userAddress) return null

  return (
    <button
      type='button'
      onClick={() => (openConnectModal ? openConnectModal() : null)}
      className='bg-primary text-dark-grey flex items-center justify-center gap-2 rounded-sm px-4 py-3 transition-all hover:scale-110'
    >
      <WalletIcon className='h-auto w-7' />
      <p className='font-bold'>{t('connect wallet')}</p>
    </button>
  )
}

export default ConnectWalletButton
