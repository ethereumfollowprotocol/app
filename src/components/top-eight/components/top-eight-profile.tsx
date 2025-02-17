import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { ens_beautify } from '@adraffy/ens-normalize'

import { useCart } from '#/hooks/use-cart'
import { Avatar } from '#/components/avatar'
import { cn, truncateAddress } from '#/lib/utilities'
import FollowButton from '#/components/follow-button'
import useFollowerState from '#/hooks/use-follower-state'
import LoadingCell from '#/components/loaders/loading-cell'
import { isValidEnsName, resolveEnsProfile } from '#/utils/ens'
import type { TopEightProfileType } from '../hooks/use-top-eight'
import { listOpAddListRecord, listOpAddTag, listOpRemoveTag } from '#/utils/list-ops'
import Plus from 'public/assets/icons/ui/plus.svg'
import Cross from 'public/assets/icons/ui/cross.svg'
import FollowsYou from '#/components/follows-you'

interface TopEightProfileProps {
  profile: TopEightProfileType
  isEditing?: boolean
}

const TopEightProfile: React.FC<TopEightProfileProps> = ({ profile, isEditing }) => {
  const { data: fetchedEnsProfile, isLoading: isEnsProfileLoading } = useQuery({
    queryKey: ['ens metadata', profile.address],
    queryFn: async () => (profile.ens ? profile.ens : await resolveEnsProfile(profile.address)),
  })

  const profileName = fetchedEnsProfile?.name
  const profileAvatar = fetchedEnsProfile?.avatar
  const { address: userAddress } = useAccount()
  const { followState } = useFollowerState({ address: profile?.address, showFollowerBadge: true })
  const { addToCart, removeFromCart, hasListOpAddTag, hasListOpRemoveTag, hasListOpRemoveRecord } = useCart()
  const isAddingToTopEight = isEditing && hasListOpAddTag(profile.address, 'top8')
  const isRemovingFromTopEight =
    isEditing && (hasListOpRemoveTag(profile.address, 'top8') || hasListOpRemoveRecord(profile.address))

  const onClick = () => {
    if (!isEditing) return

    if (isAddingToTopEight) {
      const removeItems = [listOpAddTag(profile.address, 'top8')]
      if (followState === 'none') removeItems.push(listOpAddListRecord(profile.address))
      removeFromCart(removeItems)
    } else if (isRemovingFromTopEight) removeFromCart(listOpRemoveTag(profile.address, 'top8'))
    else {
      addToCart({ listOp: listOpRemoveTag(profile.address, 'top8') })
    }
  }

  return (
    <div
      className={cn(
        'group bg-neutral shadow-small relative flex flex-col items-center justify-between gap-2 rounded-sm px-0.5 py-4 pb-3',
        isEditing
          ? 'top-eight-profile-quarter top-eight-profile-edit cursor-pointer border-[3px] border-transparent'
          : 'top-eight-profile',
        isAddingToTopEight && 'border-[3px] border-green-500/50',
        isRemovingFromTopEight && 'border-[3px] border-red-400/70 dark:border-red-500/70',
        isEditing && !(isAddingToTopEight || isRemovingFromTopEight) && 'hover:border-nav-item'
      )}
      onClick={onClick}
    >
      {isEditing && (
        <div
          className={cn(
            'absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-sm text-white',
            isAddingToTopEight && 'bg-green-500/50',
            isRemovingFromTopEight && 'bg-red-400/70',
            !(isAddingToTopEight || isRemovingFromTopEight) && 'hidden bg-[#A2A2A277] group-hover:flex'
          )}
        >
          {isAddingToTopEight ? <Plus className='h-3 w-3' /> : <Cross className='h-4 w-4' />}
        </div>
      )}
      <div className='flex w-full flex-col items-center gap-1'>
        {isEnsProfileLoading ? (
          <LoadingCell className='h-[50px] w-[50px] rounded-full' />
        ) : (
          <Link href={`/${profile.address}`} className={cn(isEditing && 'pointer-events-none')}>
            <Avatar
              name={profileName || profile.address}
              size={cn('h-[50px] w-[50px]', !isEditing && 'hover:scale-110 hover:opacity-75 transition-all')}
              avatarUrl={profileAvatar}
            />
          </Link>
        )}
        <div className='flex h-13 w-full flex-col items-center justify-center gap-1.5'>
          {isEnsProfileLoading ? (
            <LoadingCell className='h-7 w-24 rounded-sm' />
          ) : (
            <Link
              href={`/${profile.address}`}
              className={cn(
                'max-w-full truncate text-lg font-bold',
                isEditing ? 'pointer-events-none' : 'transition-all hover:scale-110 hover:opacity-75'
              )}
            >
              {profileName && isValidEnsName(profileName)
                ? ens_beautify(profileName)
                : truncateAddress(profile.address)}
            </Link>
          )}
          {userAddress && <FollowsYou addressOrName={profile.address} connectedAddress={userAddress} />}
        </div>
      </div>
      <FollowButton address={profile.address} />
    </div>
  )
}

export default TopEightProfile
