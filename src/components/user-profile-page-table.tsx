'use client'

import {
  fetchUserFollowers,
  fetchUserFollowing,
  type FollowerResponse,
  type FollowingResponse
} from '#/api/actions'
import { FollowButton } from '#/components/follow-button.tsx'
import { Searchbar } from '#/components/searchbar.tsx'
import { SelectWithFilter } from '#/components/select-with-filter.tsx'
import { ChevronDownIcon, DotsHorizontalIcon, PlusIcon } from '@radix-ui/react-icons'
import { Avatar, Badge, Box, Flex, IconButton, Table, Text } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

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

  /////////////////////////////////////////////////////////////////////////////
  // followers for the connected account
  /////////////////////////////////////////////////////////////////////////////
  const { isConnected, address: connectedAddress } = useAccount()
  const {
    data: connectedAddressFollowersData,
    error: connectedAddressFollowersError,
    status: connectedAddressFollowersStatus
  } = useQuery({
    queryKey: ['profile', 'followers', connectedAddress],
    enabled: connectedAddress !== undefined,
    queryFn: () => fetchUserFollowers({ addressOrName: connectedAddress as Address })
  })
  const connectedAddressFollowerResponses: FollowerResponse[] | undefined =
    connectedAddressFollowersData?.followers
  const connectedAddressFollowerAddresses: Address[] | undefined =
    connectedAddressFollowerResponses?.map(entry => entry.address)

  /////////////////////////////////////////////////////////////////////////////
  // followers for the user profile that is being viewed
  /////////////////////////////////////////////////////////////////////////////
  const {
    data: followersData,
    error: followersError,
    status: followersStatus
  } = useQuery({
    queryKey: ['profile', 'followers', addressOrName],
    enabled: title === 'followers',
    queryFn: () => fetchUserFollowers({ addressOrName })
  })
  const followerResponses: FollowerResponse[] | undefined = followersData?.followers
  const filterFollowerResponses: FollowerResponse[] | undefined = followerResponses?.filter(entry =>
    entry?.ens.name?.toLowerCase().replaceAll('.eth', '').includes(searchQuery.toLowerCase())
  )

  /////////////////////////////////////////////////////////////////////////////
  // following for the user profile that is being viewed
  /////////////////////////////////////////////////////////////////////////////
  const {
    data: followingData,
    error: followingError,
    status: followingStatus
  } = useQuery({
    queryKey: ['profile', 'following', addressOrName],
    enabled: title === 'following',
    queryFn: () => fetchUserFollowing({ addressOrName })
  })
  const followingResponses: FollowingResponse[] | undefined = followingData?.following
  const filterFollowingResponses: FollowingResponse[] | undefined = followingResponses?.filter(
    entry => entry?.data?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const chosenResponses = title === 'following' ? filterFollowingResponses : filterFollowerResponses

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
      {chosenResponses?.length === 0 && (
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
        hidden={chosenResponses?.length === 0}
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
          {chosenResponses?.map((entry, index) => {
            return title === 'followers'
              ? FollowerRow(
                  entry as FollowerResponse,
                  index,
                  connectedAddressFollowerAddresses === undefined
                    ? []
                    : connectedAddressFollowerAddresses
                )
              : FollowingRow(
                  entry as FollowingResponse,
                  index,
                  connectedAddressFollowerAddresses === undefined
                    ? []
                    : connectedAddressFollowerAddresses
                )
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

function FollowerRow(
  followerResponse: FollowerResponse,
  index: number,
  connectedFollowerAddresses: Address[]
) {
  return (
    <TableRow
      tableType={'followers'}
      tags={followerResponse.tags}
      status={
        followerResponse.is_blocked
          ? 'blocked'
          : followerResponse.is_muted
            ? 'muted'
            : followerResponse.is_following
              ? 'following'
              : 'none'
      }
      key={`${followerResponse.address}-${index}`}
      name={followerResponse.ens.name || followerResponse.address}
      address={followerResponse.address}
      connectedFollowerAddresses={connectedFollowerAddresses}
    />
  )
}

function FollowingRow(
  followingResponse: FollowingResponse,
  index: number,
  connectedFollowerAddresses: Address[]
) {
  return (
    <TableRow
      tableType={'following'}
      tags={followingResponse.tags}
      status={
        followingResponse.tags.includes('block')
          ? 'blocked'
          : followingResponse.tags.includes('mute')
            ? 'muted'
            : 'following'
      }
      key={`${followingResponse.data}-${index}`}
      name={followingResponse.ens?.name || followingResponse.data}
      address={followingResponse.data}
      connectedFollowerAddresses={connectedFollowerAddresses}
    />
  )
}

function TableRow({
  tableType,
  address,
  name,
  avatar,
  status,
  tags,
  connectedFollowerAddresses
}: {
  tableType?: 'following' | 'followers'
  address: Address
  name: string

  avatar?: string
  status: 'following' | 'blocked' | 'muted' | 'subscribed' | 'none'
  tags: Array<string>
  connectedFollowerAddresses: Array<Address>
}) {
  return (
    <Table.Row
      align='center'
      className='w-full hover:bg-white/30 flex justify-evenly h-[74px] mb-2'
    >
      {/* avatar */}
      <Table.Cell pl='4' pr='0' data-name='name-column' className='my-auto h-full'>
        <Flex gap='2' my='auto'>
          <div className='flex items-center h-[50px]'>
            {/* Adjust the height as necessary */}
            <Avatar
              alt="User's avatar"
              className='auto rounded-full my-auto'
              size='4'
              fallback={
                <Avatar src='/assets/gradient-circle.svg' radius='full' size='4' fallback='' />
              }
              src={avatar || `${process.env.NEXT_PUBLIC_ENS_API_URL}/i/${name}`}
            />
          </div>
          <Flex
            direction='column'
            justify='center'
            align='start'
            className='text-right tabular-nums h-full'
          >
            {/* The name should be wrapped in a div that will always be centered vertically */}
            <div className='flex items-center h-[50px]'>
              {' '}
              {/* Adjust the height as necessary */}
              <Link href={`/${name || address}`} className=''>
                <Text
                  as='p'
                  className='font-bold xl:text-lg lg:text-md text-sm hover:text-pink-400'
                >
                  {name}
                </Text>
              </Link>
            </div>
            {/* Badge will appear below the name, but the name stays centered */}
            {tableType === 'following' &&
              status === 'following' &&
              connectedFollowerAddresses.includes(address) && (
                <Badge
                  size='1'
                  radius='full'
                  className='font-bold text-[8px] text-black self-start mt-[-12]'
                >
                  Follows you
                </Badge>
              )}
          </Flex>
        </Flex>
      </Table.Cell>
      {/* tags */}
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
      {/* follow button */}
      <Table.Cell pr='4' data-name='action-column' className='w-min'>
        <FollowButton
          address={address}
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
          // pending={true} // why is this true? what is that suppose to do?
        />
      </Table.Cell>
    </Table.Row>
  )
}
