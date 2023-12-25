import Link from 'next/link'
import * as React from 'react'
import { Searchbar } from '#components/searchbar.tsx'
import { FollowButton } from '#components/follow-button.tsx'
import { SelectWithFilter } from '#components/select-with-filter.tsx'
import { Box, Code, Flex, Table, Text, Avatar, Badge } from '@radix-ui/themes'

export function ProfilePageTable({
  title,
  profiles,
  searchQuery,
  selectQuery
}: {
  title: string
  searchQuery: string
  selectQuery: string
  profiles: Array<{
    rank: number
    name: string
    following: string
    followers: string
    mutuals: string
    blockedMuted: string
  }>
}) {
  const searchQueryKey = `${title.toLowerCase()}-query`
  const selectQueryKey = `${title.toLowerCase()}-filter`

  const filterProfiles = profiles.filter(entry =>
    entry.name.toLowerCase().replaceAll('.eth', '').includes(searchQuery.toLowerCase())
  )

  return (
    <Box height='100%' width='100%' p='2' mx='auto'>
      <Flex mb='2' justify='between'>
        <Box className='space-x-2 flex items-end'>
          <Text my='auto' weight='bold' className='h-full inline mt-1.5' as='p'>
            {title}
          </Text>
          <Searchbar queryKey={searchQueryKey} placeholder='Search...' />
        </Box>
        <Box px='0'>
          <SelectWithFilter
            dropdownOnly
            queryKey={selectQueryKey}
            defaultValue={selectQuery}
            items={['follower count', 'latest first', 'earliest first', 'alphabetical']}
          />
        </Box>
      </Flex>
      {filterProfiles.length === 0 && (
        <Box className='bg-white/70 rounded-xl' py='4'>
          <Text align='center' as='p' my='4' size='6' className='font-semibold'>
            No results for
            <Code variant='outline' color='gray' ml='2'>
              {searchQuery}
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
            <TableRow key={`${entry.name}-${index}`} type={title.toLowerCase()} name={entry.name} />
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

function TableRow({ name, type }: { name: string; type: string }) {
  return (
    <Table.Row align='center' className='w-full'>
      <Table.Cell width='100%' pl='4' data-name='name-column'>
        <Link href={`/${name}`}>
          <Flex gap='2'>
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

      <Table.Cell pr='4' data-name='action-column'>
        <FollowButton text={type === 'following' ? 'Unfollow' : 'Follow'} pending />
      </Table.Cell>
    </Table.Row>
  )
}
