'use client'

import { Suspense } from 'react'
import { useRouter } from 'next/navigation'

import TableRow from './row.tsx'
import LoadingRow from './loading-row.tsx'
import { Searchbar } from '#/components/searchbar.tsx'
import useLeaderboard from '../hooks/useLeaderboard.ts'
import type { LeaderboardResponse } from '#/types/requests.ts'
import { leaderboardFilters, leaderboardFiltersEmojies } from '#/lib/constants/index.ts'

const LeaderboardTable = () => {
  const router = useRouter()
  const {
    leaderboard,
    filter,
    setFilter,
    search,
    loadMoreRef,
    isFetchingMoreLeaderboard,
    isLeaderboardLoading
  } = useLeaderboard()

  return (
    <div className='flex flex-col mt-6 gap-6 w-full max-w-[1400px]'>
      <div className='flex w-full flex-wrap justify-center lg:hidden items-center gap-4'>
        {leaderboardFilters.map((item, i) => (
          <div
            key={item}
            className={`p-2 font-semibold w-[132px] px-4 capitalize cursor-pointer rounded-full ${
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
      <div className='flex justify-between'>
        <div className='w-full sm:max-w-sm sm:w-52'>
          <Suspense>
            <Searchbar queryKey='query' placeholder='Search...' />
          </Suspense>
        </div>
        <div className='hidden lg:flex items-center gap-4'>
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
        <div className='hidden sm:block'>
          <p className='h-2 font-semibold text-sm sm:text-lg'>
            {`${leaderboard.length} account${leaderboard.length === 1 ? '' : 's'}`}
          </p>
        </div>
      </div>
      <div className='glass-card border-gray-200 border-2 rounded-xl flex flex-col gap-4 p-3 sm:px-8 sm:py-6 lg:px-12 lg:py-10 relative'>
        {leaderboard.map((entry: LeaderboardResponse, index) => (
          <TableRow
            key={`${entry.address}-${index}`}
            address={entry.address}
            name={entry.name}
            avatar={entry.avatar}
            rank={index + 1 || Number(entry.mutuals_rank)}
            followers={Number(entry.followers) || 0}
            following={Number(entry.following) || 0}
            mutuals={Number(entry.mutuals) || 0}
            blockedMuted={Number(entry.blocks) || 0}
          />
        ))}
        {(isLeaderboardLoading || isFetchingMoreLeaderboard) &&
          new Array(100).fill(1).map((_, i) => <LoadingRow key={i} />)}
        <div ref={loadMoreRef} className='h-px w-full' />
      </div>
    </div>
  )
}

export default LeaderboardTable
