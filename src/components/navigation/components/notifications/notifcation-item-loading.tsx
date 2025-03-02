import LoadingCell from '#/components/loaders/loading-cell'

const NotificationItemLoading = () => {
  return (
    <div className='bg-nav-item flex items-center justify-between gap-2 p-2.5'>
      <div className='flex items-center gap-3'>
        <LoadingCell className='h-10 w-10 rounded-full' />
        <LoadingCell className='h-5 w-32 rounded-full' />
      </div>
      <LoadingCell className='h-4 w-4 rounded-full' />
    </div>
  )
}

export default NotificationItemLoading
