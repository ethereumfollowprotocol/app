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
        'bg-neutral shadow-small flex w-28 flex-col items-center gap-4 px-0 py-4 lg:w-[128px] xl:w-36',
        isEditing ? 'top-eight-profile-edit' : 'top-eight-profile'
      )}
    >
      <LoadingCell className='h-[50px] w-[50px] rounded-full' />
      <LoadingCell className='h-7 w-24 rounded-sm' />
      <LoadingCell className='mt-2.5 h-9 w-[110px] rounded-sm xl:h-10 xl:w-[120px]' />
    </div>
  )
}

export default TopEightLoadingProfile
