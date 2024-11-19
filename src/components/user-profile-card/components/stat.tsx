import React from 'react'

import { formatNumber } from '#/utils/format/format-number'
import LoadingCell from '#/components/loaders/loading-cell'

interface StatProps {
  onClick: () => void
  isLoading: boolean
  stat?: number
  label: string
}

const Stat: React.FC<StatProps> = ({ onClick, isLoading, stat, label }) => {
  return (
    <div className='cursor-pointer hover:scale-110 transition-all' onClick={onClick}>
      {isLoading ? (
        <LoadingCell className='w-12 h-6 mb-1 rounded-lg mx-auto' />
      ) : (
        <div className='text-[21px] 3xl:text-2xl text-center font-bold'>
          {stat ? formatNumber(stat) : '-'}
        </div>
      )}
      <div className='text-[16px] 3xl:text-lg font-bold text-text/40'>{label}</div>
    </div>
  )
}

export default Stat
