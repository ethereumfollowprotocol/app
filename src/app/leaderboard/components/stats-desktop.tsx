import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import { formatNumber } from '#/utils/format/format-number'
import type { LeaderboardFilter } from '#/types/common'
import Link from 'next/link'

interface StatsDesktopProps {
  address: Address
  firstStat?: LeaderboardFilter
  followers?: number
  following?: number
  mutuals?: number
  top8?: number
  blocked?: number
}

const StatsDesktop: React.FC<StatsDesktopProps> = ({
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
    <div className='w-fit'>
      {firstStat && (
        <Link
          href={statLink[firstStat]}
          className={cn(
            'flex flex-col items-center',
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
    </div>
  )
}

export default StatsDesktop
