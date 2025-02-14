'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useClickAway, useIsClient } from '@uidotdev/usehooks'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect, useChains } from 'wagmi'

import { cn } from '#/lib/utilities'
import EthBalance from './eth-balance'
import ListSelector from './list-selector'
import { useAutoConnect } from '#/hooks/use-auto-connect'
import WalletIcon from 'public/assets/icons/ui/wallet.svg'
import { useEFPProfile } from '#/contexts/efp-profile-context'

const WalletMenu = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const [walletMenOpenu, setWalletMenuOpen] = useState(false)

  const clickAwayWalletRef = useClickAway<HTMLDivElement>((_) => {
    setWalletMenuOpen(false)
  })

  const chains = useChains()
  const isClient = useIsClient()
  const { t } = useTranslation()
  const { disconnect } = useDisconnect()
  const { roles, lists } = useEFPProfile()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()

  const listChain = chains.find((chain) => chain.id === roles?.listChainId)
  const deviceWidth = isClient ? window.innerWidth : 1080

  useAutoConnect()

  return (
    <div ref={clickAwayWalletRef} className='relative'>
      <button
        type='button'
        onClick={() =>
          userAddress ? setWalletMenuOpen(!walletMenOpenu) : openConnectModal ? openConnectModal() : null
        }
        className='flex items-center justify-center'
      >
        <WalletIcon className='h-auto w-9 text-3xl transition-all hover:scale-125' />
      </button>
      <div
        className={cn(
          walletMenOpenu ? 'block opacity-100 starting:opacity-0' : 'hidden opacity-0',
          'shadow-medium absolute top-12 right-0 z-50 flex max-h-[75vh] w-56 flex-col items-start rounded-sm transition-all sm:-top-2 sm:left-16 sm:h-auto sm:overflow-visible',
          isSubMenuOpen ? `overflow-x-hidden` : 'overflow-hidden'
        )}
        style={{
          height: deviceWidth < 640 ? (isSubMenuOpen ? `${112 + (lists?.lists?.length || 0) * 56}px` : 'auto') : 'auto',
        }}
      >
        <div
          className={cn(
            'bg-neutral flex max-h-[75vh] w-full flex-col overflow-x-visible rounded-sm transition-all sm:h-auto',
            isSubMenuOpen ? '-translate-x-full sm:translate-x-0' : 'translate-x-0'
          )}
        >
          <ListSelector setWalletMenuOpen={setWalletMenuOpen} setSubMenuOpen={setIsSubMenuOpen} />
          {userAddress && <EthBalance address={userAddress} chain={listChain || chains[0]} />}
          <p
            className='hover:bg-nav-item w-full cursor-pointer rounded-sm p-4 text-right font-bold text-nowrap text-red-500 transition-opacity sm:text-left'
            onClick={() => {
              disconnect()
              setWalletMenuOpen(false)
            }}
          >
            {t('disconnect')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default WalletMenu
