import { useMemo } from 'react'
import { useConnectedProfile } from '#/api/actions'
import { FollowList } from '#/components/follow-list'
interface RecommendationsProps {
  header: string
}

const mockProfiles: `0x${string}`[] = ['0x123', '0x456', '0x789']

export function Recommendations({ header }: RecommendationsProps) {
  const { profile } = useConnectedProfile()

  // TODO get better recommendations
  // Currently using the followers that aren't being followed by the connected profile
  const followerAddresses = profile?.followerAddresses || mockProfiles
  const followingAddresses = profile?.followingAddresses || []

  // Filter out followers that are already being followed
  const profilesToRecommend = useMemo(() => {
    return followerAddresses
      .filter(follower => !followingAddresses.includes(follower))
      .map(address => ({ address, tags: [] }))
  }, [followerAddresses, followingAddresses])

  if (!profilesToRecommend) return null

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-start font-bold'>{header}</h2>
      <FollowList
        listClassName='gap-5 rounded-xl'
        profiles={profilesToRecommend}
        showFollowsYouBadges={true}
        showTags={false}
      />
    </div>
  )
}
