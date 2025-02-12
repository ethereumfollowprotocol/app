'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect, useWalletClient } from 'wagmi'

interface ConnectButtonProps {
  isResponsive?: boolean
  onClick?: () => void
}

const ConnectButton: React.FC<ConnectButtonProps> = () => {
  const { t } = useTranslation()
  const { disconnect } = useDisconnect()
  const { openConnectModal } = useConnectModal()
  const { address: userAddress, isConnected, connector } = useAccount()
  const { isLoading: isLoadingWalletClient, data: walletClient } = useWalletClient()

  useEffect(() => {
    if (
      isConnected &&
      userAddress !== undefined &&
      connector !== undefined &&
      !isLoadingWalletClient &&
      !walletClient
    ) {
      disconnect()
    }
  }, [connector, walletClient, isLoadingWalletClient])

  return (
    <button
      type='button'
      className='glass-card connect-button z-50 flex h-[54px] w-60 cursor-pointer items-center justify-center gap-[5px] rounded-full border-[3px] px-1 pl-[3px] transition-all hover:scale-105'
      onClick={() => openConnectModal?.()}
    >
      <p className='text-lg font-bold'>{t('connect')}</p>
    </button>
  )
}

export default ConnectButton
