'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { INTEGRATIONS } from '#/lib/constants/integrations'

const LiveIntegrations = () => {
  const { t } = useTranslation()

  return (
    <div className='glass-card border-grey flex w-full max-w-[700px] flex-col items-center gap-8 rounded-sm border-[3px] px-6 py-8 sm:gap-10 md:gap-12 md:px-8 md:py-10 xl:items-start'>
      <div className='flex w-full flex-col gap-4 px-2'>
        <div className='flex h-full items-center justify-center gap-6 xl:justify-start'>
          <h1 className='text-3xl font-bold sm:text-4xl'>{t('integrations')}</h1>
          <div className='bg-grey flex flex-col gap-2 rounded-full px-4 py-1 text-2xl font-bold sm:px-5 sm:text-3xl'>
            {INTEGRATIONS.length}
          </div>
        </div>
        <p className='text-text/80 text-center xl:text-start'>{t('integrate description')}</p>
      </div>
      <div className='flex w-full flex-row flex-wrap items-center justify-evenly gap-4 sm:justify-center xl:justify-start'>
        {INTEGRATIONS.map((integration) => (
          <div key={integration.name} className='flex w-28 flex-col items-center transition-transform hover:scale-110'>
            <Link
              className='space-y-2 rounded-full text-xs'
              target='_blank'
              rel='noopener noreferrer'
              href={integration.url}
            >
              <Image
                src={integration.logo}
                alt={integration.name}
                width={60}
                className='mx-auto rounded-full sm:w-19'
              />
              <p className='mt-2 pt-1 text-center text-base font-bold' style={{ lineHeight: '25px', fontSize: '17px' }}>
                {integration.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LiveIntegrations
