'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import LineMobile from 'public/assets/lines/mobile/line-1.svg'

export default function Phrase() {
  const { t } = useTranslation()

  return (
    <div className='relative'>
      <p className='text-[25px] z-50 glass-card p-4 sm:p-6 rounded-xl text-center text-xl xxs:text-2xl sm:text-3xl border-[3px] border-[#ffc056] md:text-4xl lg:text-5xl xl:text-6xl font-bold'>
        {t('phrase')}
      </p>
      <Image
        src={LineMobile}
        alt='line'
        width={3}
        className='lg:hidden pointer-events-none absolute -bottom-[57px] left-[49%]'
      />
    </div>
  )
}
