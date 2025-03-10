import type React from 'react'
import LoadingCell from '../../../loaders/loading-cell'
import Plus from 'public/assets/icons/ui/plus-squared.svg'

interface LoadingRowProps {
  showTags?: boolean
}

const LoadingRow: React.FC<LoadingRowProps> = ({ showTags }) => {
  return (
    <div className='pointer-events-none flex h-20 items-center justify-between rounded-sm px-5'>
      <div className='flex items-center gap-2 sm:gap-3'>
        <LoadingCell className='h-[45px] w-[45px] rounded-full 2xl:h-[50px] 2xl:w-[50px]' />
        <div className='flex w-3/4 flex-col gap-[2px] sm:w-fit md:flex-row md:gap-2'>
          <div className={`relative flex w-fit flex-col items-start justify-center tabular-nums`}>
            <LoadingCell className={'h-5 w-28 rounded-sm 2xl:h-6 2xl:w-32'} />
          </div>
          {showTags && (
            <div className='relative flex w-[190px] flex-wrap items-center justify-start gap-2 sm:w-fit xl:w-[110px]'>
              <button className='bg-tertiary flex h-6 w-6 items-center justify-center rounded-sm hover:opacity-80'>
                <Plus className='h-auto w-3' />
              </button>
              <LoadingCell className='h-6 w-16 rounded-sm' />
              <LoadingCell className='h-6 w-16 rounded-sm xl:hidden' />
            </div>
          )}
        </div>
      </div>
      <LoadingCell className='h-[39px] w-[110px] rounded-sm' />
    </div>
  )
}

export default LoadingRow
