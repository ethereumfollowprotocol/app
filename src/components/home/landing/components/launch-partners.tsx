'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { LAUNCH_PARTNERS } from '#/lib/constants/partners'
import Line from 'public/assets/lines/desktop/line-5.svg'
import EnsDao from 'public/assets/sponsors/ensdao.png'

const LaunchPartners = () => {
  const { t } = useTranslation('home')

  return (
    <div className='flex flex-col items-center gap-14 relative'>
      <div className='glass-card z-10 sm:p-8 md:p-10 border-2 border-[#FF79C9] p-4 text-black font-bold text-center text-sm rounded-3xl mx-auto w-full max-w-4xl'>
        <p className='text-zinc-900 text-3xl font-bold pb-4 sm:pb-6'>{t('partners')}</p>
        <section className='w-full gap-y-8 z-10 gap-x-12 sm:gap-x-8 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 grid-rows-2'>
          {LAUNCH_PARTNERS.map(partner => (
            <div key={partner.name} className='w-full'>
              <Link
                className='text-black text-xs rounded-full space-y-2'
                target='_blank'
                rel='noopener noreferrer'
                href={partner.url}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={70}
                  className='mx-auto rounded-full sm:w-19'
                />
                <p
                  className='pt-1 mt-2 text-base sm:text-[1.3rem] font-bold'
                  style={{ lineHeight: '25px', fontSize: '17px' }}
                >
                  {partner.name}
                </p>
              </Link>
            </div>
          ))}
        </section>
      </div>
      <Image
        src={Line}
        alt='line'
        width={3}
        height={154}
        className='absolute -bottom-[100px] lg:-bottom-[170px]'
      />
      <div className='glass-card w-full p-6 mx-auto border-2 border-[#FF79C9] text-dark-gray font-bold text-center text-sm rounded-3xl max-w-4xl'>
        <p className=' text-2xl sm:text-3xl font-bold pb-8'>{t('sponsors')}</p>
        <div className='mx-auto w-fit'>
          <Link target='_blank' rel='noopener noreferrer' href='https://ensdao.org/'>
            <Image
              src={EnsDao}
              width='180'
              alt='ens dao'
              className='mx-auto w-44 sm:w-60 rounded-[2rem] border-2 border-[#B879FF]'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LaunchPartners
