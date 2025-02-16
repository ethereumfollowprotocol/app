import React from 'react'
import type { StatsResponse } from '#/types/requests'
import LoadingCell from '#/components/loaders/loading-cell'

interface StatsProps {
  stats?: StatsResponse | null
  isLoading?: boolean
}

const Stats = ({ stats, isLoading }: StatsProps) => {
  return (
    <div className='xs:gap-6 flex gap-4 sm:gap-8'>
      <div className='flex items-center gap-2'>
        {isLoading ? (
          <LoadingCell className='h-3 w-5' />
        ) : (
          <p className='text-2xl font-bold'>{stats?.following_count}</p>
        )}
        <p className='text-text-neutral text-xl'>Following</p>
      </div>
      <div className='flex items-center gap-2'>
        {isLoading ? (
          <LoadingCell className='h-3 w-5' />
        ) : (
          <p className='text-2xl font-bold'>{stats?.followers_count}</p>
        )}
        <p className='text-text-neutral text-xl'>Followers</p>
      </div>
    </div>
  )
}

export default Stats
