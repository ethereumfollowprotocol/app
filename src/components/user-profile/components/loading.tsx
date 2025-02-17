import React from 'react'
import LoadingCell from '../../loaders/loading-cell'

const Loading = () => {
  return (
    <div className='relative w-full px-4 pt-12 pb-36 xl:px-8'>
      <LoadingCell className='absolute top-0 left-0 h-full w-full' />
      <div className='absolute top-6 right-8 flex gap-2'>
        <LoadingCell className='h-7 w-14 rounded-sm' />
        <LoadingCell className='h-7 w-7 rounded-sm' />
        <LoadingCell className='h-7 w-7 rounded-sm' />
      </div>
      <div className='absolute right-8 bottom-30 flex gap-2 pb-5'>
        <LoadingCell className='h-20 w-20 rounded-full' />
        <LoadingCell className='h-20 w-20 rounded-full' />
      </div>
      <div className='group xs:gap-3 z-10 flex w-full gap-2 sm:gap-4'>
        <LoadingCell className='h-[125px] w-[125px] rounded-full' />
        <div className='flex flex-col gap-6 pt-2'>
          <div className='flex w-full items-center gap-4'>
            <LoadingCell className='h-12 w-96 rounded-sm' />
          </div>
          <div className='xs:gap-6 flex w-full gap-4 sm:gap-8'>
            <div className='flex items-center gap-2'>
              <LoadingCell className='h-7 w-14 rounded-sm' />
              <p className='text-text-neutral text-lg lg:text-xl'>Following</p>
            </div>
            <div className='flex items-center gap-2'>
              <LoadingCell className='h-7 w-14 rounded-sm' />
              <p className='text-text-neutral text-lg lg:text-xl'>Followers</p>
            </div>
          </div>
          <div className='flex w-full flex-col gap-1'>
            <LoadingCell className='h-6 w-96 rounded-sm' />
            <LoadingCell className='h-6 w-1/2 rounded-sm' />
          </div>
          <div className='flex gap-2'>
            {new Array(5).fill(0).map((_, index) => (
              <LoadingCell key={index} className='h-10 w-10 rounded-full' />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
