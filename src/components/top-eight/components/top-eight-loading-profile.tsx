import React from 'react'
import { cn } from '#/lib/utilities'
import LoadingCell from '#/components/loaders/loading-cell'

interface TopEightLoadingProfileProps {
  isEditing?: boolean
}

const TopEightLoadingProfile: React.FC<TopEightLoadingProfileProps> = ({ isEditing }) => {
  return (
    <div
      className={cn(
        'bg-neutral shadow-small flex w-full flex-col items-center gap-4 px-0.5 py-4 min-h-[180px] rounded-sm',
        isEditing ? 'top-eight-profile-edit' : 'top-eight-profile'
      )}
    >
      <LoadingCell className='h-[50px] w-[50px] rounded-full' />
      <div className='flex flex-col items-center gap-2 min-h-[52px] justify-start'>
        <LoadingCell className='h-7 w-24 rounded-sm' />
        <LoadingCell className='h-5 w-16 rounded-sm' />
      </div>
      <LoadingCell className='mt-auto h-9 w-[110px] rounded-sm xl:h-10 xl:w-[120px]' />
    </div>
  )
}

export default TopEightLoadingProfile
