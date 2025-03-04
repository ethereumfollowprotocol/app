'use client'

import React from 'react'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'

import Recommendations from '#/components/recommendations'
import ExternalLink from 'public/assets/icons/ui/external-link.svg'

const ConnectOnchain = () => {
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()

  return (
    <div className='bg-neutral shadow-medium flex w-full flex-col gap-0 overflow-hidden rounded-sm px-2 pt-6 pb-0 sm:gap-2 sm:px-4'>
      <h4 className='px-2 text-xl font-bold sm:text-2xl'>{t('example connect onchain title')}</h4>
      <p className='px-2 pt-3 text-sm sm:max-w-[90%] sm:pt-1 sm:text-base'>
        {t('example connect onchain description')}
      </p>
      <Link
        href='https://ethidentitykit.com/docs/api/Users/following'
        target='_blank'
        className='flex items-center gap-2 pl-10 italic transition-opacity hover:underline hover:opacity-60'
      >
        <p>{t('example connect onchain button link')}</p>
        <ExternalLink className='h-4 w-auto' />
      </Link>
      <div className='h-[380px] overflow-hidden'>
        <Recommendations
          endpoint={userAddress ? 'recommended' : 'discover'}
          limit={6}
          className='mt-0 p-0 shadow-none sm:px-3'
          showPageSelector={false}
        />
      </div>
    </div>
  )
}

export default ConnectOnchain
