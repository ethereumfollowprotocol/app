'use client'
import { Suspense } from 'react'

import { TableRow } from './row.tsx'
import useLeaderboard from './useLeaderboard.ts'
import { Searchbar } from '#/components/searchbar.tsx'
import type { LeaderboardResponse } from '#/types/requests.ts'

const LeaderboardTable = () => {
  const { leaderboard } = useLeaderboard()

  return (
    <div className='flex flex-col w-full max-w-[1350px]'>
      <div className='flex justify-between my-3'>
        <div className='max-w-sm w-52'>
          <Suspense>
            <Searchbar queryKey='query' placeholder='Search...' />
          </Suspense>
        </div>
        <div className='mt-2 min-w-fit'>
          <p className='h-2 font-semibold text-sm sm:text-md w-full leading-none sm:leading-normal'>
            {leaderboard.length} account
            {leaderboard.length === 1 ? '' : 's'}
          </p>
        </div>
      </div>
      {leaderboard.length === 0 && (
        <div className='bg-white/70 rounded-xl py-4'>
          <p className='text-center my-4 text-4xl font-semibold'>No results</p>
        </div>
      )}

      <div className='glass-card border-slate-200 border-2 rounded-xl flex flex-col gap-4 px-12 py-10 relative border-transparent'>
        {leaderboard.map((entry: LeaderboardResponse, index) => (
          <TableRow
            key={`${entry.address}-${index}`}
            rank={entry.rank}
            address={entry.address}
            followers={Number(entry.followers_count) || 0}
            // following={entry.following_count || 0}
            // mutuals={entry.mutuals_count || 0}
            // blockedMuted={entry.blocked_count + entry.muted_count || 0}
          />
        ))}
      </div>
    </div>
  )
}

export default LeaderboardTable
