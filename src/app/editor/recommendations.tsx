import { FollowList } from '#/components/follow-list'
import { useConnectedProfile } from '#/api/actions'
import { useMemo } from 'react'

interface RecommendationsProps {
  header: string
}

export function Recommendations({ header }: RecommendationsProps) {
  const { profile } = useConnectedProfile()

  // TODO get better recommendations
  // Currently using the followers that aren't being followed by the connected profile
  const followerAddresses = profile?.followerAddresses || []
  const followingAddresses = profile?.followingAddresses || []

  // Filter out followers that are already being followed
  const profilesToRecommend = useMemo(() => {
    return followerAddresses
      .filter(follower => !followingAddresses.includes(follower))
      .map(address => ({ address, tags: [] }))
  }, [followerAddresses, followingAddresses])

  if (!profilesToRecommend) return null

  return <FollowList profiles={profilesToRecommend} showTags={false} showFollowsYouBadges={true} />
}
