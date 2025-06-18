import React from 'react'
import { t } from 'i18next'
import Link from 'next/link'
import { useBalance } from 'wagmi'
import { formatEther } from 'viem'
import type { Address, Chain } from 'viem'
import { base, mainnet, optimism } from 'viem/chains'

import type { ChainWithDetails } from '#/lib/wagmi'
import { ChainIcon } from '#/components/chain-icon'
import ExternalLink from 'public/assets/icons/ui/external-link.svg'

interface EthBalanceProps {
  address: Address
  chain: Chain
}

const EthBalance: React.FC<EthBalanceProps> = ({ address, chain }) => {
  const { data: balance } = useBalance({
    address: address,
    chainId: chain.id,
  })

  const bridges = {
    [base.id]: 'https://bridge.base.org/deposit',
    [optimism.id]: 'https://gateway.optimism.io/bridge/eth',
    [mainnet.id]: 'https://www.alchemy.com/list-of/web3-bridges-on-ethereum',
  }

  const currencies = {
    [base.id]: 'Base ETH',
    [optimism.id]: 'OP ETH',
    [mainnet.id]: 'ETH',
  }

  return (
    <>
      <div className='hover:bg-nav-item flex w-full items-center justify-between rounded-sm p-4 transition-all sm:flex-row-reverse'>
        <ChainIcon chain={chain as ChainWithDetails} className='h-6 w-6' />
        {balance?.value
          ? Number(formatEther(balance.value)).toLocaleString(navigator.language, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 4,
            })
          : 0}{' '}
        {currencies[chain.id as keyof typeof currencies]}
      </div>
      <Link
        href={bridges[chain.id as keyof typeof bridges]}
        target='_blank'
        className='hover:bg-nav-item text-text flex w-full items-center justify-between rounded-sm p-4 font-bold capitalize transition-all sm:flex-row-reverse'
      >
        <ExternalLink className='h-6 w-6' />
        <p className='text-end'>{`${currencies[chain.id as keyof typeof currencies]} ${t('bridge')}`}</p>
      </Link>
    </>
  )
}

export default EthBalance
