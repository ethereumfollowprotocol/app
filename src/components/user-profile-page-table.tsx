'use client'

import { useState } from 'react'
import { useProfile } from '#/api/actions'
import { FollowList } from '#/components/follow-list'
import { Searchbar } from '#/components/searchbar.tsx'
import { SelectWithFilter } from '#/components/select-with-filter.tsx'
import type { FollowerResponse, FollowingResponse } from '#/api/requests'
import ArrowUp from 'public/assets/icons/arrow-up.svg'
import ArrowDown from 'public/assets/icons/arrow-down.svg'
import Image from 'next/image'

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
    <div>
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
        <div className='bg-white/70 rounded-xl py-4'>
          <p className='text-3xl my-4 text-center font-semibold'>
            {title === 'followers' && <span className='text-sm'>No followers</span>}
            {title === 'following' && (
              <div className='flex flex-col items-center'>
                <span className='text-m text-[#FF79C9] italic mb-1'>
                  You don&apos;t follow anyone yet.
                </span>
                <span className='text-m text-[#FF79C9] italic mb-4'>Sad! 😢</span>
                <span className='text-sm text-[#FF79C9] italic w-3/4 max-w-96'>
                  To get started, just browse and start following. Once you confirm them onchain,
                  they’ll show up here.
                </span>
              </div>
            )}
          </p>
        </div>
      )}
      <FollowList
        listClassName='gap-2 p-4 rounded-xl bg-white/50'
        listItemClassName='rounded-xl hover:bg-white/50 p-2'
        profiles={profiles}
        showFollowsYouBadges={showFollowsYouBadges}
        showTags={showTags}
      />
    </div>
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
    <div className='flex justify-between mb-2 w-full'>
      <div className='flex gap-4 items-center'>
        <p className='uppercase font-bold'>{title}</p>
        <div className='flex items-center gap-2'>
          <Searchbar queryKey={searchQueryKey} placeholder='Search...' />
          <p>Tags</p>
          {showTags ? (
            <Image src={ArrowUp} alt='close tags' width={16} height={16} />
          ) : (
            <Image src={ArrowDown} alt='open tags' width={16} height={16} />
          )}
        </div>
      </div>
      <SelectWithFilter
        dropdownOnly={true}
        defaultValue={selectQuery}
        filterQueryKey={selectQueryKey}
        items={filterOptions}
      />
    </div>
  )
}
