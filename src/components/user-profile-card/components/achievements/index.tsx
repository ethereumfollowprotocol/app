import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import LeaderboardRanks from '../leaderboard-ranks'
import { useAchievements } from './hooks/use-achievements'
import LoadingCell from '#/components/loaders/loading-cell'
import type { ProfileDetailsResponse } from '#/types/requests'

interface AchievementsProps {
  profile?: ProfileDetailsResponse | null
  isLoading: boolean
  list?: number | null
  isResponsive: boolean
  isRecommended: boolean
}

const Achievements: React.FC<AchievementsProps> = ({ list, profile, isLoading, isResponsive, isRecommended }) => {
  const { ownedBadges, isLoading: isBadgesLoading } = useAchievements({
    address: profile?.address,
    list: list || undefined,
  })

  const rankTitles = Object.keys(profile?.ranks || {})
  const ranks = Object.values(profile?.ranks || {})
  return (
    <div className='glass-card border-grey flex flex-col gap-4 rounded-xl border-[3px] p-4 sm:gap-4 sm:py-6'>
      <LeaderboardRanks
        ranks={ranks}
        isLoading={isLoading}
        rankTitles={rankTitles}
        isResponsive={isResponsive}
        isRecommended={isRecommended}
      />
      <div className='3xl:gap-3 flex flex-wrap justify-evenly gap-2 sm:justify-center'>
        {isBadgesLoading || isLoading ? (
          <>
            <LoadingCell className='h-[90px] w-[90px] rounded-full' />
            <LoadingCell className='h-[90px] w-[90px] rounded-full' />
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
                width={90}
                height={90}
                className='transition-all hover:scale-110'
              />
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default Achievements
