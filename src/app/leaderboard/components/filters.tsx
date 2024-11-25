import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import type { LeaderboardFilter } from '#/types/common'
import { leaderboardFiltersEmojies, leaderboardFilters } from '#/lib/constants'

interface FiltersProps {
  filter: LeaderboardFilter
  onSelectFilter: (filter: LeaderboardFilter) => void
}

const Filters: React.FC<FiltersProps> = ({ filter, onSelectFilter }) => {
  const { t } = useTranslation()

  return (
    <div className='flex w-full flex-wrap justify-center items-center gap-4'>
      {leaderboardFilters.map((item, i) => (
        <div
          key={item}
          className={`p-2 font-bold px-4 flex gap-1 justify-center capitalize cursor-pointer transition-all rounded-full ${
            filter === item ? 'bg-text-neutral shadow-inner' : 'bg-grey hover:scale-110'
          }`}
          onClick={() => onSelectFilter(item)}
        >
          <p className='text-nowrap'>{t(item)}</p>
          <Image src={leaderboardFiltersEmojies[i]} alt={item} width={22} height={22} />
        </div>
      ))}
    </div>
  )
}

export default Filters
