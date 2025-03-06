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
        <div className='flex w-3/4 flex-col gap-[2px] sm:w-fit md:flex-row md:gap-3'>
          <div className={`relative flex w-fit flex-col items-start justify-center tabular-nums`}>
            <LoadingCell className={'h-5 w-28 rounded-sm 2xl:h-6 2xl:w-32'} />
          </div>
          {showTags && (
            <div className='relative flex w-[190px] flex-wrap items-center justify-start gap-2 sm:w-fit xl:w-[110px]'>
              <button className='flex h-5 w-5 items-center justify-center rounded-full bg-zinc-300 hover:opacity-80'>
                <Plus />
              </button>
              <LoadingCell className='h-6 w-16 rounded-full 2xl:h-7' />
              <LoadingCell className='h-6 w-16 rounded-full xl:hidden' />
            </div>
          )}
        </div>
      </div>
      <LoadingCell className='h-[39px] w-[110px] rounded-sm' />
    </div>
  )
}

export default LoadingRow
