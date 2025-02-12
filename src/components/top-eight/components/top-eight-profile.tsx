import Link from 'next/link'
import { HiPlus } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { ens_beautify } from '@adraffy/ens-normalize'

import { Avatar } from '#/components/avatar'
import { useCart } from '#/hooks/use-cart'
import { cn, truncateAddress } from '#/lib/utilities'
import FollowButton from '#/components/follow-button'
import useFollowerState from '#/hooks/use-follower-state'
import LoadingCell from '#/components/loaders/loading-cell'
import { isValidEnsName, resolveEnsProfile } from '#/utils/ens'
import type { TopEightProfileType } from '../hooks/use-top-eight'
import { listOpAddListRecord, listOpAddTag, listOpRemoveTag } from '#/utils/list-ops'

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
  const { followerTag, followState } = useFollowerState({ address: profile?.address, showFollowerBadge: true })

  const { addToCart, removeFromCart, hasListOpAddTag, hasListOpRemoveTag, hasListOpRemoveRecord } = useCart()
  const { t } = useTranslation()
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
        'group relative flex w-[129px] flex-col items-center justify-between gap-2 rounded-2xl px-0.5 py-4 hover:border-[#A2A2A277] 2xl:w-36',
        isEditing
          ? 'h-[186px] w-[144px] cursor-pointer border-[3px] border-transparent'
          : 'hover:bg-text/5 h-[180px] w-[129px] 2xl:w-36',
        isAddingToTopEight && 'border-[3px] border-green-500/50',
        isRemovingFromTopEight && 'border-[3px] border-red-400/70 dark:border-red-500/70'
      )}
      onClick={onClick}
    >
      {isEditing && (
        <div
          className={cn(
            'absolute top-1 right-1 rounded-full p-1 text-white',
            isAddingToTopEight && 'bg-green-500/50',
            isRemovingFromTopEight && 'bg-red-400/70',
            !(isAddingToTopEight || isRemovingFromTopEight) && 'hidden bg-[#A2A2A277] group-hover:block'
          )}
        >
          {isAddingToTopEight ? <HiPlus /> : <IoClose />}
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
            {profileName && isValidEnsName(profileName) ? ens_beautify(profileName) : truncateAddress(profile.address)}
          </Link>
        )}
      </div>
      {followerTag && (
        <div
          className={cn(
            'absolute bottom-[62px] flex h-5 w-fit min-w-20 items-center justify-center rounded-full bg-zinc-300 px-1 text-[10px] font-bold',
            followerTag.className,
            'text-darkGrey'
          )}
        >
          {t(followerTag.text)}
        </div>
      )}
      <FollowButton address={profile.address} />
    </div>
  )
}

export default TopEightProfile
