import clsx from 'clsx'
import Link from 'next/link'
import type { Address } from 'viem'
import { FollowButton } from '#/components/follow-button'

interface Row {
  address: Address
  rank: number
  name: string
  following: number
  followers: number
  mutuals: number
  blockedMuted: number
}

export function TableRow({
  address,
  rank,
  name,
  following,
  followers,
  mutuals,
  blockedMuted
}: Row) {
  const rankedAs = rank <= 3 ? 'top-three' : rank <= 10 ? 'top-ten' : 'regular'
  const rankNumber = {
    'top-three': (
      <img
        alt={`${rank}`}
        src={`/assets/leaderboard/${rank}.png`}
        width={38 - (rank > 1 ? rank * 5 : 0)}
        className='mx-auto overflow-hidden select-none -mb-1 pointer-events-none'
      />
    ),
    'top-ten': <p className='text-5xl font-bold w-min mx-auto'>{rank}</p>,
    regular: <p className='text-2xl font-bold w-min mx-auto'>{rank}</p>
  }[rankedAs]

  return (
    <div className='flex items-center justify-between w-full h-[75px]'>
      <div className='tabular-nums text-right'>{rankNumber}</div>
      <div data-name='name-column'>
        <Link href={`/${name}`}>
          <div className='flex gap-2'>
            <div className='flex flex-col items-start justify-center text-left'>
              <p className='font-bold sm:text-lg text-sm hover:text-pink-400'>{name}</p>
              <div className='font-bold rounded-full text-[10px] bg-grey text-darkGrey'>
                Follows you
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div>
        <div className='text-center'>
          <p className='font-bold text-sm sm:text-lg'>{following}</p>
        </div>
      </div>
      <div>
        <div className='text-center'>
          <p className='font-bold text-sm sm:text-lg'>{followers}</p>
        </div>
      </div>
      <div>
        <div className='text-center'>
          <p className='font-bold text-sm sm:text-lg'>{mutuals}</p>
        </div>
      </div>
      <div>
        <div className='text-center'>
          <p className='font-bold text-sm sm:text-lg'>{blockedMuted}</p>
        </div>
      </div>
      <div className={clsx([rank === 1 ? 'mt-5' : 'mt-2', 'flex lg:ml-6'])}>
        <FollowButton address={address} />
      </div>
    </div>
  )
}
