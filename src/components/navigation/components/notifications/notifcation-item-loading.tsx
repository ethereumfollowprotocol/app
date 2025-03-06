import LoadingCell from '#/components/loaders/loading-cell'

const NotificationItemLoading = () => {
  return (
    <div className='bg-nav-item flex h-16 w-full items-center justify-between gap-1 rounded-sm px-3 py-2 sm:w-[520px]'>
      <div className='flex items-center gap-3'>
        <LoadingCell className='h-10 w-10 rounded-full' />
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <LoadingCell className='h-7 w-7 rounded-full' />
            <LoadingCell className='z-10 -ml-[18px] h-7 w-7 rounded-full' />
            <LoadingCell className='z-20 -ml-[18px] h-7 w-7 rounded-full' />
          </div>
          <LoadingCell className='h-7 w-48 rounded-sm' />
        </div>
      </div>
      <LoadingCell className='h-5 w-8 rounded-sm' />
    </div>
  )
}

export default NotificationItemLoading
