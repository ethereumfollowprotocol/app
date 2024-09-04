import Link from 'next/link'
import { IoClose } from 'react-icons/io5'
import { useQuery } from '@tanstack/react-query'

import { Avatar } from '#/components/avatar'
import { resolveEnsProfile } from '#/utils/ens'
import { useCart } from '#/contexts/cart-context'
import { cn, truncateAddress } from '#/lib/utilities'
import FollowButton from '#/components/follow-button'
import type { FollowingResponse } from '#/types/requests'
import LoadingCell from '#/components/loaders/loading-cell'

interface TopEightProfileProps {
  profile: FollowingResponse
  isEditing?: boolean
}

const TopEightProfile: React.FC<TopEightProfileProps> = ({ profile, isEditing }) => {
  const { data: fetchedEnsProfile, isLoading: isEnsProfileLoading } = useQuery({
    queryKey: ['ens metadata', profile],
    queryFn: async () => (profile.ens ? profile.ens : await resolveEnsProfile(profile.data))
  })

  const { hasListOpRemoveTag, hasListOpAddTag } = useCart()
  const isAddingToTopEight = isEditing && hasListOpAddTag({ address: profile.data, tag: 'top8' })
  const isRemovingFromTopEight =
    isEditing && hasListOpRemoveTag({ address: profile.data, tag: 'top8' })

  const profileName = fetchedEnsProfile?.name
  const profileAvatar = fetchedEnsProfile?.avatar

  return (
    <div
      className={cn(
        'flex flex-col relative group w-[129px] 2xl:w-[149px] px-0.5 py-4 rounded-2xl items-center gap-2',
        isEditing && 'cursor-pointer border-[3px] border-transparent hover:border-[#A2A2A277]',
        isAddingToTopEight && 'border-2 border-lime-500/50',
        isRemovingFromTopEight && 'border-2 border-red-500/50'
      )}
    >
      {isEditing && (
        <div className='absolute top-1 right-1 p-0.5 group-hover:block hidden rounded-full bg-[#A2A2A277]'>
          <IoClose className='text-xl' />
        </div>
      )}
      {isEnsProfileLoading ? (
        <LoadingCell className='h-[60px] w-[60px] rounded-full' />
      ) : (
        <Link href={`/${profile.data}`}>
          <Avatar
            name={profileName || profile.data}
            size={cn(
              'h-[60px] w-[60px]',
              !isEditing && 'hover:scale-110 hover:opacity-75 transition-all'
            )}
            avatarUrl={profileAvatar}
          />
        </Link>
      )}
      {isEnsProfileLoading ? (
        <LoadingCell className='h-7 w-24 rounded-lg' />
      ) : (
        <Link
          href={`/${profile.data}`}
          className={cn(
            'text-lg font-bold max-w-full truncate',
            !isEditing && 'hover:scale-110 hover:opacity-75 transition-all'
          )}
        >
          {profileName || truncateAddress(profile.data)}
        </Link>
      )}
      <FollowButton address={profile.data} />
    </div>
  )
}

export default TopEightProfile
