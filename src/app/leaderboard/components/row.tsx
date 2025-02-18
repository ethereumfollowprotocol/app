import type { Address } from 'viem'
import { usePathname } from 'next/navigation'

import Name from './name'
import StatsDesktop from './stats-desktop'
import FollowButton from '#/components/follow-button'
import type { LeaderboardFilter } from '#/types/common'
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
    'no-rank': <p className='mx-auto w-min text-2xl font-bold sm:text-3xl'>-</p>,
    'top-three': (
      <p
        className={`xxs:text-3xl text-2xl sm:text-4xl md:text-5xl ${
          {
            1: 'first-place',
            2: 'second-place',
            3: 'third-place',
          }[rank]
        } `}
      >
        {rank}
      </p>
    ),
    'top-ten': <p className='xxs:text-3xl mx-auto w-min text-2xl font-bold sm:text-4xl'>{rank}</p>,
    regular: (
      <p
        className={`text ${
          rank >= 10000
            ? 'xxs:text-sm text-xs'
            : rank >= 1000
              ? 'xxs:text-base text-sm sm:text-lg'
              : 'xxs:text-lg sm:text-xl'
        } mx-auto w-min font-bold`}
      >
        {formatNumber(rank)}
      </p>
    ),
  }[rankedAs]

  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <div className='hover:bg-text/5 flex h-[84px] w-full items-center justify-between gap-3 pr-2 pl-3 sm:gap-4 sm:px-4'>
      <div className='flex w-1/2 items-center gap-3 sm:gap-4'>
        <div className='xxs:min-w-6 xxs:w-6 flex w-4 min-w-4 justify-center text-right tabular-nums sm:w-10'>
          {rankNumber}
        </div>
        <Name address={address} name={name} avatar={avatar} />
      </div>
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
  )
}

export default TableRow
