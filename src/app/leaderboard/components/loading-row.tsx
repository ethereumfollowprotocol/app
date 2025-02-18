import LoadingCell from '#/components/loaders/loading-cell'

const LoadingRow = () => {
  return (
    <div className='flex h-[84px] w-full items-center justify-between gap-4 rounded-sm px-2 sm:px-4'>
      <div className='flex w-1/2 items-center gap-4'>
        <div className='xxs:min-w-6 xxs:w-6 flex w-4 min-w-4 justify-center text-right tabular-nums sm:w-10'>
          <LoadingCell className='xxs:w-8 h-10 w-4 rounded-sm sm:h-12 sm:w-10' />
        </div>
        <div className='flex w-full items-center gap-2' data-name='name-column'>
          <LoadingCell className='h-[45px] w-[45px] rounded-full md:h-[50px] md:w-[50px]' />
          <div className='w-16 flex-col items-start justify-center text-left'>
            <LoadingCell className='h-6 w-full rounded-sm' />
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center gap-1'>
        <LoadingCell className='h-6 w-10 rounded-sm' />
        <LoadingCell className='h-4 w-20 rounded-sm' />
      </div>
      <LoadingCell className='h-9 w-[110px] rounded-sm' />
    </div>
  )
}

export default LoadingRow
