import * as React from 'react'
import { TableRow } from './row.tsx'
import { ProfileCard } from '#components/profile.tsx'
import { Searchbar } from '#components/searchbar.tsx'
import { Box, Code, Flex, Table, Text } from '@radix-ui/themes'
import { SelectWithFilter } from '#components/select-with-filter.tsx'

const profiles = [
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
]

export default async function ProfilePage({
  searchParams
}: {
  searchParams: {
    'following-query'?: string
    'following-filter'?: string
  }
}) {
  const followingQuery = searchParams['following-query'] || ''
  const followingFilter = searchParams['following-filter'] || 'follower count'

  const filterProfiles = profiles.filter(entry => entry.name.toLowerCase().includes(followingQuery))

  return (
    <main className='mx-auto flex min-h-full h-full w-full flex-col items-center text-center p-4'>
      <Flex
        width='100%'
        height='100%'
        justify='center'
        gap='3'
        mx='auto'
        className='lg:flex-row justify-center flex-col min-h-full lg:max-w-[1400px] max-w-2xl  border-kournikova-50'
      >
        <Box height='100%' width='min-content' p='2' mx='auto' className=' border-green-300'>
          <ProfileCard
            profile={{
              name: 'esm.eth',
              avatar: 'https://euc.li/esm.eth',
              address: '0xf4212614C7Fe0B3feef75057E88b2E77a7E23e83'
            }}
          />
        </Box>

        <Box height='100%' width='100%' p='2' mx='auto' className=' border-green-300'>
          <Flex mb='2' justify='between'>
            <Box className='space-x-2 flex items-end'>
              <Text my='auto' weight='bold' className='h-full inline mt-1.5' as='p'>
                Following
              </Text>
              <Searchbar queryKey='following-query' placeholder='Search...' />
            </Box>
            <Box px='0'>
              <SelectWithFilter
                dropdownOnly
                queryKey='following-filter'
                defaultValue={followingFilter}
                items={['follower count', 'latest first', 'earliest first', 'alphabetical']}
              />
            </Box>
          </Flex>
          {filterProfiles.length === 0 && (
            <Box className='bg-white/70 rounded-xl' py='4'>
              <Text align='center' as='p' my='4' size='6' className='font-semibold'>
                No results for
                <Code variant='outline' color='gray' ml='2'>
                  {followingQuery}
                </Code>
              </Text>
            </Box>
          )}
          <Table.Root
            size='2'
            variant='ghost'
            hidden={filterProfiles.length === 0}
            className='bg-white/50 rounded-xl py-4 border-transparent'
          >
            <Table.Header hidden>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filterProfiles.map((entry, index) => (
                <TableRow key={`${entry.name}-${index}`} name={entry.name} />
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Flex>
    </main>
  )
}
