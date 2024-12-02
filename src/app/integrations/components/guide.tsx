'use client'

import { useTranslation } from 'react-i18next'

const Guide = () => {
  const { t } = useTranslation()

  return (
    <div className='glass-card flex flex-col p-14 rounded-xl border-[3px] w-full content-center items-center gap-6 max-w-[1370px] border-grey'>
      <h2 className='text-3xl font-bold text-center '>{t('Integrations guide')}</h2>
      <p className='text-lg text-text-neutral text-center text-text/80'>
        {t('Integrations guide description')}
      </p>
    </div>
  )
}

export default Guide
