'use client'

import { TableRow } from './row.tsx'
import { fetchLeaderboard } from './actions.ts'
import { useQuery } from '@tanstack/react-query'
import { SECOND } from '#/lib/constants/index.ts'
import { useQueryState } from 'next-usequerystate'
import type { LeaderboardFilter } from './types.ts'
import { Searchbar } from '#/components/searchbar.tsx'
import { SelectWithFilter } from '#/components/select-with-filter.tsx'
import { Suspense } from 'react'

export function LeaderboardTable({
  initialFilter,
  query
}: {
  initialFilter: LeaderboardFilter
  query: string
}) {
  const [filter] = useQueryState('filter', {
    throttleMs: SECOND / 2,
    defaultValue: initialFilter ?? null
  })

  const { data } = useQuery({
    queryKey: ['leaderboard', filter],
    queryFn: () =>
      fetchLeaderboard({
        filter: filter as LeaderboardFilter,
        limit: 4, // change to 200 once ENS data is fixed
        include: ['ens', 'blocked', 'muted', 'mutuals']
      })
  })

  const filteredLeaderboard = data ?? []
  // const filteredLeaderboard =
  // 	data?.filter((entry) => entry.ens?.name?.includes(query)) ?? [];

  return (
    <div className='flex flex-col w-full max-w-[860px]'>
      <div className='flex justify-between my-3'>
        <div className='max-w-sm w-52'>
          <Suspense>
            <Searchbar queryKey='query' placeholder='Search...' />
          </Suspense>
        </div>

        <Suspense>
          <SelectWithFilter
            dropdownOnly={false}
            filterQueryKey='filter'
            placeholder='Select a filter'
            items={['following', 'followers', 'mutuals', 'blocked+muted']}
          />
        </Suspense>
        {/* <div className='w-min'>
          <IconButton
            radius='full'
            mr='2'
            size='1'
            variant='soft'
            my='auto'
            className='bg-white font-bold text-gray-400 ml-auto'
          >
            ?
          </IconButton>
        </div> */}
        <div className='mt-2 min-w-fit'>
          <p className='h-2 font-semibold text-sm sm:text-md w-full leading-none sm:leading-normal'>
            {filteredLeaderboard.length} account
            {filteredLeaderboard.length === 1 ? '' : 's'}
          </p>
        </div>
      </div>
      {filteredLeaderboard.length === 0 && (
        <div className='bg-white/70 rounded-xl py-4'>
          <p className='text-center my-4 text-4xl font-semibold'>No results</p>
        </div>
      )}

      <div className='bg-white/50 rounded-xl px-2 lg:px-8 py-4 relative border-transparent'>
        <div>
          <div>
            <p className='pl-4'>Rank</p>
            <p className='pl-6'>Name</p>
            <p>Following</p>
            <p>Followers</p>
            <p>Mutuals</p>
            <p className='text-center'>Blocked+Muted</p>
            <p className='text-center'>Action</p>
          </div>
        </div>
        <div>
          {filteredLeaderboard.map((entry, index) => (
            /**
             * TODO: update the 0s once the API is ready
             */
            <TableRow
              key={`${entry.address}-${index}`}
              rank={entry.rank}
              name={entry.ens?.name || entry.address}
              following={entry.following_count || 0}
              followers={entry.followers_count || 0}
              mutuals={entry.mutuals_count || 0}
              blockedMuted={entry.blocked_count + entry.muted_count || 0}
              status='none'
              address={entry.address}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
