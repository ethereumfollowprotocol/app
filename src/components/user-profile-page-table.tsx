'use client'

import { useProfile } from '#/api/actions'
import type { FollowerResponse, FollowingResponse } from '#/api/requests'
import { Searchbar } from '#/components/searchbar.tsx'
import { SelectWithFilter } from '#/components/select-with-filter.tsx'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Box, Flex, IconButton, Text } from '@radix-ui/themes'
import { FollowList } from '#/components/follow-list'

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
  const { followers, following } = useProfile(addressOrName)

  const searchQueryKey = `${title.toLowerCase()}-query`
  const selectQueryKey = `${title.toLowerCase()}-filter`

  const filteredFollowers = followers?.filter((follower: FollowerResponse) =>
    follower?.ens.name?.toLowerCase().replaceAll('.eth', '').includes(searchQuery.toLowerCase())
  )
  const filteredFollowing = following?.filter((following: FollowingResponse) =>
    following?.data?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const chosenResponses = title === 'following' ? filteredFollowing : filteredFollowers
  const showFollowsYouBadge = title === 'followers'
  const showTags = title === 'following'

  return (
    <Box>
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
      <FollowList
        profiles={chosenResponses || []}
        showFollowsYouBadge={showFollowsYouBadge}
        showTags={showTags}
        listClassName='gap-2 p-4 rounded-xl bg-white/50'
        listItemClassName='rounded-xl hover:bg-white/50 p-2'
      />
    </Box>
  )
}
