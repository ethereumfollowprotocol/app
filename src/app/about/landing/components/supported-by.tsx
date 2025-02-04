'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'

import EnsDao from 'public/assets/sponsors/ensdao.svg'
import Mask from 'public/assets/sponsors/masknetwork.svg'
import Line from 'public/assets/lines/desktop/line-5.svg'
import EnsDaoDark from 'public/assets/sponsors/ensdao-dark.svg'
import MaskDark from 'public/assets/sponsors/masknetwork-dark.svg'

const SupportedBy = () => {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()

  return (
    <div className='flex flex-col items-center gap-0 relative'>
      <Image src={Line} alt='line' width={3} height={154} className='absolute -bottom-[100px] lg:-bottom-[250px]' />
      <div className='glass-card w-full flex flex-col gap-6 sm:gap-8 items-center px-4 py-6 mx-auto border-[3px] border-[#aaaaaa] text-dark-gray font-bold text-center text-sm rounded-3xl max-w-4xl'>
        <p className=' text-xl sm:text-2xl md:text-3xl font-bold'>{t('sponsors')}</p>
        <div className='items-center justify-center px-6 flex-col sm:flex-row w-full flex gap-4 sm:gap-8'>
          <Link target='_blank' rel='noopener noreferrer' href='https://ensdao.org/'>
            <Image
              src={resolvedTheme === 'dark' ? EnsDaoDark : EnsDao}
              width='180'
              alt='ens dao'
              className='mx-auto w-52 sm:w-60 rounded-[2rem] border-[3px] border-[#B879FF] hover:scale-110 transition-transform'
            />
          </Link>
          <Link target='_blank' rel='noopener noreferrer' href='https://mask.io/'>
            <Image
              src={resolvedTheme === 'dark' ? MaskDark : Mask}
              width='180'
              alt='Mask Network'
              className='mx-auto w-52 sm:w-60 hover:scale-110 transition-transform border-[3px] rounded-[2rem] border-[#1C68F3]'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SupportedBy
