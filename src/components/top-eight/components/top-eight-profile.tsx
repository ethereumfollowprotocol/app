import Link from 'next/link'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { isLinkValid } from 'ethereum-identity-kit'
import { ens_beautify } from '@adraffy/ens-normalize'

import { useCart } from '#/hooks/use-cart'
import { Avatar } from '#/components/avatar'
import { isValidEnsName } from '#/utils/ens'
import FollowsYou from '#/components/follows-you'
import Plus from 'public/assets/icons/ui/plus.svg'
import { fetchAccount } from '#/api/fetch-account'
import Cross from 'public/assets/icons/ui/cross.svg'
import { cn, truncateAddress } from '#/lib/utilities'
import FollowButton from '#/components/follow-button'
import useFollowerState from '#/hooks/use-follower-state'
import LoadingCell from '#/components/loaders/loading-cell'
import type { TopEightProfileType } from '../hooks/use-top-eight'
import { listOpAddListRecord, listOpAddTag, listOpRemoveTag } from '#/utils/list-ops'

interface TopEightProfileProps {
  profile: TopEightProfileType
  isEditing?: boolean
}

const TopEightProfile: React.FC<TopEightProfileProps> = ({ profile, isEditing }) => {
  const { data: fetchedAccount, isLoading } = useQuery({
    queryKey: ['account', profile.address],
    queryFn: async () => await fetchAccount(profile.address),
  })

  const isEnsProfileLoading = profile.ens ? false : isLoading
  const fetchedEnsProfile = profile.ens ?? fetchedAccount?.ens

  const profileName = fetchedEnsProfile?.name
  const profileAvatar = fetchedEnsProfile?.avatar
  const headerImage = isLinkValid(fetchedEnsProfile?.records?.header) ? fetchedEnsProfile?.records?.header : undefined

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
    } else if (isRemovingFromTopEight) removeFromCart([listOpRemoveTag(profile.address, 'top8')])
    else {
      addToCart([listOpRemoveTag(profile.address, 'top8')])
    }
  }

  return (
    <div
      className={cn(
        'group bg-neutral shadow-small relative flex min-h-[180px] w-full flex-col items-center justify-between gap-2 overflow-hidden rounded-sm px-0.5 py-4 pb-3',
        isEditing && 'cursor-pointer border-[3px] border-transparent',
        isAddingToTopEight && 'border-[3px] border-green-500/50',
        isRemovingFromTopEight && 'border-[3px] border-red-400/70 dark:border-red-500/70',
        isEditing && !(isAddingToTopEight || isRemovingFromTopEight) && 'hover:border-nav-item'
      )}
      onClick={onClick}
    >
      {headerImage && (
        <Image
          src={headerImage}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
          alt='header'
          width={600}
          height={200}
          className='absolute top-0 left-0 z-0 h-full w-full object-cover opacity-25'
        />
      )}
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
      <div className='z-10 flex w-full flex-1 flex-col items-center gap-1'>
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
        {/* Updated text container with better spacing and min-height for consistent layout */}
        <div className='flex min-h-[52px] w-full flex-col items-center justify-start gap-1 px-1'>
          {isEnsProfileLoading ? (
            <LoadingCell className='h-7 w-24 rounded-sm' />
          ) : (
            <Link
              href={`/${profile.address}`}
              className={cn(
                'max-w-full truncate text-center text-lg leading-tight font-bold',
                isEditing ? 'pointer-events-none' : 'transition-all hover:scale-110 hover:opacity-75'
              )}
            >
              {profileName && isValidEnsName(profileName)
                ? ens_beautify(profileName)
                : truncateAddress(profile.address)}
            </Link>
          )}
          {/* Fixed spacing for follows you tag */}
          {userAddress && (
            <div className='mt-1'>
              <FollowsYou addressOrName={profile.address} connectedAddress={userAddress} />
            </div>
          )}
        </div>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn('absolute left-0 z-10 flex w-full justify-center', isEditing ? 'bottom-2' : 'bottom-3')}
      >
        <FollowButton address={profile.address} />
      </div>
    </div>
  )
}

export default TopEightProfile
