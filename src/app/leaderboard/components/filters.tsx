import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import { cn } from '#/lib/utilities'
import type { LeaderboardFilter } from '#/types/common'
import { leaderboardFiltersEmojies, leaderboardFilters } from '#/lib/constants'
import ArrowDown from 'public/assets/icons/ui/arrow-down.svg'
interface FiltersProps {
  filter: LeaderboardFilter
  onSelectFilter: (filter: LeaderboardFilter) => void
}

const Filters: React.FC<FiltersProps> = ({ filter, onSelectFilter }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const clickAwayRef = useClickAway<HTMLDivElement>(() => setIsDropdownOpen(false))

  const { t } = useTranslation()

  return (
    <div ref={clickAwayRef} className='relative z-40 w-fit'>
      <div
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className='hover:border-text/80 bg-neutral z-30 flex h-[50px] w-full cursor-pointer flex-wrap items-center justify-between gap-4 rounded-sm px-3 transition-colors'
      >
        <div
          key={filter}
          className={`flex cursor-pointer justify-center gap-1 rounded-full font-bold capitalize transition-all`}
          onClick={() => onSelectFilter(filter)}
        >
          <p className='text-nowrap'>{t(filter)}</p>
          <Image
            src={leaderboardFiltersEmojies[leaderboardFilters.indexOf(filter)]}
            alt={filter}
            width={22}
            height={22}
          />
        </div>
        <ArrowDown className='h-4 w-4' />
      </div>
      <div
        className={cn(
          'bg-neutral shadow-medium absolute top-full -left-1 -z-10 h-fit w-44 rounded-sm transition-all',
          isDropdownOpen ? 'flex' : 'pointer-events-none hidden'
        )}
      >
        <div className='flex w-full flex-col'>
          {leaderboardFilters.map((item) => (
            <div
              key={item}
              onClick={() => {
                onSelectFilter(item)
                setIsDropdownOpen(false)
              }}
              className='hover:bg-text/10 flex w-full cursor-pointer items-center gap-2 rounded-sm p-4'
            >
              <p className='font-bold'>{t(item)}</p>
              <Image
                src={leaderboardFiltersEmojies[leaderboardFilters.indexOf(item)]}
                alt={item}
                width={22}
                height={22}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Filters
