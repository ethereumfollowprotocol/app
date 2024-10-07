'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import LineDesktop from 'public/assets/lines/desktop/line-4.svg'
import LineMobile from 'public/assets/lines/mobile/line-6.svg'
import FollowerListArt from 'public/assets/art/follower-list.svg'

const FollowerList = () => {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col lg:flex-row-reverse gap-10 lg:gap-40 xl:gap-52 items-center relative'>
      <div className='flex glass-card flex-col text-3xl z-20 md:text-4xl items-center lg:items-start lg:text-5xl xl:text-6xl font-bold gap-1 sm:gap-2 lg:gap-4 py-4 px-9 lg:px-8  lg:py-6 border-[3px] border-[#ee90bc] rounded-2xl'>
        <p className='text-center lg:text-start'>{t('follower list first')}</p>
        <p className='text-[#ee90bc] text-center lg:text-start'>{t('follower list second')}</p>
      </div>
      <Image
        src={FollowerListArt}
        alt='Social Graph'
        width={350}
        className='hidden lg:block lg:w-[350px]'
      />
      <Image
        src={LineDesktop}
        alt='line'
        width={3}
        className='absolute hidden lg:block -bottom-[153px] xl:-bottom-[153px] left-[760px] xl:left-[768px]'
      />
      <Image src={LineMobile} alt='line' width={4} className='absolute lg:hidden -bottom-[46px] ' />
    </div>
  )
}

export default FollowerList
