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
      type="button"
      className="z-50 px-1 pl-[3px] transition-all border-[3px] w-60 gap-[5px] hover:scale-105 cursor-pointer flex justify-center items-center h-[54px] glass-card rounded-full connect-button"
      onClick={() => openConnectModal?.()}
    >
      <p className="font-bold text-lg">{t('connect')}</p>
    </button>
  )
}

export default ConnectButton
