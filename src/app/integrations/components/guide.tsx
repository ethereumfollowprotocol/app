'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { cn } from '#/lib/utilities'

import Book from 'public/assets/icons/ui/book.svg'
import API from 'public/assets/icons/ui/api.svg'
import Discord from 'public/assets/icons/socials/discord.svg'
import Github from 'public/assets/icons/socials/github.svg'

const RESOURCES = [
  {
    name: 'Docs',
    icon: <Book />,
    href: 'https://docs.efp.app',
    className: 'bg-followButton/90 text-darkGrey',
  },
  {
    name: 'API',
    icon: <API />,
    href: 'https://docs.efp.app/api/',
    className: 'bg-[#FFC7E9] text-darkGrey',
  },
  {
    name: 'Discord',
    icon: <Discord />,
    href: 'https://discord.com/invite/ZUyG3mSXFD',
    className: 'bg-[#7289da] text-white',
  },
  {
    name: 'GitHub',
    icon: <Github />,
    href: 'https://github.com/ethereumfollowprotocol',
    className: 'bg-darkGrey text-white',
  },
]

const Guide = () => {
  const { t } = useTranslation()

  return (
    <div className='glass-card border-grey flex h-fit w-full max-w-[700px] flex-col items-center gap-4 rounded-sm border-[3px] px-4 py-8 sm:p-6 md:p-8 lg:p-10 xl:items-start'>
      <h2 className='xxs:text-4xl text-center text-3xl font-bold xl:text-start'>{t('integrate efp')}</h2>
      <p className='xxs:text-lg text-text/80 text-center xl:text-start'>{t('integrate efp description')}</p>
      <div className='mt-4 flex w-full flex-row flex-wrap items-center justify-center gap-4 md:gap-6 xl:justify-start'>
        {RESOURCES.map((resource) => (
          <Link
            key={resource.name}
            href={resource.href}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              'xxs:w-40 xxs:p-4 xxs:text-3xl text-text/80 flex w-36 flex-row items-center justify-between rounded-sm p-3 text-2xl font-semibold transition-transform hover:scale-105 sm:w-48 md:h-24 md:w-56 md:text-4xl lg:h-28 lg:w-64 lg:p-6 lg:text-5xl',
              resource.className
            )}
          >
            <p className='xxs:text-2xl text-xl md:text-3xl lg:text-4xl'>{resource.name}</p>
            {resource.icon}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Guide
