'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import CompleteProfile from './complete-profile'
import OnchainActivity from './onchain-activity'
import ConnectOnchain from './connect-onchain'

const Examples = () => {
  const { t } = useTranslation()

  return (
    <div className='flex w-full max-w-[650px] flex-col gap-6 pb-12'>
      <h3 className='text-3xl font-bold'>{t('examples')}</h3>
      <CompleteProfile />
      <OnchainActivity />
      <ConnectOnchain />
    </div>
  )
}

export default Examples
