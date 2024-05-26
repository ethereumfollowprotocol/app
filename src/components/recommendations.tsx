'use client'

import clsx from 'clsx'
import { useMemo } from 'react'
import { useConnectedProfile } from '#/api/actions'
import { FollowList } from '#/components/follow-list'

interface RecommendationsProps {
  header: string
  size?: string
}

const mockProfiles: `0x${string}`[] = ['0x123', '0x456', '0x789']

export function Recommendations({ header, size }: RecommendationsProps) {
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

  return (
    <div
      className={clsx(
        'glass-card border-2 p-6 rounded-2xl border-[#0001] flex flex-col gap-8',
        size
      )}
    >
      <h2 className='lg:text-start text-3xl text-center font-bold'>{header}</h2>
      <FollowList
        listClassName='rounded-xl gap-7'
        profiles={profilesToRecommend}
        showFollowsYouBadges={true}
        showTags={false}
      />
    </div>
  )
}
