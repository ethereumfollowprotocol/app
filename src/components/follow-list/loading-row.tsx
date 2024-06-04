import type React from 'react'
import Image from 'next/image'
import LoadingCell from '../loading-cell'
import Plus from 'public/assets/icons/plus-squared.svg'

interface LoadingRowProps {
  isEditor?: boolean
  className?: string
}

const LoadingRow: React.FC<LoadingRowProps> = ({ isEditor, className }) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className={`flex gap-2 sm:gap-3 items-center`}>
        <LoadingCell className='h-[45px] w-[45px] md:h-[50px] md:w-[50px] rounded-full' />
        <div className='flex flex-col md:flex-row gap-[2px] w-3/4 sm:w-fit md:gap-3'>
          <div
            className={`flex flex-col justify-center w-fit ${
              isEditor ? 'md:w-52' : ''
            } items-start tabular-nums relative`}
          >
            <LoadingCell className='w-40 h-7 rounded-lg' />
          </div>
          {isEditor && (
            <div className='relative flex w-[190px] flex-wrap gap-2 items-center sm:w-fit'>
              <button className='h-5 w-5 flex items-center justify-center rounded-full hover:opacity-80 bg-gray-300'>
                <Image src={Plus} alt='Add Tag' height={10} width={10} />
              </button>
              <LoadingCell className='h-6 w-16 rounded-full' />
              <LoadingCell className='h-6 w-16 rounded-full' />
            </div>
          )}
        </div>
      </div>
      <LoadingCell className='w-[107px] h-[37px] rounded-xl' />
    </div>
  )
}

export default LoadingRow
