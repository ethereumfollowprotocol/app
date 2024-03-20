import { FollowList } from '#/components/follow-list'
import { useConnectedProfile } from '#/api/actions'
import { useMemo } from 'react'
import { Box, Heading } from '@radix-ui/themes'

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
    <Box className='flex flex-col gap-4'>
      <Heading as='h2' weight={'bold'} className='text-start'>
        {header}
      </Heading>
      <FollowList
        profiles={profilesToRecommend}
        showTags={false}
        showFollowsYouBadges={true}
        listClassName='gap-5 rounded-xl'
      />
    </Box>
  )
}
