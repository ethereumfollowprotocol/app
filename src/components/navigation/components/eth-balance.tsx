import React from 'react'
import { t } from 'i18next'
import Link from 'next/link'
import { useBalance } from 'wagmi'
import { formatEther } from 'viem'
import type { Address, Chain } from 'viem'
import { FiExternalLink } from 'react-icons/fi'
import { base, mainnet, optimism } from 'viem/chains'

import type { ChainWithDetails } from '#/lib/wagmi'
import { ChainIcon } from '#/components/chain-icon'

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
      <div className="flex justify-between items-center w-full group-hover:bg-navItem p-3 rounded-md transition-opacity">
        <ChainIcon chain={chain as ChainWithDetails} className="h-6 w-6" />
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
        target="_blank"
        className="capitalize flex justify-between items-center transition-colors p-3 w-full rounded-md hover:bg-navItem text-text font-bold"
      >
        <FiExternalLink className="text-2xl" />
        <p className="text-end">{`${currencies[chain.id as keyof typeof currencies]} ${t('bridge')}`}</p>
      </Link>
    </>
  )
}

export default EthBalance
