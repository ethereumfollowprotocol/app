import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import { cn } from '#/lib/utilities'
import Refresh from 'public/assets/icons/ui/refresh.svg'
import { formatNumber } from '#/utils/format/format-number'

interface TopRowProps {
  profileList?: number | null
  name?: string | null
  primaryList?: number | null
  isConnectedUserCard: boolean
  refetchProfile?: () => void
}

const TopRow: React.FC<TopRowProps> = ({ profileList, name, primaryList, isConnectedUserCard, refetchProfile }) => {
  const [cardTooltipOpen, setCardTooltipOpen] = useState(false)
  const clickAwayCardTooltip = useClickAway<HTMLDivElement>(() => {
    setCardTooltipOpen(false)
  })

  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'absolute top-3 left-0 flex h-5 w-full items-center gap-2 px-2 font-bold',
        profileList ? 'justify-between' : 'justify-end'
      )}
    >
      {profileList && (
        <p className='bg-neutral/80 rounded-full px-2 py-[3px] text-sm sm:text-sm'>
          {t('list')} #{formatNumber(profileList)}
        </p>
      )}
      <div className='flex items-center gap-1'>
        {profileList && profileList !== Number(primaryList) ? (
          <div ref={clickAwayCardTooltip} className='group relative z-50 cursor-help'>
            <p
              onClick={() => setCardTooltipOpen(!cardTooltipOpen)}
              className='bg-neutral/80 rounded-full px-2 py-0.5 text-end text-[12px] italic'
            >
              {t('not primary list')}
            </p>
            <div
              className={`${
                cardTooltipOpen ? 'block' : 'hidden'
              } glass-card border-grey bg-neutral/90 absolute top-5 right-0 mt-2 w-68 rounded-sm border-[3px] p-2 text-sm transition-all group-hover:block`}
            >
              {t('not primary list tooltip')}
            </div>
          </div>
        ) : isConnectedUserCard ? (
          <a
            href={`https://app.ens.domains/${name || ''}`}
            target='_blank'
            rel='noreferrer'
            className='bg-neutral/80 flex items-center gap-1.5 rounded-full px-2 py-[3px] pl-1 transition-all hover:scale-110'
          >
            <Image
              alt='edit profile'
              src='/assets/icons/ens.svg'
              width={22}
              height={22}
              className={cn('cursor-pointer transition-all hover:opacity-70')}
            />
            {/* <FaEdit className="text-[17px] -translate-y-[1px]" /> */}
            <p className={cn('text-sm')}>{t('edit profile')}</p>
          </a>
        ) : null}
        {refetchProfile && (
          <button
            className='bg-neutral/80 rounded-full p-1.5 transition-all hover:scale-110'
            onClick={() => refetchProfile()}
            aria-label='refresh profile'
          >
            <Refresh />
          </button>
        )}
      </div>
    </div>
  )
}

export default TopRow
