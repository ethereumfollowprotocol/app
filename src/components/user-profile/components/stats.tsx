import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { StatsResponse } from '#/types/requests'
import LoadingCell from '#/components/loaders/loading-cell'
import { formatNumber } from '#/utils/format/format-number'

interface StatsProps {
  stats?: StatsResponse | null
  isLoading?: boolean
}

const Stats = ({ stats, isLoading }: StatsProps) => {
  const pathname = usePathname()

  return (
    <div className='xs:gap-6 flex gap-4 sm:gap-8'>
      <Link href={`${pathname}?tab=following`} className='flex items-center gap-2 transition-all hover:scale-105'>
        {isLoading ? (
          <LoadingCell className='h-7 w-14 rounded-sm' />
        ) : (
          <p className='text-xl font-bold lg:text-2xl'>{formatNumber(stats?.following_count || 0)}</p>
        )}
        <p className='text-text-neutral text-lg lg:text-xl'>Following</p>
      </Link>
      <Link href={`${pathname}?tab=followers`} className='flex items-center gap-2 transition-all hover:scale-105'>
        {isLoading ? (
          <LoadingCell className='h-7 w-14 rounded-sm' />
        ) : (
          <p className='text-xl font-bold lg:text-2xl'>{formatNumber(stats?.followers_count || 0)}</p>
        )}
        <p className='text-text-neutral text-lg lg:text-xl'>Followers</p>
      </Link>
    </div>
  )
}

export default Stats
