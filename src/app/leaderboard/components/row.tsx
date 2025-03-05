import type { Address } from 'viem'

import Name from './name'
import StatsDesktop from './stats-desktop'
import FollowButton from '#/components/follow-button'
import type { LeaderboardFilter } from '#/types/common'
import { formatNumber } from '#/utils/format/format-number'
import Image from 'next/image'

interface TableRowProps {
  address: Address
  name: string | null
  avatar: string | null
  header: string | null
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
  header,
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

  return (
    <div className='hover:bg-text/5 relative flex h-20 w-full items-center justify-between gap-3 pr-2 pl-3 sm:gap-4 sm:px-4'>
      {header && (
        <Image
          src={header}
          alt='header'
          width={1000}
          height={300}
          className='absolute top-0 left-0 h-full w-full object-cover opacity-20'
        />
      )}
      <div className='z-10 flex w-1/2 items-center gap-3 sm:gap-4'>
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
      <FollowButton address={address} />
    </div>
  )
}

export default TableRow
