'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { RefreshIcon } from 'ethereum-identity-kit'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { cn } from '#/lib/utilities'
import LoadingSpinner from './loaders/loading-spinner'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import InterfaceLight from 'public/assets/icons/socials/interface.png'

interface FeedCardProps {
  cardSize?: string
  contentSize?: string
  title?: string
  description?: string
}

const FeedCard: React.FC<FeedCardProps> = ({ cardSize, contentSize, title, description }) => {
  const [feedKey, setFeedKey] = useState(0)
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { lists, listsIsLoading } = useEFPProfile()

  const url = `https://app.interface.social/elements/profile/${userAddress}/feed?source=efp&theme=${
    resolvedTheme === 'light' ? 'light' : 'dark'
  }`

  return (
    <div className={cn('flex flex-col items-center gap-4 sm:items-end', cardSize)}>
      <div className='bg-neutral shadow-medium flex w-full items-center justify-between rounded-sm p-4 px-4'>
        {title && <h2 className='text-xl font-bold sm:text-2xl 2xl:text-3xl'>{title}</h2>}
        <div className='flex items-center gap-4 sm:gap-5'>
          <a
            href='https://www.interface.social/'
            target='_blank'
            rel='noreferrer'
            className='transition-transform hover:scale-105'
          >
            <Image src={InterfaceLight} alt='Interface' width={150} height={35} className='h-auto w-32' />
          </a>
          <button onClick={() => setFeedKey((prev) => prev + 1)} className='transition-transform hover:scale-110'>
            <RefreshIcon height={24} width={24} />
          </button>
        </div>
      </div>
      <div
        className={cn(
          'bg-neutral shadow-medium flex w-full max-w-[900px] justify-center overflow-hidden',
          contentSize,
          !listsIsLoading && (lists?.lists?.length || 0) === 0 ? 'h-[60vh]' : 'h-[100000vh]'
        )}
      >
        {userAddress ? (
          listsIsLoading ? (
            <div className='bg-neutral flex h-full w-full items-center justify-center'>
              <LoadingSpinner />
            </div>
          ) : (lists?.lists?.length || 0) > 0 ? (
            <iframe
              key={`${userAddress} ${resolvedTheme} ${feedKey}`}
              title='Feed'
              src={url}
              className='bg-neutral h-full w-full'
            />
          ) : (
            <div className='flex h-full max-h-[60vh] w-full flex-col items-center justify-center text-center font-semibold'>
              <p className='text-lg font-bold'>{t('following myprofile empty first')}</p>
              <p className='w-3/4 max-w-96 text-base italic'>{t('following myprofile empty second')}</p>
            </div>
          )
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <button className='connect-button h-fit w-64 p-3 text-xl font-bold' onClick={() => openConnectModal?.()}>
              {t('connect')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedCard
