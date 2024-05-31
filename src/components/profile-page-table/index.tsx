'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FollowList } from '#/components/follow-list'
// import { Searchbar } from '#/components/searchbar.tsx'
import type { ProfileResponse } from '#/api/requests'
import TableHeader from './components/table-headers'
import { usePathname } from 'next/navigation'

/**
 * TODO: paginate
 */
export function UserProfilePageTable({
  profile,
  title,
  customClass
}: {
  profile: ProfileResponse
  title: 'following' | 'followers'
  customClass?: string
}) {
  const [search, setSearch] = useState<string>('')
  const [showTags, setShowTags] = useState(false)

  const pathname = usePathname()
  const { t } = useTranslation('profile')
  const { followers, following } = profile

  const filteredFollowers = followers?.filter(follower =>
    follower?.ens.name?.toLowerCase().replaceAll('.eth', '').includes(search.toLowerCase())
  )
  const filteredFollowing = following?.filter(following =>
    following?.data?.toLowerCase().includes(search.toLowerCase())
  )

  const chosenResponses = title === 'following' ? filteredFollowing : filteredFollowers
  const showFollowsYouBadges = !pathname.includes('profile') || title === 'following'

  const profiles =
    chosenResponses?.map(res => ({
      ens: res.ens,
      tags: res.tags,
      // @ts-ignore
      address: title === 'following' ? res.data : res.address
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
          {title === 'followers' && <span className='text-lg'>{t('followers empty')}</span>}
          {title === 'following' && (
            <div className='flex flex-col items-center'>
              <span className='text-xl text-darkGrey italic mb-4'>
                {t('following empty first')}
              </span>
              <span className='text-base text-darkGrey italic w-3/4 max-w-96'>
                {t('following empty second')}
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
