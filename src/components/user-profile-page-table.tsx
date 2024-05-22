'use client'

import Image from 'next/image'
import { useState } from 'react'

import { useProfile } from '#/api/actions'
import { FollowList } from '#/components/follow-list'
// import { Searchbar } from '#/components/searchbar.tsx'
import { SelectWithFilter } from '#/components/select-with-filter.tsx'
import type { FollowerResponse, FollowingResponse } from '#/api/requests'

import ArrowUp from 'public/assets/icons/arrow-up.svg'
import ArrowDown from 'public/assets/icons/arrow-down.svg'
import SearchIcon from 'public/assets/icons/magnifying-glass.svg'

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
    <div className='glass-card flex flex-col gap-4 p-4 w-[49%] xl:w-[620px] border-2 rounded-2xl border-gray-200'>
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
        <div className='text-center font-semibold py-4'>
          {title === 'followers' && <span className='text-lg'>No followers</span>}
          {title === 'following' && (
            <div className='flex flex-col items-center'>
              <span className='text-xl text-darkGrey italic mb-1'>
                You don&apos;t follow anyone yet.
              </span>
              <span className='text-xl text-darkGrey italic mb-4'>Sad! 😢</span>
              <span className='text-base text-darkGrey italic w-3/4 max-w-96'>
                To get started, just browse and start following. Once you confirm them onchain,
                they&apos;ll show up here.
              </span>
            </div>
          )}
        </div>
      )}
      <FollowList
        listClassName='gap-2 rounded-xl'
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
    <div className='flex justify-between w-full'>
      <div className='flex gap-4 justify-between items-center w-full'>
        <div className='flex gap-3'>
          <p className='uppercase text-xl font-bold'>{title}</p>
          <Image src={SearchIcon} alt='Search' width={16} height={16} className='cursor-pointer' />
        </div>
        <div className='flex gap-4'>
          <div className='flex items-center gap-1'>
            {/* <Searchbar queryKey={searchQueryKey} placeholder='Search...' /> */}
            <p className='text-sm font-bold'>Tags</p>
            {showTags ? (
              <Image src={ArrowUp} alt='close tags' width={10} height={10} />
            ) : (
              <Image src={ArrowDown} alt='open tags' width={10} height={10} />
            )}
          </div>
          <div className='flex items-center gap-1'>
            {/* <Searchbar queryKey={searchQueryKey} placeholder='Search...' /> */}
            <p className='text-sm font-bold'>Follower count</p>
            {showTags ? (
              <Image src={ArrowUp} alt='close sort' width={10} height={10} />
            ) : (
              <Image src={ArrowDown} alt='open sort' width={10} height={10} />
            )}
          </div>
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
