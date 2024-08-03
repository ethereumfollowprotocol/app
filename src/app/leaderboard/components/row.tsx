import Link from 'next/link'
import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'

import { Avatar } from '#/components/avatar'
import { resolveEnsProfile } from '#/utils/ens'
import { truncateAddress } from '#/lib/utilities'
import FollowButton from '#/components/follow-button'
import useFollowState from '#/hooks/use-follow-state'

interface TableRowProps {
  address: Address
  rank: number
  following?: number
  followers?: number
  mutuals?: number
  blockedMuted?: number
}

const TableRow: React.FC<TableRowProps> = ({
  address,
  rank,
  following,
  followers,
  mutuals,
  blockedMuted
}) => {
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
    'top-ten': (
      <p className='text-2xl xxs:text-3xl sm:text-4xl md:text-5xl font-bold w-min mx-auto'>
        {rank}
      </p>
    ),
    regular: <p className='text xxs:text-xl sm:text-2xl font-bold w-min mx-auto'>{rank}</p>
  }[rankedAs]

  const { data: fetchedEnsProfile } = useQuery({
    queryKey: ['ens metadata', address],
    queryFn: async () => await resolveEnsProfile(address)
  })

  const { t } = useTranslation()
  const { followerTag } = useFollowState({
    address,
    type: 'follower'
  })

  const name = fetchedEnsProfile?.name
  const avatarUrl = fetchedEnsProfile?.avatar

  return (
    <div className='flex items-center w-full gap-4 sm:gap-6 md:gap-8 h-[75px]'>
      <div className='tabular-nums min-w-4 w-4 xxs:min-w-6 xxs:w-6 sm:w-10 flex justify-center text-right'>
        {rankNumber}
      </div>
      <div
        className='flex gap-2 items-center w-[55%] xxs:w-[56%] xs:w-2/3 sm:w-1/2 md:w-[40%] xl:w-1/4'
        data-name='name-column'
      >
        <Avatar
          name={name || address}
          avatarUrl={avatarUrl}
          size='h-[45px] w-[45px] md:h-[50px] md:w-[50px]'
        />
        <div className='flex flex-col items-start max-w-[calc(100% - 45px)] md:max-w-[calc(100% - 50px)] truncate justify-center text-left'>
          <Link href={`/${name || address}`} className='w-full'>
            <p className='font-bold text-base xxs:text-lg truncate max-w-full hover:opacity-60 hover:text-pink-400'>
              {name || truncateAddress(address)}
            </p>
          </Link>
          <div
            className={`rounded-full font-bold text-[10px] flex items-center justify-center bg-gray-300 h-5 w-20 ${followerTag.className}`}
          >
            {t(`profile card.${followerTag.text}`)}
          </div>
        </div>
      </div>
      <div className=' flex-col items-center w-[12.5%] xl:w-[11%] hidden lg:flex'>
        <p className='font-bold text-sm sm:text-lg'>{mutuals || 0}</p>
        <p className='font-medium'>Mutuals</p>
      </div>
      <div className='hidden md:flex flex-col items-center w-[15%] lg:w-[12.5%] xl:w-[11%]'>
        <p className='font-bold text-sm sm:text-lg'>{following || 0}</p>
        <p className='font-medium'>Following</p>
      </div>
      <div className='hidden sm:flex flex-col items-center w-[15%] lg:w-[12.5%] xl:w-[11%]'>
        <p className='font-bold text-sm sm:text-lg'>{followers || 0}</p>
        <p className='font-medium'>Followers</p>
      </div>
      <div className='flex-col items-center w-[11%] hidden xl:flex'>
        <p className='font-bold text-sm sm:text-lg'>{blockedMuted || 0}</p>
        <p className='font-medium'> Blocked</p>
      </div>
      <div className='lg:w-[15%] 2xl:w-[12.5%] flex justify-end'>
        <FollowButton address={address} />
      </div>
    </div>
  )
}

export default TableRow
