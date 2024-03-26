'use client'

import { useProfile } from '#/api/actions'
import type { FollowerResponse, FollowingResponse } from '#/api/requests'
import { Searchbar } from '#/components/searchbar.tsx'
import { SelectWithFilter } from '#/components/select-with-filter.tsx'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Box, Flex, IconButton, Text } from '@radix-ui/themes'
import { FollowList } from '#/components/follow-list'
import { useState } from 'react'

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
  const [showTags, setShowTags] = useState(false)
  const profile = useProfile(addressOrName)
  const { followers, following } = profile

  const searchQueryKey = `${title.toLowerCase()}-query`
  const selectQueryKey = `${title.toLowerCase()}-filter`

  const filteredFollowers = followers?.filter((follower: FollowerResponse) =>
    follower?.ens.name?.toLowerCase().replaceAll('.eth', '').includes(searchQuery.toLowerCase())
  )
  const filteredFollowing = following?.filter((following: FollowingResponse) =>
    following?.data?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const chosenResponses = title === 'following' ? filteredFollowing : filteredFollowers
  const filterOptions = ['follower count', 'latest first', 'earliest first', 'alphabetical']
  const showFollowsYouBadges = title === 'following'

  const profiles =
    chosenResponses?.map(res => ({
      address: res?.address,
      tags: res?.tags
    })) || []

  return (
    <Box>
      <PageHeader
        title={title}
        searchQueryKey={searchQueryKey}
        selectQuery={selectQuery}
        selectQueryKey={selectQueryKey}
        onToggleTags={() => setShowTags(prev => !prev)}
        showTags={showTags}
        filterOptions={filterOptions}
      />
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
        listClassName='gap-2 p-4 rounded-xl bg-white/50'
        listItemClassName='rounded-xl hover:bg-white/50 p-2'
        profiles={profiles}
        showFollowsYouBadges={showFollowsYouBadges}
        showTags={showTags}
      />
    </Box>
  )
}

interface PageHeaderProps {
  title: string
  selectQuery: string
  searchQueryKey: string
  selectQueryKey: string
  onToggleTags: () => void
  showTags: boolean
  filterOptions: string[]
}

function PageHeader({
  title,
  selectQuery,
  searchQueryKey,
  selectQueryKey,
  onToggleTags,
  showTags,
  filterOptions
}: PageHeaderProps) {
  return (
    <Flex mb='2' justify='between' className='w-full'>
      <Flex gap='4' align='center'>
        <Text weight='bold' className='uppercase' as='p'>
          {title}
        </Text>
        <Flex gap='2'>
          <Searchbar queryKey={searchQueryKey} placeholder='Search...' />
          <IconButton
            onClick={onToggleTags}
            className='text-black font-semibold text-sm flex items-center gap-1'
            radius='large'
            variant='ghost'
            my='auto'
            size='1'
          >
            <Text>Tags</Text>
            {showTags ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </IconButton>
        </Flex>
      </Flex>
      <SelectWithFilter
        dropdownOnly={true}
        defaultValue={selectQuery}
        filterQueryKey={selectQueryKey}
        items={filterOptions}
      />
    </Flex>
  )
}
