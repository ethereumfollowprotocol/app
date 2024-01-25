'use client'

import Link from 'next/link'
import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Searchbar } from '#/components/searchbar.tsx'
import { fetchFollowers, fetchFollowing } from './actions.ts'
import { FollowButton } from '#/components/follow-button.tsx'
import { SelectWithFilter } from '#/components/select-with-filter.tsx'
import { ChevronDownIcon, DotsHorizontalIcon, PlusIcon } from '@radix-ui/react-icons'
import { Box, Code, Flex, Table, Text, Avatar, Badge, IconButton } from '@radix-ui/themes'

/**
 * TODO: paginate
 */
export function ProfilePageTable({
  title,
  searchQuery,
  selectQuery
}: {
  title: 'following' | 'followers'
  searchQuery: string
  selectQuery: string
}) {
  const searchQueryKey = `${title.toLowerCase()}-query`
  const selectQueryKey = `${title.toLowerCase()}-filter`

  const {
    data: followersData,
    error: followersError,
    status: followersStatus
  } = useQuery({
    queryKey: ['profile', 'followers'],
    enabled: title === 'followers',
    queryFn: () => fetchFollowers({ addressOrName: 'dr3a.eth' })
  })
  const followersProfiles = followersData?.followers
  const filterFollowersProfiles = followersProfiles?.filter(entry =>
    entry?.ens.name?.toLowerCase().replaceAll('.eth', '').includes(searchQuery.toLowerCase())
  )

  const {
    data: followingData,
    error: followingError,
    status: followingStatus
  } = useQuery({
    queryKey: ['profile', 'following'],
    queryFn: () => fetchFollowing({ addressOrName: 'dr3a.eth' })
  })
  const followingProfiles = followingData?.following
  const filterFollowingProfiles = followingProfiles?.filter(entry =>
    entry?.data?.toLowerCase().includes(searchQuery.toLowerCase())
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
      {filterFollowersProfiles?.length === 0 && (
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
        hidden={filterFollowersProfiles?.length === 0}
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
          {filterFollowersProfiles?.map((entry, index) => (
            <TableRow
              tableType={title}
              tags={entry.tags}
              status={
                entry.is_blocked
                  ? 'blocked'
                  : entry.is_muted
                    ? 'muted'
                    : entry.is_following
                      ? 'following'
                      : 'none'
              }
              key={`${entry.address}-${index}`}
              name={entry.ens.name || entry.address}
            />
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

function TableRow({
  tableType,
  address,
  name,
  avatar,
  status,
  tags
}: {
  tableType?: 'following' | 'followers'
  address?: string
  name: string

  avatar?: string
  status: 'following' | 'blocked' | 'muted' | 'subscribed' | 'none'
  tags: Array<string>
}) {
  return (
    <Table.Row align='center' className='w-full hover:bg-white/30 flex justify-evenly h-14 mb-2'>
      <Table.Cell pl='4' pr='0' data-name='name-column' className='my-auto h-full'>
        <Flex gap='2' my='auto'>
          <Avatar
            alt="User's avatar"
            className='auto rounded-full my-auto'
            size='4'
            fallback=''
            src={avatar || `${process.env.NEXT_PUBLIC_ENS_API_URL}/i/${name}`}
          />
          <Flex
            direction='column'
            className='text-right tabular-nums'
            justify='center'
            align='start'
          >
            <Link href={`/${name || address}`} className=''>
              <Text as='p' className='font-bold xl:text-lg lg:text-md text-sm hover:text-pink-400'>
                {name}
              </Text>
            </Link>
            {tableType === 'following' && status === 'following' && (
              <Badge size='1' radius='full' className='font-bold text-[10px] text-black'>
                Follows you
              </Badge>
            )}
          </Flex>
        </Flex>
      </Table.Cell>
      <Table.Cell className='my-auto ml-auto'>
        <Flex className='space-x-2 m-auto'>
          {status === 'following' && (
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
          {tags.map(tag => (
            <Badge key={tag} variant='solid' className='bg-white text-black' radius='full'>
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <IconButton
              variant='soft'
              size='1'
              className='bg-white text-black font-extrabold rounded-lg h-4 my-auto'
              my='auto'
            >
              <DotsHorizontalIcon />
            </IconButton>
          )}
        </Flex>
      </Table.Cell>
      <Table.Cell pr='4' data-name='action-column' className='w-min'>
        <FollowButton
          text={
            status === 'following'
              ? 'Unfollow'
              : status === 'blocked'
                ? 'Unblock'
                : status === 'muted'
                  ? 'Unmute'
                  : status === 'subscribed'
                    ? 'Unsubscribe'
                    : 'Follow'
          }
          pending={true}
        />
      </Table.Cell>
    </Table.Row>
  )
}
