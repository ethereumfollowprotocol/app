import type React from 'react'
import Image from 'next/image'
import LoadingCell from '../../../loaders/loading-cell'
import Plus from 'public/assets/icons/plus-squared.svg'

interface LoadingRowProps {
  showTags?: boolean
  className?: string
}

const LoadingRow: React.FC<LoadingRowProps> = ({ showTags, className }) => {
  return (
    <div className={`flex items-center p-2 justify-between ${className} pointer-events-none`}>
      <div className={`flex gap-2 sm:gap-3 items-center`}>
        <LoadingCell className='h-[45px] w-[45px] md:h-[50px] md:w-[50px] rounded-full' />
        <div className='flex flex-col md:flex-row gap-[2px] w-3/4 sm:w-fit md:gap-3'>
          <div className={`flex flex-col justify-center w-fit items-start tabular-nums relative`}>
            <LoadingCell className={'w-28 xl:w-32 h-7 rounded-lg'} />
          </div>
          {showTags && (
            <div className='relative justify-start flex xl:w-[110px] w-[190px] flex-wrap gap-2 items-center sm:w-fit'>
              <button className='h-5 w-5 flex items-center justify-center rounded-full hover:opacity-80 bg-zinc-300'>
                <Image src={Plus} alt='Add Tag' height={10} width={10} />
              </button>
              <LoadingCell className='h-6 xl:h-7 w-16 rounded-full' />
              <LoadingCell className='h-6 w-16 xl:hidden rounded-full' />
            </div>
          )}
        </div>
      </div>
      <LoadingCell className='h-10 w-[120px] rounded-xl' />
    </div>
  )
}

export default LoadingRow
