'use client'

import Image from 'next/image'
import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useIsClient } from '@uidotdev/usehooks'

import { cn } from '#/lib/utilities'
import LoadingCell from './loaders/loading-cell'
import { RECOMMENDED_FEED_ADDRESS } from '#/lib/constants'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import InterfaceLight from 'public/assets/icons/socials/interface.png'
import InterfaceDark from 'public/assets/icons/socials/interface-dark.png'

let lastScrollTopHomePage = 0

interface FeedCardProps {
  cardSize?: string
  contentSize?: string
  title?: string
  description?: string
  activityAddress?: Address
}

const FeedCard: React.FC<FeedCardProps> = ({ cardSize, contentSize, activityAddress }) => {
  const { address: userAddress } = useAccount()
  const { lists, listsIsLoading } = useEFPProfile()

  const [activeTab, setActiveTab] = useState<'following' | 'recommendations'>(
    userAddress ? 'following' : 'recommendations'
  )

  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()

  const url = activityAddress
    ? `https://app.interface.social/elements/profile/${activityAddress}/activity`
    : `https://app.interface.social/elements/profile/${activeTab === 'following' ? userAddress : RECOMMENDED_FEED_ADDRESS}/feed?source=efp&theme=${
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

  const [isLoading, setIsLoading] = useState(!activityAddress)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  const isFeedLoading = !activityAddress && (listsIsLoading || isLoading)

  useEffect(() => {
    if (!isFeedLoading && lists?.lists?.length) setActiveTab('following')
  }, [userAddress, lists, isFeedLoading])

  return (
    <div className={cn('relative flex flex-col items-center gap-4 sm:items-end', cardSize)}>
      {!activityAddress && (
        <div
          className={cn(
            'bg-neutral shadow-medium sticky z-10 flex w-full items-center justify-between rounded-sm p-2 transition-all duration-300 sm:p-3',
            isMobile ? (displayHeaders ? 'top-[74px]' : '-top-[3px]') : '-top-[3px]'
          )}
        >
          {/* {title && <h2 className='text-xl font-bold sm:text-2xl'>{title}</h2>} */}
          {isFeedLoading ?
            <LoadingCell className='h-10 w-full sm:w-80' />
          : <div className='bg-grey relative flex w-full items-center rounded-sm sm:w-80'>
            <div
              className={cn(
                'bg-text/10 absolute h-full w-1/2 rounded-sm transition-all duration-200',
                activeTab === 'following' || !lists?.lists?.length ? 'left-0' : 'left-1/2'
              )}
            />
            {lists?.lists?.length && (
              <p
                className={cn(
                  'text-text z-10 w-1/2 cursor-pointer py-2 text-center text-lg font-bold transition-transform hover:scale-110',
                  activeTab === 'following' ? 'text-text' : 'text-text/60'
                )}
                onClick={() => setActiveTab?.('following')}
              >
                {t('following')}
              </p>
            )}
            <p
              className={cn(
                'text-text z-10 w-1/2 cursor-pointer py-2 text-center text-lg font-bold transition-transform hover:scale-110',
                activeTab === 'recommendations' ? 'text-text' : 'text-text/60'
              )}
              onClick={() => setActiveTab?.('recommendations')}
            >
              {t('recommendations')}
            </p>
          </div>}
          <div className='flex items-center gap-4 sm:gap-5'>
            <a
              href='https://www.interface.social/'
              target='_blank'
              rel='noreferrer'
              className='hidden transition-transform hover:scale-105 sm:block'
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
            {/* <button onClick={() => setFeedKey((prev) => prev + 1)} className='transition-transform hover:scale-110'>
              <RefreshIcon height={20} width={20} />
            </button> */}
          </div>
        </div>
      )}
      <div
        className={cn(
          'bg-neutral shadow-medium flex h-[100000vh] w-full max-w-[900px] justify-center overflow-hidden rounded-sm',
          contentSize
        )}
      >
        {isFeedLoading ?
          <LoadingCell className='h-[100000vh] w-full' />
        : <iframe
          key={`${userAddress} ${url} ${resolvedTheme}`}
          title='Feed'
          src={url}
          className='bg-neutral h-[100000vh] w-full'
        />}
      </div>
    </div>
  )
}

export default FeedCard
