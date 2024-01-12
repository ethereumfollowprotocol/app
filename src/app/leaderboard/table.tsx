'use client'

import React from 'react'
import { TableRow } from './row.tsx'
import { fetchLeaderboard } from './actions.ts'
import { useQuery } from '@tanstack/react-query'
import { SECOND } from '#/lib/constants/index.ts'
import { useQueryState } from 'next-usequerystate'
import type { LeaderboardFilter } from './types.ts'
import { Searchbar } from '#/components/searchbar.tsx'
import { SelectWithFilter } from '#/components/select-with-filter.tsx'
import { Flex, Box, Tooltip, IconButton, Table, Text } from '@radix-ui/themes'

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

  const { data, error, status } = useQuery({
    queryKey: ['leaderboard', filter],
    queryFn: () =>
      fetchLeaderboard({
        filter: filter as LeaderboardFilter,
        limit: 200,
        include: ['ens', 'blocked', 'muted', 'mutuals']
      })
  })

  const filteredLeaderboard = data?.filter(entry => entry.ens?.name?.includes(query)) ?? []

  return (
    <Flex direction='column' width='100%' className='max-w-[860px]'>
      <Flex direction='row' justify='between' my='3'>
        <Box className='max-w-sm w-52'>
          <React.Suspense>
            <Searchbar queryKey='query' placeholder='Search...' />
          </React.Suspense>
        </Box>

        <React.Suspense>
          <SelectWithFilter
            dropdownOnly={false}
            filterQueryKey='filter'
            placeholder='Select a filter'
            items={['following', 'followers', 'mutuals', 'blocked+muted']}
          />
        </React.Suspense>

        <Tooltip content='lorem ipsum' className='w-min'>
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
        </Tooltip>
        <Box className='mt-2 min-w-fit'>
          <Text
            as='p'
            className='h-2 font-semibold text-sm sm:text-md w-full leading-none sm:leading-normal'
          >
            {filteredLeaderboard.length} account{filteredLeaderboard.length === 1 ? '' : 's'}
          </Text>
        </Box>
      </Flex>
      {filteredLeaderboard.length === 0 && (
        <Box className='bg-white/70 rounded-xl' py='4'>
          <Text align='center' as='p' my='4' size='6' className='font-semibold'>
            No results
          </Text>
        </Box>
      )}

      <Table.Root
        size='2'
        variant='surface'
        className='bg-white/50 rounded-xl px-2 lg:px-8 py-4 relative border-transparent'
        hidden={filteredLeaderboard.length === 0}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className='pl-4'>Rank</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='pl-6'>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Following</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Followers</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Mutuals</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='text-center'>Blocked+Muted</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='text-center'>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
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
            />
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  )
}
