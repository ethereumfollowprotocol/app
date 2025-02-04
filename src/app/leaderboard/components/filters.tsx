import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoIosArrowDown } from 'react-icons/io'
import { useClickAway } from '@uidotdev/usehooks'

import { cn } from '#/lib/utilities'
import type { LeaderboardFilter } from '#/types/common'
import { leaderboardFiltersEmojies, leaderboardFilters } from '#/lib/constants'

interface FiltersProps {
  filter: LeaderboardFilter
  onSelectFilter: (filter: LeaderboardFilter) => void
}

const Filters: React.FC<FiltersProps> = ({ filter, onSelectFilter }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const clickAwayRef = useClickAway<HTMLDivElement>(() => setIsDropdownOpen(false))

  const { t } = useTranslation()

  return (
    <div ref={clickAwayRef} className='relative w-full md:w-64 z-40 mx-auto max-w-108'>
      <div
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className='flex w-full cursor-pointer flex-wrap h-[50px] z-30 justify-between px-3 border-grey hover:border-text/80 transition-colors rounded-xl border-[3px] bg-neutral items-center gap-4'
      >
        <div
          key={filter}
          className={`font-bold flex gap-1 justify-center capitalize cursor-pointer transition-all rounded-full`}
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
        <IoIosArrowDown className='w-4 h-4' />
      </div>
      <div
        className={cn(
          'absolute top-1/2 rounded-xl left-0 bg-neutral p-1 border-grey border-[3px] -z-10 w-full h-fit pt-6 transition-all',
          isDropdownOpen ? 'flex' : 'hidden pointer-events-none'
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
              className='flex cursor-pointer items-center gap-2 p-3 w-full rounded-lg hover:bg-text/10'
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
