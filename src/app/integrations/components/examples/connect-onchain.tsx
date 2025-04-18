'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import Recommendations from '#/components/recommendations'
import ExternalLink from 'public/assets/icons/ui/external-link.svg'

const ConnectOnchain = () => {
  const { t } = useTranslation()

  return (
    <div className='bg-neutral shadow-medium flex w-full flex-col overflow-hidden rounded-sm pt-6 pb-0'>
      <div className='flex flex-col gap-4 px-6'>
        <h4 className='text-xl font-bold sm:text-2xl'>{t('example connect onchain title')}</h4>
        <p className='text-sm sm:max-w-[90%] sm:text-base'>{t('example connect onchain description')}</p>
        <Link
          href='https://ethidentitykit.com/docs/api/Users/following'
          target='_blank'
          className='flex w-fit items-center gap-2 pl-6 italic transition-opacity hover:underline hover:opacity-60'
        >
          <p>{t('example connect onchain button link')}</p>
          <ExternalLink className='h-4 w-auto' />
        </Link>
      </div>
      <div className='h-[380px] w-full overflow-hidden'>
        <Recommendations endpoint={'recommended'} limit={6} className='mt-0 p-0 shadow-none' showPageSelector={false} />
      </div>
    </div>
  )
}

export default ConnectOnchain
