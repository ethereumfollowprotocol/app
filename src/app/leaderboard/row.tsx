import Link from 'next/link'
import type { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'

import { Avatar } from '#/components/avatar'
import { resolveEnsProfile } from '#/utils/ens'
import { truncateAddress } from '#/lib/utilities'
import { FollowButton } from '#/components/follow-button'

interface Row {
  address: Address
  rank: number
  following?: number
  followers?: number
  mutuals?: number
  blockedMuted?: number
}

export function TableRow({ address, rank, following, followers, mutuals, blockedMuted }: Row) {
  const rankedAs = rank <= 3 ? 'top-three' : rank <= 10 ? 'top-ten' : 'regular'
  const rankNumber = {
    'top-three': (
      <img
        alt={`${rank}`}
        src={`/assets/leaderboard/${rank}.png`}
        width={38 - (rank > 1 ? rank * 3 : 0)}
        className='mx-auto overflow-hidden select-none -mb-1 pointer-events-none'
      />
    ),
    'top-ten': <p className='text-5xl font-bold w-min mx-auto'>{rank}</p>,
    regular: <p className='text-2xl font-bold w-min mx-auto'>{rank}</p>
  }[rankedAs]

  const { data: fetchedEnsProfile } = useQuery({
    queryKey: ['ens metadata', address],
    queryFn: async () => await resolveEnsProfile(address)
  })

  const name = fetchedEnsProfile?.name
  const avatarUrl = fetchedEnsProfile?.avatar

  return (
    <div className='flex items-center w-full gap-8 h-[75px]'>
      <div className='tabular-nums w-10 flex justify-center text-right'>{rankNumber}</div>
      <div className='flex gap-2 items-center w-1/4' data-name='name-column'>
        <Avatar
          name={name || address}
          avatarUrl={avatarUrl}
          size='h-[45px] w-[45px] md:h-[50px] md:w-[50px]'
        />
        <div className='flex gap-2'>
          <div className='flex flex-col items-start justify-center text-left'>
            <Link href={`/${name || address}`}>
              <p className='font-bold sm:text-lg hover:opacity-60 text-sm hover:text-pink-400'>
                {name || truncateAddress(address)}
              </p>
            </Link>
            <div className='font-bold rounded-full mb-1 px-2 text-[10px] py-px bg-gray-300 text-darkGrey'>
              Follows you
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center w-[10%]'>
        <p className='font-bold text-sm sm:text-lg'>{following || 0}</p>
        <p className='font-medium'>Following</p>
      </div>
      <div className='flex flex-col items-center w-[10%]'>
        <p className='font-bold text-sm sm:text-lg'>{followers || 0}</p>
        <p className='font-medium'>Followers</p>
      </div>
      <div className='flex flex-col items-center w-[10%]'>
        <p className='font-bold text-sm sm:text-lg'>{mutuals || 0}</p>
        <p className='font-medium'>Mutuals</p>
      </div>
      <div className='flex flex-col items-center w-[12.5%]'>
        <p className='font-bold text-sm sm:text-lg'>{blockedMuted || 0}</p>
        <p className='font-medium'> Blocked/Muted</p>
      </div>
      <div className='w-[15%] flex justify-end'>
        <FollowButton address={address} />
      </div>
    </div>
  )
}
