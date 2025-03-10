import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useAchievements } from './hooks/use-achievements'
import LoadingCell from '#/components/loaders/loading-cell'
import type { ProfileDetailsResponse } from '#/types/requests'

interface AchievementsProps {
  profile?: ProfileDetailsResponse | null
  isLoading: boolean
  list?: number | null
}

const Achievements: React.FC<AchievementsProps> = ({ list, profile, isLoading }) => {
  const { ownedBadges, isLoading: isBadgesLoading } = useAchievements({
    address: profile?.address,
    list: list || undefined,
  })

  if (!isBadgesLoading && ownedBadges.length === 0) return null

  return (
    <div className='flex w-full flex-wrap justify-start gap-2 px-3 pb-4 md:max-w-44 md:justify-end md:p-0 lg:max-w-full'>
      {isBadgesLoading || isLoading ? (
        <>
          <LoadingCell className='h-[72px] w-[72px] rounded-full' />
          <LoadingCell className='h-[72px] w-[72px] rounded-full' />
        </>
      ) : (
        ownedBadges.map((badge) => (
          <Link
            href={`https://collectors.poap.xyz/token/${badge.collection?.tokenId || ''}`}
            key={badge.collection?.tokenId}
            target='_blank'
          >
            <Image
              src={badge.collection?.event?.image_url || ''}
              alt={badge.collection?.event?.name || ''}
              width={72}
              height={72}
              className='transition-all hover:scale-110'
            />
          </Link>
        ))
      )}
    </div>
  )
}

export default Achievements
