import { useTranslation } from 'react-i18next'
import { usePathname, useRouter } from 'next/navigation'

import { cn } from '#/lib/utilities'
import type { LeaderboardFilter } from '#/types/common'
import { formatNumber } from '#/utils/format/format-number'

interface StatsMobileProps {
  firstStat?: LeaderboardFilter
  followers?: number
  following?: number
  mutuals?: number
  top8?: number
  blocked?: number
}

const StatsMobile: React.FC<StatsMobileProps> = ({
  firstStat,
  followers,
  following,
  mutuals,
  top8,
  blocked
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const address = pathname.split('/')[1]

  const statLink = {
    followers: `/${address}?tab=followers`,
    following: `/${address}?tab=following`,
    mutuals: `/${address}`,
    top8: `/${address}`,
    blocked: `/${address}?modal=block_mute_list`
  }

  return (
    <div className={`items-center justify-evenly flex sm:hidden w-full`}>
      {firstStat && (
        <div
          className={cn(
            'flex-col items-center flex w-1/4',
            firstStat !== 'mutuals' && 'cursor-pointer hover:scale-110 transition-transform'
          )}
          onClick={() => firstStat && router.push(statLink[firstStat])}
        >
          <p className='font-bold text-sm sm:text-lg'>
            {formatNumber(
              {
                followers,
                following,
                mutuals,
                top8,
                blocked
              }[firstStat] || 0
            )}
          </p>
          <p className='font-bold text-sm capitalize text-text/60 text-wrap text-center w-full break-words'>
            {t(firstStat)}
          </p>
        </div>
      )}
      <div
        className={cn(
          'flex-col flex items-center w-1/4',
          firstStat === 'mutuals' ? 'hidden' : 'flex'
        )}
      >
        <p className='font-bold text-sm sm:text-lg'>{formatNumber(mutuals || 0)}</p>
        <p className='font-bold text-sm  text-text/60 text-wrap w-full text-center break-words'>
          {t('mutuals')}
        </p>
      </div>
      <div
        className={cn(
          'transition-all hover:scale-110 cursor-pointer flex-col items-center w-1/4',
          firstStat === 'followers' ? 'hidden' : 'flex'
        )}
        onClick={() => router.push(statLink.followers)}
      >
        <p className='font-bold text-sm sm:text-lg'>{formatNumber(followers || 0)}</p>
        <p className='font-bold text-sm  text-text/60 text-wrap break-words text-center w-full'>
          {t('followers')}
        </p>
      </div>
      <div
        className={cn(
          'transition-all hover:scale-110 cursor-pointer flex-col items-center w-1/4',
          firstStat === 'following' ? 'hidden' : 'flex'
        )}
        onClick={() => router.push(statLink.following)}
      >
        <p className='font-bold text-sm sm:text-lg'>{formatNumber(following || 0)}</p>
        <p className='font-bold text-sm  text-text/60 text-wrap break-words text-center w-full'>
          {t('following')}
        </p>
      </div>
      <div
        className={cn(
          firstStat === 'blocked' || firstStat === 'top8' ? 'hidden' : 'flex',
          'transition-all hover:scale-110 cursor-pointer flex-col items-center w-1/4'
        )}
        onClick={() => router.push(statLink.top8)}
      >
        <p className='font-bold text-sm sm:text-lg'>{formatNumber(top8 || 0)}</p>
        <p className='font-bold text-sm  text-text/60 text-wrap break-words  text-center w-full'>
          {t('top8')}
        </p>
      </div>
    </div>
  )
}

export default StatsMobile
