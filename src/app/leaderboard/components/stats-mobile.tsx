import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import type { LeaderboardFilter } from '#/types/common'
import { formatNumber } from '#/utils/format/format-number'
import Link from 'next/link'

interface StatsMobileProps {
  address: Address
  firstStat?: LeaderboardFilter
  followers?: number
  following?: number
  mutuals?: number
  top8?: number
  blocked?: number
}

const StatsMobile: React.FC<StatsMobileProps> = ({
  address,
  firstStat,
  followers,
  following,
  mutuals,
  top8,
  blocked,
}) => {
  const { t } = useTranslation()

  const statLink = {
    followers: `/${address}?tab=followers`,
    following: `/${address}?tab=following`,
    mutuals: `/${address}`,
    top8: `/${address}`,
    blocked: `/${address}?modal=block_mute_list`,
  }

  return (
    <div className={`flex w-full items-center justify-evenly sm:hidden`}>
      {firstStat && (
        <Link
          href={statLink[firstStat]}
          className={cn(
            'flex w-1/4 flex-col items-center',
            firstStat !== 'mutuals' && 'cursor-pointer transition-transform hover:scale-110'
          )}
        >
          <p className='text-sm font-bold sm:text-lg'>
            {formatNumber(
              {
                followers,
                following,
                mutuals,
                top8,
                blocked,
              }[firstStat] || 0
            )}
          </p>
          <p className='text-text/60 w-full text-center text-sm font-bold text-wrap break-words capitalize'>
            {t(firstStat)}
          </p>
        </Link>
      )}
      <div className={cn('flex w-1/4 flex-col items-center', firstStat === 'mutuals' ? 'hidden' : 'flex')}>
        <p className='text-sm font-bold sm:text-lg'>{formatNumber(mutuals || 0)}</p>
        <p className='text-text/60 w-full text-center text-sm font-bold text-wrap break-words'>{t('mutuals')}</p>
      </div>
      <Link
        href={statLink.followers}
        className={cn(
          'w-1/4 cursor-pointer flex-col items-center transition-all hover:scale-110',
          firstStat === 'followers' ? 'hidden' : 'flex'
        )}
      >
        <p className='text-sm font-bold sm:text-lg'>{formatNumber(followers || 0)}</p>
        <p className='text-text/60 w-full text-center text-sm font-bold text-wrap break-words'>{t('followers')}</p>
      </Link>
      <Link
        href={statLink.following}
        className={cn(
          'w-1/4 cursor-pointer flex-col items-center transition-all hover:scale-110',
          firstStat === 'following' ? 'hidden' : 'flex'
        )}
      >
        <p className='text-sm font-bold sm:text-lg'>{formatNumber(following || 0)}</p>
        <p className='text-text/60 w-full text-center text-sm font-bold text-wrap break-words'>{t('following')}</p>
      </Link>
      <Link
        href={statLink.top8}
        className={cn(
          firstStat === 'blocked' || firstStat === 'top8' ? 'hidden' : 'flex',
          'w-1/4 cursor-pointer flex-col items-center transition-all hover:scale-110'
        )}
      >
        <p className='text-sm font-bold sm:text-lg'>{formatNumber(top8 || 0)}</p>
        <p className='text-text/60 w-full text-center text-sm font-bold text-wrap break-words'>{t('top8')}</p>
      </Link>
    </div>
  )
}

export default StatsMobile
