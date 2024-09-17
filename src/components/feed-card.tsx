'use client'

import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { cn } from '#/lib/utilities'
import InterfaceLight from 'public/assets/icons/interface.png'
import Link from 'next/link'

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
        <div className='flex gap-3 items-center'>
          <p className='text-xs font-semibold text-nowrap text-zinc-500 dark:text-zinc-300'>
            {t('powered by')}
          </p>
          <a
            href='https://www.interface.social/'
            target='_blank'
            rel='noreferrer'
            className='hover:scale-110 transition-transform'
          >
            <Image src={InterfaceLight} alt='Interface' width={120} height={30} />
          </a>
        </div>
      </div>
      {description && (
        <p className='w-full px-4 xs:px-0 text-sm text-center xs:text-start font-semibold text-zinc-500 dark:text-zinc-300'>
          {description}
        </p>
      )}
      <div
        className={cn(
          'w-full max-w-[900px] mt-4 flex justify-center overflow-hidden h-screen xs:h-[100000vh]',
          contentSize
        )}
      >
        {userAddress ? (
          <iframe
            key={`${userAddress} ${resolvedTheme}`}
            title='Feed'
            src={url}
            className='w-full h-full bg-white dark:bg-black'
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
  )
}

export default FeedCard
