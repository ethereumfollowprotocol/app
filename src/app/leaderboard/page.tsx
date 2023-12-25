import * as React from 'react'
import { TableRow } from './row.tsx'
import { Searchbar } from '#components/searchbar.tsx'
import { SelectWithFilter } from '#components/select-with-filter.tsx'
import { Box, Text, Flex, Code, Table, Tooltip, IconButton } from '@radix-ui/themes'

const leaderboard = [
  {
    rank: 1,
    name: 'dr3a.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 2,
    name: 'anon.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 3,
    name: 'dragonite.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 4,
    name: 'dcj.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 5,
    name: 'esm.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  }
] satisfies Array<React.ComponentProps<typeof TableRow>>

export default async function LeaderboardPage({
  searchParams
}: {
  searchParams: { query?: string }
}) {
  const query = searchParams.query || ''

  const filteredLeaderboard = leaderboard.filter(entry =>
    entry.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <main className='font-sans mx-auto flex h-full min-h-full w-full flex-col items-center overflow-scroll mb-12 px-4 pt-6 text-center'>
      <Text size='7' className='font-bold' mb='5'>
        Leaderboard
      </Text>
      <Flex direction='column' width='100%' className='max-w-5xl'>
        <Flex direction='row' justify='between' my='3'>
          <Box className='max-w-sm w-52'>
            <React.Suspense>
              <Searchbar queryKey='query' placeholder='Search...' />
            </React.Suspense>
          </Box>

          <SelectWithFilter
            queryKey='filter'
            dropdownOnly={false}
            items={['following', 'followers', 'mutuals', 'blocked+muted']}
          />

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
          <Box className='mt-2'>
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
              No results for
              <Code variant='outline' color='gray' ml='2'>
                {query}
              </Code>
            </Text>
          </Box>
        )}
        <div className='overflow-auto'>
          <Table.Root
            size='2'
            variant='surface'
            className='bg-white/50 rounded-xl px-2 lg:px-8 py-4 relative border-transparent'
            hidden={filteredLeaderboard.length === 0}
          >
            <Table.Header>
              <Table.Row className='top-0 sticky'>
                <Table.ColumnHeaderCell className='top-0 sticky pl-4'>Rank</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='top-0 sticky pl-6'>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='top-0 sticky'>Following</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='top-0 sticky'>Followers</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='top-0 sticky'>Mutuals</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='top-0 sticky text-center'>
                  Blocked+Muted
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='top-0 sticky text-center'>
                  Action
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredLeaderboard.map((entry, index) => (
                <TableRow
                  key={`${entry.name}-${index}`}
                  rank={entry.rank}
                  name={entry.name}
                  following={entry.following}
                  followers={entry.followers}
                  mutuals={entry.mutuals}
                  blockedMuted={entry.blockedMuted}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </Flex>
    </main>
  )
}
