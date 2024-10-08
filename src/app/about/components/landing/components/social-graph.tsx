'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import SocialGraphArt from './social-graph-art'
import LineDesktop from 'public/assets/lines/desktop/line-2.svg'
import LineDesktopTop from 'public/assets/lines/desktop/line-1.svg'
import LineMobileFirst from 'public/assets/lines/mobile/line-2.svg'
import LineMobileSecond from 'public/assets/lines/mobile/line-3.svg'

export default function SocialGraph() {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col lg:flex-row-reverse gap-8 lg:gap-[90px] xl:gap-32 items-center relative'>
      <div className='text-3xl flex lg:items-start items-center flex-col gap-1 lg:gap-3 z-20 md:text-4xl lg:text-5xl xl:text-6xl glass-card font-bold px-4 py-4 lg:px-5 lg:py-5 border-[3px] border-[#ffc18a] rounded-2xl'>
        <p className='text-center lg:text-start'>{t('social graph first')}</p>
        <p className='text-[#ffb4a1] text-center lg:text-start'>{t('social graph second')}</p>
      </div>
      {/* <Image
        src={SocialGraphImage}
        alt='Social Graph'
        width={500}
        className='pointer-events-none z-10 mr-8 md:mr-10 w-[330px] md:w-[450px] lg:w-[425px] xl:w-[500px]'
      /> */}
      <SocialGraphArt />
      <Image
        src={LineDesktopTop}
        alt='line'
        width={79}
        className='pointer-events-none absolute lg:block z-0 hidden -top-[150px] w-[71px] xl:w-[79px] left-[520px] xl:-top-[150px] xl:left-[590px]'
      />
      <Image
        src={LineDesktop}
        alt='line'
        width={415}
        className='pointer-events-none hidden lg:block absolute lg:w-[390px] xl:w-[418px] lg:top-[280px] lg:left-[361px] xl:top-[325px] xl:left-[420px]'
      />
      <Image
        src={LineMobileFirst}
        alt='line'
        width={3}
        className='pointer-events-none absolute bottom-[350px] lg:hidden xxs:bottom-[410px]'
      />
      <Image
        src={LineMobileSecond}
        alt='line'
        width={3}
        className='pointer-events-none absolute w-1 -bottom-[48px] md:-bottom-[55px] lg:hidden'
      />
    </div>
  )
}
