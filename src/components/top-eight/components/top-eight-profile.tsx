import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import { Avatar } from '#/components/avatar'
import { resolveEnsProfile } from '#/utils/ens'
import { cn, truncateAddress } from '#/lib/utilities'
import FollowButton from '#/components/follow-button'
import type { FollowingResponse } from '#/types/requests'
import LoadingCell from '#/components/loaders/loading-cell'
import { useCart } from '#/contexts/cart-context'

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
  const isAddingToTopEight = hasListOpAddTag({ address: profile.data, tag: 'top8' })
  const isRemovingFromTopEight = hasListOpRemoveTag({ address: profile.data, tag: 'top8' })

  const profileName = fetchedEnsProfile?.name
  const profileAvatar = fetchedEnsProfile?.avatar

  return (
    <div
      className={cn(
        'flex flex-col w-36 py-4 rounded-xl items-center gap-2',
        isEditing && 'cursor-pointer border-2 border-transparent hover:border-[#A2A2A277]',
        isAddingToTopEight && 'border-2 border-lime-500/50',
        isRemovingFromTopEight && 'border-2 border-red-500/50'
      )}
    >
      {isEnsProfileLoading ? (
        <LoadingCell className='h-[60px] w-[60px] rounded-full' />
      ) : (
        <Avatar
          name={profileName || profile.data}
          size='h-[60px] w-[60px]'
          avatarUrl={profileAvatar}
        />
      )}
      {isEnsProfileLoading ? (
        <LoadingCell className='h-7 w-24 rounded-lg' />
      ) : (
        <Link href={`/${profile.data}`} className='text-lg font-bold max-w-full truncate'>
          {profileName || truncateAddress(profile.data)}
        </Link>
      )}
      <FollowButton address={profile.data} />
    </div>
  )
}

export default TopEightProfile
