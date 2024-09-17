'use client'

import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { cn } from '#/lib/utilities'
import InterfaceLight from 'public/assets/icons/interface.png'

export default function Feed() {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()

  const url = `https://app.interface.social/elements/profile/${userAddress}/feed?source=efp&theme=${resolvedTheme}`

  return (
    <div className='w-full flex flex-col items-center pt-28 md:pt-32 lg:pt-32 xl:pt-[142px] px-0 xs:px-4 gap-6 sm:gap-8 md:gap-[38px]'>
      <div className='flex flex-col items-center gap-3 sm:gap-4 md:gap-5'>
        <h1 className='text-4xl sm:text-5xl font-bold text-darkGrey dark:text-white'>
          {t('Feed')}
        </h1>
        <p className='text-xl text-zinc-500 font-semibold text-center dark:text-zinc-300'>
          {t('feed description')}
        </p>
      </div>
      <div className='flex w-full max-w-[900px] pb-0 px-0 py-4 xs:px-4 sm:p-6 lg:p-10 lg:pt-6 glass-card rounded-2xl border-zinc-200 border-[3px] dark:border-zinc-500 items-center sm:items-end flex-col gap-4 sm:gap-6'>
        <div className='flex gap-3 items-center'>
          <p className='text-lg font-semibold text-zinc-500 dark:text-zinc-300'>
            {t('powered by')}
          </p>
          <a
            href='https://www.interface.social/'
            target='_blank'
            rel='noreferrer'
            className='hover:scale-110 transition-transform'
          >
            <Image src={InterfaceLight} alt='Interface' width={180} height={40} />
          </a>
        </div>
        <div
          className={cn(
            'w-full max-w-[900px] flex justify-center rounded-2xl h-screen xs:h-[100000vh]'
          )}
        >
          {userAddress ? (
            <iframe
              key={`${userAddress} ${resolvedTheme}`}
              title='Feed'
              src={url}
              className='w-full h-full rounded-2xl'
            />
          ) : (
            <button
              className='connect-button mx-auto mt-24 text-xl font-bold w-64 h-fit p-3'
              onClick={() => openConnectModal?.()}
            >
              {t('connect')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
