import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import FeedCard from '#/components/feed-card'
import ExternalLink from 'public/assets/icons/ui/external-link.svg'

const OnchainActivity = () => {
  const { t } = useTranslation()

  return (
    <div className='bg-neutral shadow-medium flex w-full flex-col gap-3 rounded-sm px-2 pt-5 pb-0 sm:px-4 sm:pt-6'>
      <h4 className='px-2 text-xl font-bold sm:text-2xl'>{t('example activity title')}</h4>
      <p className='px-2 text-sm sm:max-w-[90%] sm:text-base'>{t('example activity description')}</p>
      <div className='ml-4 flex flex-col gap-1.5 italic sm:ml-10'>
        <Link
          href='https://ethidentitykit.com/docs/api/Users/following'
          target='_blank'
          className='flex w-fit items-center gap-2 transition-opacity hover:underline hover:opacity-60'
        >
          <p>{t('example activity api link')}</p>
          <ExternalLink className='h-4 w-auto' />
        </Link>
      </div>
      <div className='h-[500px] w-full overflow-scroll px-2'>
        <FeedCard />
      </div>
    </div>
  )
}

export default OnchainActivity
