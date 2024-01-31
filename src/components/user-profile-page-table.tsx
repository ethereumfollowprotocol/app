'use client'

import { fetchFollowers, fetchFollowing, type Follower, type Following } from '#/app/api/actions.ts'
import { FollowButton } from '#/components/follow-button.tsx'
import { Searchbar } from '#/components/searchbar.tsx'
import { SelectWithFilter } from '#/components/select-with-filter.tsx'
import { ChevronDownIcon, DotsHorizontalIcon, PlusIcon } from '@radix-ui/react-icons'
import { Avatar, Badge, Box, Flex, IconButton, Table, Text } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

/**
 * TODO: paginate
 */
export function UserProfilePageTable({
  addressOrName,
  title,
  searchQuery,
  selectQuery
}: {
  addressOrName: string
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
    queryKey: ['profile', 'followers', addressOrName],
    enabled: title === 'followers',
    queryFn: () => fetchFollowers({ addressOrName })
  })
  const followersProfiles: Follower[] | undefined = followersData?.followers
  const filterFollowersProfiles: Follower[] | undefined = followersProfiles?.filter(entry =>
    entry?.ens.name?.toLowerCase().replaceAll('.eth', '').includes(searchQuery.toLowerCase())
  )

  const {
    data: followingData,
    error: followingError,
    status: followingStatus
  } = useQuery({
    queryKey: ['profile', 'following', addressOrName],
    enabled: title === 'following',
    queryFn: () => fetchFollowing({ addressOrName })
  })
  const followingProfiles: Following[] | undefined = followingData?.following
  const filterFollowingProfiles: Following[] | undefined = followingProfiles?.filter(entry =>
    entry?.data?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const profiles = title === 'following' ? filterFollowingProfiles : filterFollowersProfiles

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
      {profiles?.length === 0 && (
        <Box className='bg-white/70 rounded-xl' py='4'>
          <Text align='center' as='p' my='4' size='6' className='font-semibold'>
            {title === 'followers' && (
              <Text as='span' className='text-sm'>
                No followers
              </Text>
            )}
            {title === 'following' && (
              <Flex direction='column' align='center'>
                <Text as='span' className='text-m text-[#FF79C9] italic mb-1'>
                  You don’t follow anyone yet.
                </Text>
                <Text as='span' className='text-m text-[#FF79C9] italic mb-4'>
                  Sad! 😢
                </Text>
                <Text as='span' className='text-sm text-[#FF79C9] italic w-3/4 max-w-96'>
                  To get started, just browse and start following. Once you confirm them onchain,
                  they’ll show up here.
                </Text>
              </Flex>
            )}
          </Text>
        </Box>
      )}
      <Table.Root
        size='2'
        variant='ghost'
        hidden={profiles?.length === 0}
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
          {profiles?.map((entry, index) => {
            return title === 'followers'
              ? followerRow(title, entry as Follower, index)
              : followingRow(title, entry as Following, index)
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

function followerRow(title: 'followers', entry: Follower, index: number) {
  return (
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
  )
}

function followingRow(title: 'following', entry: Following, index: number) {
  return (
    <TableRow
      tableType={title}
      tags={entry.tags}
      status={
        entry.tags.includes('block')
          ? 'blocked'
          : entry.tags.includes('mute')
            ? 'muted'
            : 'following'
      }
      key={`${entry.data}-${index}`}
      name={entry.ens.name || entry.data}
    />
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
            fallback={
              <Avatar src='/assets/gradient-circle.svg' radius='full' size='4' fallback='' />
            }
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
                TODO
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
