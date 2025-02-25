'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { INTEGRATIONS } from '#/lib/constants/integrations'
import Apps from 'public/assets/icons/ui/apps.svg'
import ExternalLink from 'public/assets/icons/ui/external-link.svg'
import { useState, useEffect } from 'react'
import { useIsClient } from '@uidotdev/usehooks'
import ArrowDown from 'public/assets/icons/ui/arrow-down.svg'

const LiveIntegrations = () => {
  const [displayIntegrations, setDisplayIntegrations] = useState(INTEGRATIONS.length)

  const isClient = useIsClient()
  const { t } = useTranslation()

  useEffect(() => {
    if (isClient) {
      if (window.innerWidth <= 1024) setDisplayIntegrations(8)
      if (window.innerWidth <= 768) setDisplayIntegrations(6)
    }
  }, [isClient])

  return (
    <div className='flex w-full flex-col items-center lg:w-[480px] lg:min-w-[480px] xl:w-[600px] xl:items-end'>
      <div className='bg-neutral shadow-medium z-20 flex w-full flex-col gap-4 px-2'>
        <div className='flex h-12 items-center justify-start gap-1.5'>
          <Apps className='h-7 w-7' />
          <h1 className='text-xl font-bold'>{t('integrations')}</h1>
          <p className='text-text-neutral pl-1'>{INTEGRATIONS.length}</p>
        </div>
      </div>
      <div className='flex w-full flex-row flex-wrap items-center justify-start lg:justify-end'>
        {INTEGRATIONS.slice(0, displayIntegrations).map((integration) => (
          <Link
            key={integration.name}
            className='bg-neutral group/integration relative flex aspect-square w-1/3 items-end overflow-hidden transition-transform md:w-1/4 lg:w-1/3'
            target='_blank'
            rel='noopener noreferrer'
            href={integration.url}
          >
            <Image
              src={integration.logo}
              alt={integration.name}
              width={200}
              className='absolute top-0 left-0 mx-auto h-full w-full'
            />
            <div className='z-10 flex h-[80px] w-full flex-row items-end justify-between bg-gradient-to-t from-black/75 to-transparent p-3 text-white transition-transform duration-300 group-hover/integration:translate-y-0 lg:translate-y-full xl:p-4'>
              <p className='tex-base z-10 font-bold xl:max-w-[140px] xl:text-lg'>{integration.name}</p>
              <ExternalLink className='mb-1 h-5! w-auto' />
            </div>
          </Link>
        ))}
      </div>
      {displayIntegrations < INTEGRATIONS.length && (
        <div
          onClick={() => setDisplayIntegrations(displayIntegrations * 2)}
          className='bg-neutral shadow-medium flex w-full cursor-pointer flex-row items-center justify-center gap-2 p-3'
        >
          <p className='text-sm font-semibold'>Show more</p>
          <ArrowDown className='h-4 w-4' />
        </div>
      )}
    </div>
  )
}

export default LiveIntegrations
