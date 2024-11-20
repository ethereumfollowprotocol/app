import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import { formatNumber } from '#/utils/format/format-number'
import LoadingCell from '#/components/loaders/loading-cell'

interface LeaderboardRanksProps {
  ranks: number[]
  rankTitles: string[]
  isLoading?: boolean
  isResponsive?: boolean
  isRecommended?: boolean
}

const LeaderboardRanks: React.FC<LeaderboardRanksProps> = ({
  ranks,
  rankTitles,
  isResponsive,
  isRecommended,
  isLoading
}) => {
  const { t } = useTranslation()
  const ranksTypes = [
    'mutuals_rank',
    'followers_rank',
    'following_rank',
    'top8_rank',
    'blocks_rank'
  ]

  return (
    <div
      className={cn('flex flex-col w-full items-center gap-2', isRecommended && 'hidden sm:flex')}
    >
      <Link href='/leaderboard'>
        <div
          className={`${
            isResponsive ? 'text-lg sm:text-xl' : 'text-xl'
          } font-bold hover:scale-110 transition-all`}
        >
          {t('leaderboard')}
        </div>
      </Link>
      <div className='flex flex-row w-full justify-center flex-wrap gap-x-4 gap-y-0 xxs:gap-x-8 xl:gap-x-1 3xl:gap-x-2'>
        {isLoading
          ? ranksTypes.map((rank, i) => (
              <div
                key={i}
                className='w-fit flex gap-2 3xl:gap-3 justify-between items-center font-bold px-2 py-1.5 rounded-lg hover:bg-text/5 transition-all'
              >
                <p className='text-[#888] dark:text-[#aaa]'>{t(rank)}</p>
                <LoadingCell className='h-5 w-10 rounded-md' isStatic={false} />
              </div>
            ))
          : ranks.map((rank, i) => (
              <Link
                href={`/leaderboard?filter=${{
                  mutuals_rank: 'mutuals',
                  followers_rank: 'followers',
                  following_rank: 'following',
                  top8_rank: 'top8',
                  blocks_rank: 'blocked'
                }[rankTitles[i] || '']
                  ?.replaceAll(' ', '')
                  ?.toLowerCase()}`}
                key={rankTitles[i]}
                className=' w-fit flex gap-2 3xl:gap-3 justify-between items-center font-bold px-2 py-1 rounded-lg hover:bg-text/5 transition-all'
              >
                <p className='font-bold text-text/40 text-start'>{t(rankTitles[i] || '')}</p>
                <p
                  className={
                    {
                      1: 'first-place text-xl',
                      2: 'second-place text-xl',
                      3: 'third-place text-xl'
                    }[rank]
                  }
                >
                  #{rank ? formatNumber(rank) : '-'}
                </p>
              </Link>
            ))}
      </div>
    </div>
  )
}

export default LeaderboardRanks
