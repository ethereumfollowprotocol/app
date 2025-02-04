import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'
import { usePathname, useRouter } from 'next/navigation'

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
  const pathname = usePathname()

  const isHome = pathname === '/'
  const statLink = {
    followers: `/${address}?tab=followers`,
    following: `/${address}?tab=following`,
    mutuals: `/${address}`,
    top8: `/${address}`,
    blocked: `/${address}?modal=block_mute_list`,
  }

  return (
    <div
      className={`items-center justify-between hidden gap-1 sm:flex ${
        isHome ? 'sm:w-1/4 md:w-1/3 lg:w-2/3 xl:w-1/4 2xl:w-1/3' : 'sm:w-1/4 md:w-3/5'
      }`}
    >
      {firstStat && (
        <div
          className={cn(
            'flex-col items-center flex w-full md:w-1/2 lg:w-1/4',
            firstStat !== 'mutuals' && 'cursor-pointer hover:scale-110 transition-transform',
            isHome ? 'xl:w-full 2xl:w-1/2' : 'xl:hidden'
          )}
          onClick={() => firstStat && router.push(statLink[firstStat])}
        >
          <p className="font-bold text-sm sm:text-lg">
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
          <p className="font-bold text-sm capitalize text-text/60 text-wrap text-center break-words w-full">
            {t(firstStat)}
          </p>
        </div>
      )}
      <div
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
          isHome ? 'w-1/2 md:w-1/2 lg:w-1/4 2xl:w-1/2' : 'w-1/2 lg:w-1/4 xl:w-1/5 2xl:w-1/5`'
        )}
      >
        <p className="font-bold text-sm sm:text-lg">{formatNumber(mutuals || 0)}</p>
        <p className="font-bold text-sm  text-text/60 text-wrap break-words text-center w-full">{t('mutuals')}</p>
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
          } transition-all hover:scale-110 cursor-pointer flex-col items-center`,
          isHome ? 'w-1/2 md:w-1/2 lg:w-1/4 2xl:w-1/2' : 'w-1/2 lg:w-1/4 xl:w-1/5  2xl:w-1/5`'
        )}
        onClick={() => router.push(statLink.followers)}
      >
        <p className="font-bold text-sm sm:text-lg">{formatNumber(followers || 0)}</p>
        <p className="font-bold text-sm  text-text/60 text-wrap break-words text-center w-full">{t('followers')}</p>
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
        } transition-all hover:scale-110 cursor-pointer flex-col items-center w-1/2 lg:w-1/4 xl:w-1/5`}
        onClick={() => router.push(statLink.following)}
      >
        <p className="font-bold text-sm sm:text-lg">{formatNumber(following || 0)}</p>
        <p className="font-bold text-sm  text-text/60 text-wrap break-words text-center w-full">{t('following')}</p>
      </div>
      <div
        className={`${
          (firstStat && firstStat === 'top8') || firstStat === 'blocked'
            ? isHome
              ? 'hidden'
              : 'hidden xl:flex'
            : `hidden lg:flex ${isHome ? 'xl:hidden' : ''}`
        } transition-all hover:scale-110 cursor-pointer flex-col items-center w-1/2 lg:w-1/4 xl:w-1/5`}
        onClick={() => router.push(statLink.top8)}
      >
        <p className="font-bold text-sm sm:text-lg">{formatNumber(top8 || 0)}</p>
        <p className="font-bold text-sm text-text/60 text-wrap break-words text-center w-full">{t('top8')}</p>
      </div>
      <div
        className={` transition-all hover:scale-110 cursor-pointer flex-col items-center w-1/2 lg:w-1/3 xl:w-1/5 ${
          isHome ? 'hidden' : 'hidden xl:flex'
        } `}
        onClick={() => router.push(statLink.blocked)}
      >
        <p className="font-bold text-sm sm:text-lg">{formatNumber(blocked || 0)}</p>
        <p className="font-bold text-sm text-text/60 text-wrap break-words text-center w-full">{t('blocked')}</p>
      </div>
    </div>
  )
}

export default StatsDesktop
