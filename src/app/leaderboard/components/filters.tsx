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
    <div ref={clickAwayRef} className='relative z-40 mx-auto w-full max-w-108 md:w-64'>
      <div
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className='border-grey hover:border-text/80 bg-neutral z-30 flex h-[50px] w-full cursor-pointer flex-wrap items-center justify-between gap-4 rounded-xl border-[3px] px-3 transition-colors'
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
        <IoIosArrowDown className='h-4 w-4' />
      </div>
      <div
        className={cn(
          'bg-neutral border-grey absolute top-1/2 left-0 -z-10 h-fit w-full rounded-xl border-[3px] p-1 pt-6 transition-all',
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
              className='hover:bg-text/10 flex w-full cursor-pointer items-center gap-2 rounded-sm p-3'
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
