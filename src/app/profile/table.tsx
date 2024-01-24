'use client'

import Link from 'next/link'
import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Searchbar } from '#/components/searchbar.tsx'
import { fetchFollowers, fetchFollowersAndFollowing, fetchFollowing } from './actions.ts'
import { FollowButton } from '#/components/follow-button.tsx'
import { SelectWithFilter } from '#/components/select-with-filter.tsx'
import { ChevronDownIcon, DotsHorizontalIcon, PlusIcon } from '@radix-ui/react-icons'
import { Box, Code, Flex, Table, Text, Avatar, Badge, IconButton } from '@radix-ui/themes'

export function ProfilePageTable({
  title,
  searchQuery,
  selectQuery
}: {
  title: 'following' | 'followers'
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

  const { data, error, status } = useQuery({
    queryKey: ['profile', title],
    queryFn: () =>
      title === 'following'
        ? fetchFollowing({ addressOrName: 'dr3a.eth' })
        : fetchFollowers({ addressOrName: 'dr3a.eth' })
  })

  const filterProfiles = data?.following.filter(entry =>
    entry.data.toLowerCase().replaceAll('.eth', '').includes(searchQuery.toLowerCase())
  )

  return (
    <Box height='100%' width='100%' px='2' pb='4' mx='auto'>
      <Flex mb='2' justify='between'>
        <Box className='space-x-2 flex items-end' mr='2'>
          <Text my='auto' weight='bold' className='h-full inline mt-1.5 uppercase' as='p'>
            {title}
          </Text>
          <Searchbar queryKey={searchQueryKey} placeholder='Search...' />
        </Box>
        <IconButton
          className='text-black font-semibold text-sm ml-auto '
          radius='large'
          variant='ghost'
          my='auto'
          size='1'
        >
          Tags <ChevronDownIcon />
        </IconButton>
        <Box px='0'>
          <SelectWithFilter
            dropdownOnly={true}
            defaultValue={selectQuery}
            filterQueryKey={selectQueryKey}
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
        <Table.Header hidden={true}>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Tags</Table.ColumnHeaderCell>
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
    <Table.Row align='center' className='w-full hover:bg-white/30'>
      <Table.Cell pl='4' pr='0' data-name='name-column'>
        <Flex gap='2'>
          <Avatar
            src={`${process.env.NEXT_PUBLIC_ENS_API_URL}/i/${name}`}
            fallback='/assets/gradient-circle.svg'
            my='auto'
            radius='full'
          />
          <Flex direction='column' className='text-left' justify='center' align='start'>
            <Link href={`/${name}`}>
              <Text as='p' className='font-bold xl:text-lg lg:text-md text-sm hover:text-pink-400'>
                {name}
              </Text>
            </Link>
            {type === 'following' && (
              <Badge size='1' radius='full' className='font-bold text-[10px] text-black'>
                Follows you
              </Badge>
            )}
          </Flex>
        </Flex>
      </Table.Cell>
      <Table.Cell className='my-auto'>
        <Flex className='space-x-2'>
          {type === 'following' && (
            <IconButton
              radius='full'
              variant='soft'
              size='1'
              className='w-5 h-5 text-black font-black'
              my='auto'
              mr='1'
            >
              <PlusIcon fontWeight={900} />
            </IconButton>
          )}
          <Badge variant='solid' className='bg-white text-black' radius='full'>
            ens
          </Badge>
          <Badge variant='solid' className='bg-white text-black' radius='full'>
            eth
          </Badge>
          <IconButton
            variant='soft'
            size='1'
            className='bg-white text-black font-extrabold rounded-lg h-4 my-auto'
            my='auto'
          >
            <DotsHorizontalIcon />
          </IconButton>
        </Flex>
      </Table.Cell>
      <Table.Cell pr='4' data-name='action-column'>
        <FollowButton text={type === 'following' ? 'Unfollow' : 'Follow'} pending={true} />
      </Table.Cell>
    </Table.Row>
  )
}
