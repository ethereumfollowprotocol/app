import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import ExternalLink from 'public/assets/icons/ui/external-link.svg'
import CompleteProfileImageLight from 'public/assets/art/example-profile-light.png'
import CompleteProfileImageDark from 'public/assets/art/example-profile-dark.png'

const CompleteProfile = () => {
  const { t } = useTranslation()

  return (
    <div className='bg-neutral shadow-medium flex w-full flex-col gap-2 rounded-sm pt-6 pr-1'>
      <h4 className='px-4 text-xl font-bold sm:px-6 sm:text-2xl'>{t('example profile title')}</h4>
      <div className='flex w-full flex-col gap-2 px-4 text-sm sm:w-[90%] sm:px-6 sm:text-base'>
        <p>{t('example profile description')}</p>
        <div className='ml-4 flex flex-col gap-1.5 italic sm:ml-10'>
          <Link
            href='https://ethidentitykit.com/docs/components/profile-card'
            target='_blank'
            className='flex items-center gap-2 transition-opacity hover:underline hover:opacity-60'
          >
            <p>{t('example profile card link')}</p>
            <ExternalLink className='h-4 w-auto' />
          </Link>
          <Link
            href='https://ethidentitykit.com/docs/api/Users/stats'
            target='_blank'
            className='flex items-center gap-2 transition-opacity hover:underline hover:opacity-60'
          >
            <p>{t('example profile count link')}</p>
            <ExternalLink className='h-4 w-auto' />
          </Link>
          <Link
            href='https://ethidentitykit.com/docs/api/Users/ens'
            target='_blank'
            className='flex items-center gap-2 transition-opacity hover:underline hover:opacity-60'
          >
            <p>{t('example profile ens link')}</p>
            <ExternalLink className='h-4 w-auto' />
          </Link>
        </div>
      </div>
      <Image src={CompleteProfileImageLight} alt='Complete Profile' className='block w-full rounded-sm dark:hidden' />
      <Image src={CompleteProfileImageDark} alt='Complete Profile' className='hidden w-full rounded-sm dark:block' />
    </div>
  )
}

export default CompleteProfile
