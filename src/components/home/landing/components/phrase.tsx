'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import LineMobile from 'public/assets/lines/mobile/line-1.svg'
import LineDesktop from 'public/assets/lines/desktop/line-1.svg'

export default function Phrase() {
  const { t } = useTranslation('home')

  return (
    <div className='relative'>
      <p className='text-[25px] z-50 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold'>
        {t('phrase first')}
        <span className='text-[#ffc056]'>{t('phrase keyword')}</span>
        {t('phrase second')}
      </p>
      <Image
        src={LineDesktop}
        alt='line'
        width={79}
        height={420}
        className='pointer-events-none absolute lg:block hidden top-[41px] w-[71px] xl:w-[79px] left-[310px] xl:top-[53px] xl:left-[388px]'
      />
      <Image
        src={LineMobile}
        alt='line'
        width={3}
        className='lg:hidden pointer-events-none absolute top-[28px] left-[162px] sm:top-[28px] sm:left-[194px] md:top-[32px] md:left-[234px]'
      />
    </div>
  )
}
