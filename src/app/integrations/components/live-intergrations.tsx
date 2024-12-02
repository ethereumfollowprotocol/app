'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import { INTEGRATIONS } from '#/lib/constants/integrations'
import { PrimaryButton } from '#/components/buttons/primary-button'

const LiveIntegrations = () => {
  const { t } = useTranslation()

  return (
    <div className='glass-card border-[3px] flex-col flex gap-12 items-center rounded-xl w-full p-10 max-w-[750px] border-grey'>
      <div className='flex flex-col gap-6 items-center h-full w-full'>
        <h1 className='text-4xl font-bold'>{t('integrations')}</h1>
        <p className='text-lg text-center font-medium text-text/70'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptas, et numquam
          deserunt itaque ipsa. Inventore velit ex quo doloremque nobis earum, iusto placeat nulla
          repellendus, veritatis quos non sapiente?
        </p>
      </div>
      <div className='flex flex-row w-full items-center justify-center flex-wrap gap-4'>
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
      <PrimaryButton
        label='Integrate Yourself'
        className='w-fit text-xl px-6'
        onClick={() => {
          window.open('https://ethfollow.xyz/integrations', '_blank')
        }}
      />
    </div>
  )
}

export default LiveIntegrations
