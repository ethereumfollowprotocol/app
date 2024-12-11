'use client'

import Link from 'next/link'
import { AiOutlineApi } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { BsBook, BsDiscord, BsGithub } from 'react-icons/bs'
import { cn } from '#/lib/utilities'

const RESOURCES = [
  {
    name: 'Docs',
    icon: <BsBook />,
    href: 'https://docs.ethfollow.xyz',
    className: 'bg-followButton/90 text-darkGrey'
  },
  {
    name: 'API',
    icon: <AiOutlineApi />,
    href: 'https://docs.ethfollow.xyz/api/',
    className: 'bg-[#FFC7E9] text-darkGrey'
  },
  {
    name: 'Discord',
    icon: <BsDiscord />,
    href: 'https://discord.com/invite/ZUyG3mSXFD',
    className: 'bg-[#7289da] text-white'
  },
  {
    name: 'GitHub',
    icon: <BsGithub />,
    href: 'https://github.com/ethereumfollowprotocol',
    className: 'bg-darkGrey text-white'
  }
]

const Guide = () => {
  const { t } = useTranslation()

  return (
    <div className='glass-card flex flex-col px-4 py-8 sm:p-6 md:p-8 lg:p-10 items-center xl:items-start rounded-xl border-[3px] w-full max-w-[700px] h-fit gap-4 border-grey'>
      <h2 className='text-3xl xxs:text-4xl font-bold text-center xl:text-start'>
        {t('integrate efp')}
      </h2>
      <p className='xxs:text-lg text-text/80 text-center xl:text-start'>
        {t('integrate efp description')}
      </p>
      <div className='flex flex-row flex-wrap justify-center items-center w-full xl:justify-start mt-4 gap-4 md:gap-6'>
        {RESOURCES.map(resource => (
          <Link
            key={resource.name}
            href={resource.href}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              'flex flex-row w-36 xxs:w-40 sm:w-48 md:w-56 lg:w-64 rounded-xl hover:scale-105 font-semibold transition-transform p-3 xxs:p-4 lg:p-6 text-2xl xxs:text-3xl md:text-4xl lg:text-5xl md:h-24 lg:h-28 justify-between items-center text-text-neutral text-text/80',
              resource.className
            )}
          >
            <p className='text-xl xxs:text-2xl md:text-3xl lg:text-4xl'>{resource.name}</p>
            {resource.icon}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Guide
