'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { cn } from '#/lib/utilities'

import Discord from 'public/assets/icons/socials/discord.svg?url'
import Github from 'public/assets/icons/socials/github-white.svg?url'
import Image from 'next/image'
import Examples from './examples'

const RESOURCES = [
  {
    name: 'Ethereum Identity Kit',
    content: <p>Ethereum Identity Kit</p>,
    href: 'https://docs.efp.app/identity-kit/introduction',
    className: 'bg-primary font-bold text-dark-grey',
  },
  {
    name: 'Docs',
    content: <p>Documentation</p>,
    href: 'https://docs.efp.app',
    className: 'bg-neutral',
  },
  {
    name: 'API',
    content: <p>API</p>,
    href: 'https://docs.efp.app/api/',
    className: 'bg-neutral',
  },
  {
    name: 'Discord',
    content: <Image src={Discord} alt='Discord' width={32} height={32} className='h-auto w-10' />,
    href: 'https://discord.com/invite/ZUyG3mSXFD',
    className: 'bg-[#8C9EFF] text-white px-0',
  },
  {
    name: 'GitHub',
    content: <Image src={Github} alt='GitHub' width={32} height={32} className='h-auto w-7' />,
    href: 'https://github.com/ethereumfollowprotocol',
    className: 'bg-dark-grey text-white px-1.5',
  },
]

const Guide = () => {
  const { t } = useTranslation()

  return (
    <div className='mt-24 flex h-fit w-full flex-col items-start gap-12 rounded-sm px-4 sm:mt-12 sm:px-8 lg:mt-24 lg:max-w-[43vw] lg:px-0 xl:max-w-[550px] 2xl:max-w-[700px]'>
      <div className='flex flex-col gap-6'>
        <h2 className='text-5xl font-bold xl:text-start'>{t('integrate efp')}</h2>
        <p className='xxs:text-lg text-text/80 w-full text-start sm:w-[90%]'>{t('integrate efp description')}</p>
        <div className='flex w-full flex-row flex-wrap items-center justify-start gap-3'>
          {RESOURCES.map((resource) => (
            <Link
              key={resource.name}
              href={resource.href}
              className={cn(
                'shadow-small flex h-10 w-fit items-center justify-center gap-2 rounded-sm px-3 font-semibold transition-transform duration-300 hover:scale-110',
                resource.className
              )}
            >
              {resource.content}
            </Link>
          ))}
        </div>
      </div>
      <div className='hidden w-full lg:block'>
        <Examples />
      </div>
    </div>
  )
}

export default Guide
