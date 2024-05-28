'use client'

import { useTranslation } from 'react-i18next'

const Legend = () => {
  const { t } = useTranslation('editor')

  return (
    <div className='flex gap-2 items-center'>
      <p className='font-semibold'>{t('legend')}</p>
      <div className='flex font-semibold items-center'>
        <div className='py-2 px-3 bg-[#A1F783] text-sm rounded-full'>{t('addition')}</div>
      </div>
      <div className='flex font-semibold items-center'>
        <div className='py-2 px-3 bg-[#FF8080] text-sm rounded-full'>{t('deletion')}</div>
      </div>
    </div>
  )
}

export default Legend
