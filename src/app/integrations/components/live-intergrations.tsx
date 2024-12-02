'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { INTEGRATIONS } from '#/lib/constants/integrations'

const LiveIntegrations = () => {
  const { t } = useTranslation()

  return (
    <div className='glass-card border-[3px] flex-col flex gap-8 sm:gap-10 md:gap-12 items-center xl:items-start rounded-xl w-full px-6 md:px-8 py-8 md:py-10 max-w-[700px] border-grey'>
      <div className='flex gap-6 px-2 items-center h-full'>
        <h1 className='text-3xl sm:text-4xl font-bold'>{t('integrations')}</h1>
        <div className='flex flex-col gap-2 font-bold rounded-full bg-grey text-2xl sm:text-3xl px-4 sm:px-5 py-1'>
          {INTEGRATIONS.length}
        </div>
      </div>
      <div className='flex flex-row w-full items-center justify-evenly sm:justify-center xl:justify-start flex-wrap gap-4'>
        {INTEGRATIONS.map(integration => (
          <div
            key={integration.name}
            className='w-28 hover:scale-110 flex items-center flex-col transition-transform'
          >
            <Link
              className='text-xs rounded-full space-y-2'
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
              <p
                className='pt-1 mt-2 text-base text-center font-bold'
                style={{ lineHeight: '25px', fontSize: '17px' }}
              >
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
