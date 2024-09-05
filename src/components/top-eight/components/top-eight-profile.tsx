import Link from 'next/link'
import { HiPlus } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { useQuery } from '@tanstack/react-query'

import { Avatar } from '#/components/avatar'
import { resolveEnsProfile } from '#/utils/ens'
import { useCart } from '#/contexts/cart-context'
import { cn, truncateAddress } from '#/lib/utilities'
import FollowButton from '#/components/follow-button'
import LoadingCell from '#/components/loaders/loading-cell'
import { listOpAddTag, listOpRemoveTag } from '#/utils/list-ops'
import type { TopEightProfileType } from '../hooks/use-top-eight'

interface TopEightProfileProps {
  profile: TopEightProfileType
  isEditing?: boolean
}

const TopEightProfile: React.FC<TopEightProfileProps> = ({ profile, isEditing }) => {
  const { data: fetchedEnsProfile, isLoading: isEnsProfileLoading } = useQuery({
    queryKey: ['ens metadata', profile.address],
    queryFn: async () => (profile.ens ? profile.ens : await resolveEnsProfile(profile.address))
  })

  const profileName = fetchedEnsProfile?.name
  const profileAvatar = fetchedEnsProfile?.avatar

  const {
    addCartItem,
    removeCartItem,
    hasListOpAddTag,
    hasListOpRemoveTag,
    hasListOpRemoveRecord
  } = useCart()
  const isAddingToTopEight = isEditing && hasListOpAddTag({ address: profile.address, tag: 'top8' })
  const isRemovingFromTopEight =
    isEditing &&
    (hasListOpRemoveTag({ address: profile.address, tag: 'top8' }) ||
      hasListOpRemoveRecord(profile.address))

  const onClick = () => {
    if (!isEditing) return

    if (isAddingToTopEight) removeCartItem(listOpAddTag(profile.address, 'top8'))
    else if (isRemovingFromTopEight) removeCartItem(listOpRemoveTag(profile.address, 'top8'))
    else addCartItem({ listOp: listOpRemoveTag(profile.address, 'top8') })
  }

  return (
    <div
      className={cn(
        'flex flex-col relative group w-[129px] 2xl:w-[149px] px-0.5 py-4 rounded-2xl items-center gap-2 hover:border-[#A2A2A277]',
        isEditing
          ? 'cursor-pointer border-[3px] border-transparent w-[149px]'
          : 'w-[129px] 2xl:w-[149px] hover:bg-darkGrey/5 dark:hover:bg-darkGrey/30',
        isAddingToTopEight && 'border-[3px] border-lime-500/50',
        isRemovingFromTopEight && 'border-[3px] dark:border-red-500/70 border-red-400/70'
      )}
      onClick={onClick}
    >
      {isEditing && (
        <div
          className={cn(
            'absolute top-1 right-1 p-1 rounded-full text-white',
            isAddingToTopEight && 'bg-lime-500/50',
            isRemovingFromTopEight && 'bg-red-400/70',
            !(isAddingToTopEight || isRemovingFromTopEight) &&
              'bg-[#A2A2A277] group-hover:block hidden '
          )}
        >
          {isAddingToTopEight ? <HiPlus /> : <IoClose />}
        </div>
      )}
      {isEnsProfileLoading ? (
        <LoadingCell className='h-[60px] w-[60px] rounded-full' />
      ) : (
        <Link href={`/${profile.address}`} className={cn(isEditing && 'pointer-events-none')}>
          <Avatar
            name={profileName || profile.address}
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
          href={`/${profile.address}`}
          className={cn(
            'text-lg font-bold max-w-full truncate',
            isEditing ? 'pointer-events-none' : 'hover:scale-110 hover:opacity-75 transition-all'
          )}
        >
          {profileName || truncateAddress(profile.address)}
        </Link>
      )}
      <FollowButton address={profile.address} />
    </div>
  )
}

export default TopEightProfile
