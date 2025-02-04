import type { Address } from 'viem'
import { usePathname } from 'next/navigation'

import Name from './name'
import StatsMobile from './stats-mobile'
import StatsDesktop from './stats-desktop'
import FollowButton from '#/components/follow-button'
import type { LeaderboardFilter } from '#/types/common'
import useFollowerState from '#/hooks/use-follower-state'
import { formatNumber } from '#/utils/format/format-number'

interface TableRowProps {
  address: Address
  name: string | null
  avatar: string | null
  rank: number
  following?: number
  followers?: number
  mutuals?: number
  top8?: number
  blocked?: number
  firstStat?: LeaderboardFilter
}

const TableRow: React.FC<TableRowProps> = ({
  address,
  name,
  avatar,
  rank,
  following,
  followers,
  mutuals,
  top8,
  blocked,
  firstStat,
}) => {
  const rankedAs = rank === 0 ? 'no-rank' : rank <= 3 ? 'top-three' : rank <= 10 ? 'top-ten' : 'regular'

  const rankNumber = {
    'no-rank': <p className='text-2xl sm:text-3xl font-bold w-min mx-auto'>-</p>,
    'top-three': (
      <p
        className={`text-2xl xxs:text-3xl sm:text-4xl md:text-5xl ${
          {
            1: 'first-place',
            2: 'second-place',
            3: 'third-place',
          }[rank]
        }
        `}
      >
        {rank}
      </p>
    ),
    'top-ten': <p className='text-2xl xxs:text-3xl sm:text-4xl md:text-5xl font-bold w-min mx-auto'>{rank}</p>,
    regular: (
      <p
        className={`text ${
          rank >= 10000
            ? 'text-xs xxs:text-sm sm:text-lg'
            : rank >= 1000
              ? 'text-sm xxs:text-base sm:text-xl'
              : 'xxs:text-xl sm:text-2xl'
        } font-bold w-min mx-auto`}
      >
        {formatNumber(rank)}
      </p>
    ),
  }[rankedAs]

  const pathname = usePathname()
  const { followerTag } = useFollowerState({ address, showFollowerBadge: true })

  const isHome = pathname === '/'

  return (
    <div className='flex flex-col'>
      <div className='flex items-center w-full gap-3 p-2 pr-1.5 sm:p-4 xl:py-2 2xl:py-4  hover:bg-text/5 rounded-xl sm:gap-6 md:gap-8 h-[66px] 2xl:h-[76px]'>
        <div className='tabular-nums min-w-4 w-4 xxs:min-w-6 xxs:w-6 sm:w-10 flex justify-center text-right'>
          {rankNumber}
        </div>
        <Name address={address} name={name} avatar={avatar} followerTag={followerTag} />
        <StatsDesktop
          address={address}
          firstStat={firstStat}
          followers={followers}
          following={following}
          mutuals={mutuals}
          top8={top8}
          blocked={blocked}
        />
        <div className={`w-fit ${isHome ? 'lg:w-[25%] 2xl:w-[20%]' : 'lg:w-[15%] 2xl:w-[10%]'} flex justify-end`}>
          <FollowButton address={address} />
        </div>
      </div>
      <StatsMobile
        address={address}
        firstStat={firstStat}
        followers={followers}
        following={following}
        mutuals={mutuals}
        top8={top8}
        blocked={blocked}
      />
    </div>
  )
}

export default TableRow
