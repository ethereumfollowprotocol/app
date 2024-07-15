'use client'

import { Suspense } from 'react'
import { useRouter } from 'next/navigation'

import { TableRow } from './row.tsx'
import useLeaderboard from '../hooks/useLeaderboard.ts'
import { Searchbar } from '#/components/searchbar.tsx'
import type { LeaderboardResponse } from '#/types/requests.ts'
import { leaderboardFilters, leaderboardFiltersEmojies } from '#/lib/constants/index.ts'

const LeaderboardTable = () => {
  const router = useRouter()
  const { leaderboard, filter, setFilter, search } = useLeaderboard()

  return (
    <div className='flex flex-col gap-2 w-full max-w-[1350px]'>
      <div className='flex justify-between my-3'>
        <div className='max-w-sm w-52'>
          <Suspense>
            <Searchbar queryKey='query' placeholder='Search...' />
          </Suspense>
        </div>
        <div className='flex items-center gap-4'>
          {leaderboardFilters.map((item, i) => (
            <div
              key={item}
              className={`p-2 font-semibold px-4 capitalize cursor-pointer rounded-full ${
                filter === item ? 'bg-gray-100 shadow-inner' : 'bg-gray-300'
              }`}
              onClick={() => {
                setFilter(item)
                router.push(`/leaderboard?filter=${item}${search ? `&query=${search}` : ''}`)
              }}
            >
              {`${item} ${leaderboardFiltersEmojies[i]}`}
            </div>
          ))}
        </div>
        <div className=''>
          <p className='h-2 font-semibold text-sm sm:text-lg'>
            {`${leaderboard.length} account${leaderboard.length === 1 ? '' : 's'}`}
          </p>
        </div>
      </div>
      <div className='glass-card border-slate-200 border-2 rounded-xl flex flex-col gap-4 px-12 py-10 relative border-transparent'>
        {leaderboard.length === 0 ? (
          <div className='text-3xl font-semibold'>No results</div>
        ) : (
          leaderboard.map((entry: LeaderboardResponse, index) => (
            <TableRow
              key={`${entry.address}-${index}`}
              rank={entry.rank}
              address={entry.address}
              followers={Number(entry.followers_count) || 0}
              following={Number(entry.following_count) || 0}
              mutuals={Number(entry.mutuals_count) || 0}
              blockedMuted={Number(entry.blocked_by_count) || 0}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default LeaderboardTable
