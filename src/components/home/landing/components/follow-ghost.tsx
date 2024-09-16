'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import LineDesktop from 'public/assets/lines/desktop/line-3.svg'
import LineMobileFirst from 'public/assets/lines/mobile/line-4.svg'
import LineMobileSecond from 'public/assets/lines/mobile/line-5.svg'
import FriendsEnemies from 'public/assets/art/friends-enemies.svg'
import FriendsEnemiesMobile from 'public/assets/art/friends-enemies-mobile.svg'

const FollowGhost = () => {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col lg:flex-row gap-[52px] lg:gap-16 xl:gap-40 items-center relative'>
      <div className='text-3xl flex flex-col md:text-3xl glass-card lg:text-5xl z-20 lg:items-start items-center xl:text-6xl font-bold w-fit p-4 gap-2 lg:px-8 lg:py-[22px] border-[3px] border-[#ffa5b8] rounded-2xl'>
        <p className=' text-center lg:text-start'>{t('follow ghost first')}</p>
        <p className='text-[#ffa5b8] text-center lg:text-start'>{t('follow ghost second')}</p>
      </div>
      <Image
        src={FriendsEnemies}
        alt='Friends Enemies'
        width={400}
        className='pointer-events-none hidden lg:block lg:w-[360px] xl:w-[400px]'
      />
      <Image
        src={FriendsEnemiesMobile}
        alt='Social Graph'
        width={350}
        className='pointer-events-none z-10 lg:hidden'
      />
      <Image
        src={LineDesktop}
        alt='line'
        width={441}
        className='pointer-events-none hidden lg:block absolute w-[448px] xl:w-[441px] -bottom-[153px] right-[155px] xl:right-[330px]'
      />
      <Image
        src={LineMobileFirst}
        alt='line'
        width={3}
        className='pointer-events-none absolute lg:hidden left-[47%] bottom-[41vw] 3xs:bottom-[158px]'
      />
      <Image
        src={LineMobileSecond}
        alt='line'
        width={4}
        className='pointer-events-none absolute lg:hidden right-[17%] xxs:right-[20%] xs:right-[17.5%] -bottom-[47px]'
      />
    </div>
  )
}

export default FollowGhost
