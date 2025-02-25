import type { Address } from 'viem'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import { formatNumber } from '#/utils/format/format-number'
import type { LeaderboardFilter } from '#/types/common'

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
  const router = useRouter()

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
        <div
          className={cn(
            'flex flex-col items-center',
            firstStat !== 'mutuals' && 'cursor-pointer transition-transform hover:scale-110'
          )}
          onClick={() => firstStat !== 'mutuals' && router.push(statLink[firstStat])}
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
        </div>
      )}
      {/* <div
        className={cn(
          `${
            firstStat === 'mutuals'
              ? isHome
                ? 'hidden'
                : 'hidden xl:flex'
              : isHome
                ? 'hidden md:flex xl:hidden 2xl:flex'
                : 'hidden md:flex'
          } flex-col items-center`,
          isHome ? 'w-1/2 md:w-1/2 lg:w-1/4 2xl:w-1/2' : '2xl:w-1/5` w-1/2 lg:w-1/4 xl:w-1/5'
        )}
      >
        <p className='text-sm font-bold sm:text-lg'>{formatNumber(mutuals || 0)}</p>
        <p className='text-text/60 w-full text-center text-sm font-bold text-wrap break-words'>{t('mutuals')}</p>
      </div>
      <div
        className={cn(
          `${
            firstStat && firstStat === 'followers'
              ? isHome
                ? 'hidden'
                : 'hidden xl:flex'
              : firstStat === 'mutuals'
                ? isHome
                  ? 'hidden md:flex xl:hidden 2xl:flex'
                  : 'hidden md:flex'
                : isHome
                  ? 'hidden lg:flex xl:hidden'
                  : 'hidden lg:flex'
          } cursor-pointer flex-col items-center transition-all hover:scale-110`,
          isHome ? 'w-1/2 md:w-1/2 lg:w-1/4 2xl:w-1/2' : '2xl:w-1/5` w-1/2 lg:w-1/4 xl:w-1/5'
        )}
        onClick={() => router.push(statLink.followers)}
      >
        <p className='text-sm font-bold sm:text-lg'>{formatNumber(followers || 0)}</p>
        <p className='text-text/60 w-full text-center text-sm font-bold text-wrap break-words'>{t('followers')}</p>
      </div>
      <div
        className={`${
          firstStat && firstStat === 'following'
            ? isHome
              ? 'hidden'
              : 'hidden xl:flex'
            : isHome
              ? 'hidden lg:flex xl:hidden'
              : 'hidden lg:flex'
        } w-1/2 cursor-pointer flex-col items-center transition-all hover:scale-110 lg:w-1/4 xl:w-1/5`}
        onClick={() => router.push(statLink.following)}
      >
        <p className='text-sm font-bold sm:text-lg'>{formatNumber(following || 0)}</p>
        <p className='text-text/60 w-full text-center text-sm font-bold text-wrap break-words'>{t('following')}</p>
      </div>
      <div
        className={`${
          (firstStat && firstStat === 'top8') || firstStat === 'blocked'
            ? isHome
              ? 'hidden'
              : 'hidden xl:flex'
            : `hidden lg:flex ${isHome ? 'xl:hidden' : ''}`
        } w-1/2 cursor-pointer flex-col items-center transition-all hover:scale-110 lg:w-1/4 xl:w-1/5`}
        onClick={() => router.push(statLink.top8)}
      >
        <p className='text-sm font-bold sm:text-lg'>{formatNumber(top8 || 0)}</p>
        <p className='text-text/60 w-full text-center text-sm font-bold text-wrap break-words'>{t('top8')}</p>
      </div>
      <div
        className={`w-1/2 cursor-pointer flex-col items-center transition-all hover:scale-110 lg:w-1/3 xl:w-1/5 ${
          isHome ? 'hidden' : 'hidden xl:flex'
        } `}
        onClick={() => router.push(statLink.blocked)}
      >
        <p className='text-sm font-bold sm:text-lg'>{formatNumber(blocked || 0)}</p>
        <p className='text-text/60 w-full text-center text-sm font-bold text-wrap break-words'>{t('blocked')}</p>
      </div> */}
    </div>
  )
}

export default StatsDesktop
