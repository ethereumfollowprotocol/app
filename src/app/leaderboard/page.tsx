import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'
import { FollowButton } from '#components/follow-button.tsx'
import { LeaderboardSearch, FilterList } from './filter.tsx'
import { Box, Text, Flex, Code, Table, Badge, Tooltip, IconButton, Avatar } from '@radix-ui/themes'

interface LeaderboardEntry {
  rank: number
  name: string
  following: string
  followers: string
  mutuals: string
  blockedMuted: string
}

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
    name: 'dr3a.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 6,
    name: 'anon.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 7,
    name: 'dragonite.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 8,
    name: 'dcj.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 9,
    name: 'dr3a.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 10,
    name: 'anon.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 11,
    name: 'dragonite.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 12,
    name: 'dcj.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 13,
    name: 'dr3a.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 14,
    name: 'anon.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 15,
    name: 'dragonite.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 16,
    name: 'dcj.eth',

    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  }
] satisfies Array<LeaderboardEntry>

export default async function LeaderboardPage({
  searchParams
}: { searchParams: { filter?: string; query?: string } }) {
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
        <Flex direction='row' justify='between' my='4'>
          <Box className='max-w-sm w-52'>
            <React.Suspense>
              <LeaderboardSearch />
            </React.Suspense>
          </Box>
          <FilterList />
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
          <Box mt='2'>
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
        <Table.Root
          size='2'
          variant='ghost'
          className='bg-white/50 rounded-xl px-2 sm:px-12 py-4'
          hidden={filteredLeaderboard.length === 0}
        >
          <Table.Header hidden>
            <Table.Row>
              <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Following</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Followers</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Mutuals</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Blocked+Muted</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                <Text as='p' className='sm:ml-6'>
                  Action
                </Text>
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
      </Flex>
    </main>
  )
}

function TableRow({ rank, name, following, followers, mutuals, blockedMuted }: LeaderboardEntry) {
  const rowNumber = (
    <React.Fragment>
      {rank === 1 ? (
        <img
          alt='1'
          src='/assets/leaderboard/1.png'
          width='40'
          className='mx-auto overflow-hidden select-none -mb-1'
        />
      ) : rank === 2 ? (
        <img alt='2' src='/assets/leaderboard/2.png' width='28' className='mx-auto select-none' />
      ) : rank === 3 ? (
        <img alt='3' src='/assets/leaderboard/3.png' width='23' className='mx-auto select-none' />
      ) : rank <= 10 ? (
        <Text size='7' as='p' className='font-bold w-min' mx='auto' my='auto'>
          {rank}
        </Text>
      ) : (
        <Text size='4' as='p' className='font-bold w-min' mx='auto' my='auto'>
          {rank}
        </Text>
      )}
    </React.Fragment>
  )

  return (
    <Table.Row align='center'>
      <Table.RowHeaderCell justify='center' className='pt-1 sm:pr-6 select-none'>
        <Box height='max-content' my='auto' className='tabular-nums text-right'>
          {rowNumber}
        </Box>
      </Table.RowHeaderCell>
      <Table.Cell data-name='name-column'>
        <Link href={`/${name}`}>
          <Flex gap='2' className='-mt-2'>
            <Avatar
              src={`https://metadata.ens.domains/mainnet/avatar/${name}`}
              fallback=''
              my='auto'
              size='4'
              radius='full'
            />
            <Flex direction='column' className='text-left' justify='start' align='start'>
              <Text as='p' className='font-bold sm:text-lg text-sm hover:text-pink-400'>
                {name}
              </Text>
              <Badge
                size='1'
                radius='full'
                className='font-bold text-[10px] bg-[#CDCDCD] text-[#333333]'
              >
                Follows you
              </Badge>
            </Flex>
          </Flex>
        </Link>
      </Table.Cell>
      <Table.Cell data-name='following-column'>
        <Box className='text-center mt-1'>
          <Text className='font-bold text-sm sm:text-md'>{following}</Text>
          <p className='text-[#888888] font-semibold text-sm sm:text-md'>Following</p>
        </Box>
      </Table.Cell>
      <Table.Cell data-name='followers-column'>
        <Box className='text-center mt-1'>
          <Text className='font-bold text-sm sm:text-md'>{followers}</Text>
          <p className='text-[#888888] font-semibold text-sm sm:text-md'>Followers</p>
        </Box>
      </Table.Cell>
      <Table.Cell data-name='mutuals-column'>
        <Box className='text-center mt-1'>
          <Text className='font-bold text-sm sm:text-md'>{mutuals}</Text>
          <p className='text-[#888888] font-semibold text-sm sm:text-md'>Mutuals</p>
        </Box>
      </Table.Cell>
      <Table.Cell data-name='blocked-muted-column'>
        <Box className='text-center mt-1'>
          <Text className='font-bold text-sm sm:text-md'>{blockedMuted}</Text>
          <p className='text-[#888888] font-semibold text-sm sm:text-md'>Blocked+Muted</p>
        </Box>
      </Table.Cell>
      <Table.Cell
        className={clsx([rank === 1 ? 'mt-5' : 'mt-2', 'flex sm:ml-6'])}
        data-name='action-column'
      >
        <FollowButton text='Follow' pending />
      </Table.Cell>
    </Table.Row>
  )
}
