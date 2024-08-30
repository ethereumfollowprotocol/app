'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import LineMobile from 'public/assets/lines/mobile/line-1.svg'
import LineDesktop from 'public/assets/lines/desktop/line-1.svg'

export default function Phrase() {
  const { t } = useTranslation()

  return (
    <div className='relative'>
      <p className='text-[25px] z-50 glass-card p-4 sm:p-6 rounded-xl text-xl xxs:text-2xl sm:text-3xl border-[3px] border-[#ffc056] md:text-4xl lg:text-5xl xl:text-6xl font-bold'>
        {t('phrase')}
      </p>
      <Image
        src={LineDesktop}
        alt='line'
        width={79}
        className='pointer-events-none absolute lg:block z-0 hidden top-[100px] w-[71px] xl:w-[79px] left-[344px] xl:top-[111px] xl:left-[423px]'
      />
      <Image
        src={LineMobile}
        alt='line'
        width={3}
        className='lg:hidden pointer-events-none absolute top-[63px] left-[155px] xxs:top-[68px] xxs:left-[180px] sm:top-[88px] sm:left-[228px] md:top-[92px] md:left-[268px]'
      />
    </div>
  )
}
