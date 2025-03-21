import React from 'react'

import { formatNumber } from '#/utils/format/format-number'
import LoadingCell from '#/components/loaders/loading-cell'

interface StatProps {
  onClick: () => void
  isLoading: boolean
  value?: number
  label: string
}

const Stat: React.FC<StatProps> = ({ onClick, isLoading, value, label }) => {
  return (
    <div className='cursor-pointer transition-all hover:scale-110' onClick={onClick}>
      {isLoading ? (
        <LoadingCell className='mx-auto mb-1 h-6 w-12 rounded-sm' />
      ) : (
        <div className='3xl:text-2xl text-center text-[21px] font-bold'>{value ? formatNumber(value) : '-'}</div>
      )}
      <div className='3xl:text-lg text-text/40 text-[16px] font-bold'>{label}</div>
    </div>
  )
}

export default Stat
