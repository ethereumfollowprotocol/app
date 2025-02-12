'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect, useChains } from 'wagmi'

import { cn } from '#/lib/utilities'
import EthBalance from './eth-balance'
import ListSelector from './list-selector'
import { useAutoConnect } from '#/hooks/use-auto-connect'
import WalletIcon from 'public/assets/icons/ui/wallet.svg'
import { useEFPProfile } from '#/contexts/efp-profile-context'

const WalletMenu = () => {
  const [walletMenOpenu, setWalletMenuOpen] = useState(false)

  const clickAwayWalletRef = useClickAway<HTMLDivElement>((_) => {
    setWalletMenuOpen(false)
  })

  const chains = useChains()
  const { t } = useTranslation()
  const { roles } = useEFPProfile()
  const { disconnect } = useDisconnect()
  const { openConnectModal } = useConnectModal()
  const { address: userAddress } = useAccount()

  const listChain = chains.find((chain) => chain.id === roles?.listChainId)

  useAutoConnect()

  return (
    <div ref={clickAwayWalletRef} className='relative'>
      <button
        type='button'
        onClick={() =>
          userAddress ? setWalletMenuOpen(!walletMenOpenu) : openConnectModal ? openConnectModal() : null
        }
      >
        <Image src={WalletIcon} alt='Wallet' className='w-9 text-3xl' />
      </button>
      {walletMenOpenu && (
        <div
          className={cn(
            'bg-neutral absolute top-0 left-16 z-50 flex h-fit w-56 flex-col items-start overflow-x-hidden rounded-sm shadow-lg sm:overflow-visible'
          )}
        >
          <div className='flex max-h-[75vh] w-full flex-col overflow-x-visible transition-all sm:h-auto'>
            <ListSelector setWalletMenuOpen={setWalletMenuOpen} />
            {userAddress && <EthBalance address={userAddress} chain={listChain || chains[0]} />}
            <p
              className='hover:bg-navItem w-full cursor-pointer rounded-md p-3 font-bold text-nowrap text-red-500 transition-opacity'
              onClick={() => {
                disconnect()
                setWalletMenuOpen(false)
              }}
            >
              {t('disconnect')}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default WalletMenu
