'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { cn } from '#/lib/utilities'
import LoadingSpinner from './loaders/loading-spinner'
import InterfaceLight from 'public/assets/icons/interface.png'
import { useEFPProfile } from '#/contexts/efp-profile-context'

interface FeedCardProps {
  cardSize?: string
  contentSize?: string
  title?: string
  description?: string
}

const FeedCard: React.FC<FeedCardProps> = ({ cardSize, contentSize, title, description }) => {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { lists, listsIsLoading } = useEFPProfile()

  const url = `https://app.interface.social/elements/profile/${userAddress}/feed?source=efp&theme=${resolvedTheme}`

  return (
    <div
      className={cn(
        'flex glass-card border-zinc-200 border-[3px] dark:border-zinc-500 items-center sm:items-end flex-col gap-1',
        cardSize
      )}
    >
      <div
        className={cn(
          'w-full flex items-start px-4 xs:px-0 xs:items-center',
          title ? 'justify-between' : 'justify-end'
        )}
      >
        {title && (
          <Link href={'/feed'} className='hover:scale-110 transition-transform'>
            <h2 className='text-2xl sm:text-3xl font-bold'>{title}</h2>
          </Link>
        )}
        <a
          href='https://www.interface.social/'
          target='_blank'
          rel='noreferrer'
          className='hover:scale-110 transition-transform'
        >
          <Image src={InterfaceLight} alt='Interface' width={150} height={35} />
        </a>
      </div>
      {description && (
        <p className='w-full px-4 xs:px-0 text-sm mt-3 text-center xs:text-start font-semibold text-zinc-500 dark:text-zinc-300'>
          {description}
        </p>
      )}
      <div
        className={cn(
          'w-full max-w-[900px] mt-4 flex justify-center overflow-hidden',
          contentSize,
          !listsIsLoading && (lists?.lists?.length || 0) === 0
            ? 'h-[60vh]'
            : 'h-screen xs:h-[100000vh]'
        )}
      >
        {userAddress ? (
          listsIsLoading ? (
            <div className='h-full w-full flex items-center justify-center bg-white dark:bg-black'>
              <LoadingSpinner />
            </div>
          ) : (lists?.lists?.length || 0) > 0 ? (
            <iframe
              key={`${userAddress} ${resolvedTheme}`}
              title='Feed'
              src={url}
              className='w-full h-full bg-white dark:bg-black'
            />
          ) : (
            <div className='w-full h-full max-h-[60vh] flex items-center font-semibold flex-col justify-center text-center'>
              <p className='text-lg font-bold'>{t('following myprofile empty first')}</p>
              <p className='text-base italic w-3/4 max-w-96'>
                {t('following myprofile empty second')}
              </p>
            </div>
          )
        ) : (
          <div className='h-full w-full flex items-center justify-center'>
            <button
              className='connect-button text-xl font-bold w-64 h-fit p-3'
              onClick={() => openConnectModal?.()}
            >
              {t('connect')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedCard
