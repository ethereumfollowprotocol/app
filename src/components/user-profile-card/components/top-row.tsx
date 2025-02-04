import Image from 'next/image'
import React, { useState } from 'react'
import { FaSyncAlt } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import { cn } from '#/lib/utilities'
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
        'flex gap-2 items-center h-5 absolute px-2 w-full left-0 top-3 font-bold',
        profileList ? 'justify-between' : 'justify-end'
      )}
    >
      {profileList && (
        <p className='text-sm sm:text-sm bg-neutral/80 py-[3px] px-2 rounded-full'>
          {t('list')} #{formatNumber(profileList)}
        </p>
      )}
      <div className='flex items-center gap-1'>
        {profileList && profileList !== Number(primaryList) ? (
          <div ref={clickAwayCardTooltip} className='relative group z-50 cursor-help'>
            <p
              onClick={() => setCardTooltipOpen(!cardTooltipOpen)}
              className='text-[12px] italic text-end rounded-full py-0.5 px-2 bg-neutral/80'
            >
              {t('not primary list')}
            </p>
            <div
              className={`${
                cardTooltipOpen ? 'block' : 'hidden'
              } group-hover:block transition-all text-sm w-68 p-2 glass-card border-grey bg-neutral/90 border-[3px] mt-2 rounded-md absolute top-5 right-0`}
            >
              {t('not primary list tooltip')}
            </div>
          </div>
        ) : isConnectedUserCard ? (
          <a
            href={`https://app.ens.domains/${name || ''}`}
            target='_blank'
            rel='noreferrer'
            className='flex gap-1.5 items-center hover:scale-110 transition-all bg-neutral/80 rounded-full py-[3px] px-2 pl-1'
          >
            <Image
              alt='edit profile'
              src='/assets/icons/ens.svg'
              width={22}
              height={22}
              className={cn('cursor-pointer hover:opacity-70 transition-all')}
            />
            {/* <FaEdit className="text-[17px] -translate-y-[1px]" /> */}
            <p className={cn(' text-sm')}>{t('edit profile')}</p>
          </a>
        ) : null}
        {refetchProfile && (
          <button
            className='bg-neutral/80 p-1.5 rounded-full hover:scale-110 transition-all'
            onClick={() => refetchProfile()}
            aria-label='refresh profile'
          >
            <FaSyncAlt />
          </button>
        )}
      </div>
    </div>
  )
}

export default TopRow
