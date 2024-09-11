'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'

import EnsDao from 'public/assets/sponsors/ensdao.svg'
import Line from 'public/assets/lines/desktop/line-5.svg'
import { LAUNCH_PARTNERS } from '#/lib/constants/partners'
import ShortLine from 'public/assets/lines/desktop/line-6.svg'
import EnsDaoDark from 'public/assets/sponsors/ensdao-dark.svg'
import { INTEGRATIONS } from '#/lib/constants/integrations'

const LaunchPartners = () => {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()

  return (
    <div className='flex flex-col items-center gap-0 relative'>
      {INTEGRATIONS.length > 0 && (
        <>
          <div className='glass-card z-10 sm:p-8 md:p-10 border-[3px] border-[#FF79C9] p-4 font-bold text-center text-sm rounded-3xl mx-auto w-full max-w-4xl'>
            <p className='text-3xl font-bold pb-6 sm:pb-8'>{t('integrations')}</p>
            <section className='w-full gap-y-8 z-10 gap-x-10 sm:gap-x-14 flex flex-row justify-evenly flex-wrap'>
              {INTEGRATIONS.map(partner => (
                <div key={partner.name} className='w-28 hover:scale-110 transition-transform'>
                  <Link
                    className='text-xs rounded-full space-y-2'
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
          <Image src={ShortLine} alt='line' width={3} height={20} className='' />
        </>
      )}
      <div className='glass-card z-10 sm:p-8 mb-12 md:p-10 border-[3px] border-[#FF79C9] p-4 font-bold text-center text-sm rounded-3xl mx-auto w-full max-w-4xl'>
        <p className='text-3xl font-bold pb-6 sm:pb-8'>{t('partners')}</p>
        <section className='w-full gap-y-8 z-10 gap-x-10 sm:gap-x-14 flex flex-row justify-evenly flex-wrap'>
          {LAUNCH_PARTNERS.map(partner => (
            <div key={partner.name} className='w-28 hover:scale-110 transition-transform'>
              <Link
                className='text-xs rounded-full space-y-2'
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
      <div className='glass-card w-full p-6 mx-auto border-[3px] border-[#FF79C9] text-dark-gray font-bold text-center text-sm rounded-3xl max-w-4xl'>
        <p className=' text-2xl sm:text-3xl font-bold pb-8'>{t('sponsors')}</p>
        <div className='mx-auto w-fit hover:scale-110 transition-transform'>
          <Link target='_blank' rel='noopener noreferrer' href='https://ensdao.org/'>
            <Image
              src={resolvedTheme === 'dark' ? EnsDaoDark : EnsDao}
              width='180'
              alt='ens dao'
              className='mx-auto w-44 sm:w-60 rounded-[2rem] border-[3px] border-[#B879FF]'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LaunchPartners
