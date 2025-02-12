'use client'

import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { cn } from '#/lib/utilities'
import LoadingSpinner from './loaders/loading-spinner'
import InterfaceLight from 'public/assets/icons/socials/interface.png'
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

  const url = `https://app.interface.social/elements/profile/${userAddress}/feed?source=efp&theme=${
    resolvedTheme === 'light' ? 'light' : 'dark'
  }`

  return (
    <div
      className={cn('glass-card border-grey flex flex-col items-center gap-1 border-[3px] sm:items-end', cardSize)}
      style={{
        backdropFilter: 'blur(1rem)',
      }}
    >
      <div
        className={cn(
          'xs:px-0 xs:items-center flex w-full items-start px-4',
          title ? 'justify-between' : 'justify-end'
        )}
      >
        {title && (
          // <Link href={'/feed'} className='hover:scale-110 transition-transform'>
          <h2 className='text-2xl font-bold 2xl:text-3xl'>{title}</h2>
          // </Link>
        )}
        <a
          href='https://www.interface.social/'
          target='_blank'
          rel='noreferrer'
          className='transition-transform hover:scale-110'
        >
          <Image src={InterfaceLight} alt='Interface' width={150} height={35} className='h-9 w-36' />
        </a>
      </div>
      {description && (
        <p className='xs:px-0 xs:text-start text-text/80 mt-3 w-full px-4 text-center text-sm font-semibold'>
          {description}
        </p>
      )}
      <div
        className={cn(
          'mt-4 flex w-full max-w-[900px] justify-center overflow-hidden',
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
              key={`${userAddress} ${resolvedTheme}`}
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
