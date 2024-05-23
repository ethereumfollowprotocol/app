'use client'

import { useState } from 'react'
import { useProfile } from '#/api/actions'
import { FollowList } from '#/components/follow-list'
// import { Searchbar } from '#/components/searchbar.tsx'
import type { FollowerResponse, FollowingResponse } from '#/api/requests'
import TableHeader from './components/table-headers'

/**
 * TODO: paginate
 */
export function UserProfilePageTable({
  addressOrName,
  title,
  customClass
}: {
  addressOrName: string
  title: 'following' | 'followers'
  customClass?: string
}) {
  const [search, setSearch] = useState<string>('')
  const [showTags, setShowTags] = useState(false)

  const profile = useProfile(addressOrName)
  const { followers, following } = profile

  const filteredFollowers = followers?.filter((follower: FollowerResponse) =>
    follower?.ens.name?.toLowerCase().replaceAll('.eth', '').includes(search.toLowerCase())
  )
  const filteredFollowing = following?.filter((following: FollowingResponse) =>
    following?.data?.toLowerCase().includes(search.toLowerCase())
  )

  const chosenResponses = title === 'following' ? filteredFollowing : filteredFollowers
  const showFollowsYouBadges = title === 'following'

  const profiles =
    chosenResponses?.map(res => ({
      address: res?.address,
      tags: res?.tags
    })) || []

  return (
    <div
      className={`glass-card flex flex-col gap-4 p-4 md:w-[49%] xl:w-[620px] border-2 rounded-2xl border-gray-200 ${customClass}`}
    >
      <TableHeader
        search={search}
        setSearch={(input: string) => setSearch(input)}
        showTags={showTags}
        setShowTags={(option: boolean) => setShowTags(option)}
        title={title}
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
        showTags={showTags}
        showFollowsYouBadges={showFollowsYouBadges}
      />
    </div>
  )
}
