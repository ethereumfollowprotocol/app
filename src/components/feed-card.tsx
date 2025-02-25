'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { zeroAddress } from 'viem'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { RefreshIcon } from 'ethereum-identity-kit'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { cn } from '#/lib/utilities'
import LoadingSpinner from './loaders/loading-spinner'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import InterfaceLight from 'public/assets/icons/socials/interface.png'
import InterfaceDark from 'public/assets/icons/socials/interface-dark.png'
import { useIsClient } from '@uidotdev/usehooks'

let lastScrollTopHomePage = 0

interface FeedCardProps {
  cardSize?: string
  contentSize?: string
  title?: string
  description?: string
  activityAddress?: string
}

const FeedCard: React.FC<FeedCardProps> = ({ cardSize, contentSize, title, description, activityAddress }) => {
  const [feedKey, setFeedKey] = useState(0)
  const [activeTab, setActiveTab] = useState<'following' | 'for you'>('following')

  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { lists, listsIsLoading } = useEFPProfile()

  const url = activityAddress
    ? `https://app.interface.social/elements/profile/${activityAddress}/activity`
    : `https://app.interface.social/elements/profile/${activeTab === 'following' ? userAddress : zeroAddress}/feed?source=efp&theme=${
        resolvedTheme === 'light' ? 'light' : 'dark'
      }`

  const isClient = useIsClient()
  const [displayHeaders, setDisplayHeaders] = useState(false)
  const isMobile = isClient && window.innerWidth <= 640

  useEffect(() => {
    const homePage = document.getElementById('home-page')

    if (homePage && isMobile) {
      homePage.addEventListener(
        'scroll',
        () => {
          const deltaY = homePage.scrollTop - lastScrollTopHomePage
          if (deltaY <= 0) setDisplayHeaders(true)
          else setDisplayHeaders(false)
          lastScrollTopHomePage = homePage.scrollTop
        },
        { passive: false }
      )
    }
  }, [isMobile])

  useEffect(() => {
    if (!isClient) return

    const homePage = document.getElementById('home-page')
    if (homePage && homePage.scrollTop > 300) homePage.scrollTo({ top: 300, behavior: 'instant' })
  }, [activeTab])

  return (
    <div className={cn('relative flex flex-col items-center gap-4 sm:items-end', cardSize)}>
      {!activityAddress && (
        <div
          className={cn(
            'bg-neutral shadow-medium sticky z-10 flex w-full items-center justify-between rounded-sm p-2 transition-all duration-300 sm:p-3',
            isMobile ? (displayHeaders ? 'top-[74px]' : '-top-px') : 'top-0'
          )}
        >
          {/* {title && <h2 className='text-xl font-bold sm:text-2xl'>{title}</h2>} */}
          <div className='bg-grey relative flex w-full items-center rounded-sm sm:w-fit'>
            <div
              className={cn(
                'bg-text/10 absolute h-full w-32 rounded-sm transition-all duration-200',
                activeTab === 'following' ? 'left-0' : 'left-1/2 sm:left-32'
              )}
            />
            <p
              className={cn(
                'text-text z-10 w-32 cursor-pointer py-2 text-center text-lg font-bold transition-transform hover:scale-110',
                activeTab === 'following' ? 'text-text' : 'text-text/60'
              )}
              onClick={() => setActiveTab?.('following')}
            >
              {t('following')}
            </p>
            <p
              className={cn(
                'text-text z-10 w-32 cursor-pointer py-2 text-center text-lg font-bold transition-transform hover:scale-110',
                activeTab === 'for you' ? 'text-text' : 'text-text/60'
              )}
              onClick={() => setActiveTab?.('for you')}
            >
              {t('for you')}
            </p>
          </div>
          <div className='flex items-center gap-4 sm:gap-5'>
            <a
              href='https://www.interface.social/'
              target='_blank'
              rel='noreferrer'
              className='transition-transform hover:scale-105'
            >
              <Image
                src={InterfaceLight}
                alt='Interface'
                width={120}
                height={30}
                className='block h-auto dark:hidden'
              />
              <Image src={InterfaceDark} alt='Interface' width={120} height={30} className='hidden h-auto dark:block' />
            </a>
            <button onClick={() => setFeedKey((prev) => prev + 1)} className='transition-transform hover:scale-110'>
              <RefreshIcon height={20} width={20} />
            </button>
          </div>
        </div>
      )}
      <div
        className={cn(
          'bg-neutral shadow-medium flex w-full max-w-[900px] justify-center overflow-hidden rounded-sm',
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
              key={`${userAddress} ${url} ${resolvedTheme} ${feedKey}`}
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
