'use client'

import { useTranslation } from 'react-i18next'

import FeedCard from '#/components/feed-card'

export default function Feed() {
  const { t } = useTranslation()

  return (
    <div className='w-full flex flex-col items-center pt-28 md:pt-32 lg:pt-32 xl:pt-[142px] px-0 xs:px-4 gap-6 sm:gap-8 md:gap-[38px]'>
      <div className='flex flex-col items-center gap-3 sm:gap-4 md:gap-5'>
        <h1 className='text-4xl sm:text-5xl font-bold text-darkGrey dark:text-white'>
          {t('feed')}
        </h1>
        <p className='text-xl text-zinc-500 font-semibold text-center dark:text-zinc-300'>
          {t('feed description')}
        </p>
      </div>
      <FeedCard
        cardSize='w-full max-w-[900px] pb-0 px-0 pt-4 xs:px-4 sm:p-6 lg:p-10 lg:pt-6 rounded-t-2xl sm:rounded-2xl'
        contentSize='rounded-t-2xl sm:rounded-2xl'
      />
    </div>
  )
}
