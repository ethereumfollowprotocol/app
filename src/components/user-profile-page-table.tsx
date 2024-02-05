'use client'

import { useConnectedProfile, useProfile, type FollowState as FollowingStatus } from '#/api/actions'
import type { FollowerResponse, FollowingResponse } from '#/api/requests'
import { FollowButton } from '#/components/follow-button.tsx'
import { Searchbar } from '#/components/searchbar.tsx'
import { SelectWithFilter } from '#/components/select-with-filter.tsx'
import { useCart } from '#/contexts/cart-context'
import { ChevronDownIcon, DotsHorizontalIcon, PlusIcon } from '@radix-ui/react-icons'
import { Avatar, Badge, Box, Flex, IconButton, Table, Text } from '@radix-ui/themes'
import Link from 'next/link'
import type { Address } from 'viem'

type FollowButtonStatus = 'following' | 'blocked' | 'muted' | 'none'

function getFollowButtonStatus(following: FollowingResponse | undefined): FollowButtonStatus {
  let status: FollowButtonStatus = 'none'
  if (following !== undefined) {
    if (following.tags.includes('block')) {
      status = 'blocked'
    } else if (following.tags.includes('mute')) {
      status = 'muted'
    } else {
      status = 'following'
    }
  }
  return status
}

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
  const { profile: connectedProfile } = useConnectedProfile()
  const { followers, following } = useProfile(addressOrName)

  const searchQueryKey = `${title.toLowerCase()}-query`
  const selectQueryKey = `${title.toLowerCase()}-filter`

  const filteredFollowers: FollowerResponse[] | undefined = followers?.filter(
    (follower: FollowerResponse) =>
      follower?.ens.name?.toLowerCase().replaceAll('.eth', '').includes(searchQuery.toLowerCase())
  )
  const filteredFollowing: FollowingResponse[] | undefined = following?.filter(
    (following: FollowingResponse) =>
      following?.data?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const chosenResponses = title === 'following' ? filteredFollowing : filteredFollowers

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
          {chosenResponses?.map((followerOrFollowing, index) => {
            const address: Address =
              title === 'followers'
                ? (followerOrFollowing as FollowerResponse).address
                : (followerOrFollowing as FollowingResponse).data
            const showFollowsYouBadge =
              connectedProfile?.getFollowerByAddress?.(address) !== undefined
            const connectedAddressFollowing: FollowingResponse | undefined =
              connectedProfile?.getFollowingByAddress?.(address)
            const followingStatus: FollowingStatus | undefined =
              connectedProfile?.getFollowState(address) || 'none'

            return title === 'followers'
              ? FollowerRow(
                  followerOrFollowing as FollowerResponse,
                  index,
                  followingStatus,
                  showFollowsYouBadge
                )
              : FollowingRow(
                  followerOrFollowing as FollowingResponse,
                  index,
                  followingStatus,
                  showFollowsYouBadge
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
  followingStatus: FollowingStatus,
  showFollowsYouBadge: boolean
) {
  return (
    <TableRow
      tableType={'followers'}
      tags={followerResponse.tags}
      status={followingStatus}
      key={`${followerResponse.address}-${index}`}
      name={followerResponse.ens.name || followerResponse.address}
      address={followerResponse.address}
      showFollowsYouBadge={showFollowsYouBadge}
    />
  )
}

function FollowingRow(
  followingResponse: FollowingResponse,
  index: number,
  followingStatus: FollowingStatus,
  showFollowsYouBadge: boolean
) {
  return (
    <TableRow
      tableType={'following'}
      tags={followingResponse.tags}
      status={followingStatus}
      key={`${followingResponse.data}-${index}`}
      name={followingResponse.ens?.name || followingResponse.data}
      address={followingResponse.data}
      showFollowsYouBadge={showFollowsYouBadge}
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
  showFollowsYouBadge
}: {
  tableType?: 'following' | 'followers'
  address: Address
  name: string

  avatar?: string
  status: 'follows' | 'blocks' | 'mutes' | 'none'
  tags: Array<string>
  showFollowsYouBadge: boolean
}) {
  const { hasListOpAddRecord, hasListOpRemoveRecord } = useCart()

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
            {tableType === 'following' && status === 'follows' && showFollowsYouBadge && (
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
          {status === 'follows' && (
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
            status === 'follows'
              ? hasListOpRemoveRecord(address)
                ? 'Pending_Unfollow'
                : 'Following'
              : status === 'blocks'
                ? 'Unblock'
                : status === 'mutes'
                  ? 'Unmute'
                  : hasListOpAddRecord(address)
                    ? 'Pending_Following'
                    : 'Follow'
          }
        />
      </Table.Cell>
    </Table.Row>
  )
}
