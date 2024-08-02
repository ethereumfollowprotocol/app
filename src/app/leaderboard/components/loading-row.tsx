import LoadingCell from '#/components/loading-cell'

const LoadingRow = () => {
  return (
    <div className='flex items-center w-full gap-4 md:gap-8 h-[75px]'>
      <div className='tabular-nums w-6 xxs:w-8 sm:w-10 flex justify-center text-right'>
        <LoadingCell className='h-10 sm:h-12 w-6 xxs:w-8 sm:w-10 rounded-lg' />
      </div>
      <div
        className='flex gap-2 items-center w-1/2 xxs:w-2/3 sm:w-1/2 md:w-[40%] xl:w-1/4'
        data-name='name-column'
      >
        <LoadingCell className='h-[45px] w-[45px] md:h-[50px] md:w-[50px] rounded-full' />
        <div className='flex flex-col w-2/3 max-w-20 xxs:max-w-32 items-start justify-center text-left'>
          <LoadingCell className='rounded-lg h-6 w-full' />
        </div>
      </div>
      <div className=' flex-col items-center w-[12.5%] xl:w-[11%] hidden lg:flex'>
        <LoadingCell className='w-10 h-5 rounded-lg' />
        <p className='font-medium'>Mutuals</p>
      </div>
      <div className='hidden sm:flex flex-col items-center w-[15%] lg:w-[12.5%] xl:w-[11%]'>
        <LoadingCell className='w-10 h-5 rounded-lg' />
        <p className='font-medium'>Followers</p>
      </div>
      <div className='hidden md:flex flex-col items-center w-[15%] lg:w-[12.5%] xl:w-[11%]'>
        <LoadingCell className='w-10 h-5 rounded-lg' />
        <p className='font-medium'>Following</p>
      </div>
      <div className='flex-col items-center w-[11%] hidden xl:flex'>
        <LoadingCell className='w-10 h-5 rounded-lg' />
        <p className='font-medium'> Blocked</p>
      </div>
      <div className='lg:w-[15%] 2xl:w-[12.5%] flex justify-end'>
        <LoadingCell className='h-9 w-[107px] rounded-lg' />
      </div>
    </div>
  )
}

export default LoadingRow
