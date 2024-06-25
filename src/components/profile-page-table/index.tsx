'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useIntersectionObserver } from '@uidotdev/usehooks'

import { FETCH_LIMIT_PARAM } from '#/lib/constants'
import TableHeader from './components/table-headers'
import { FollowList } from '#/components/follow-list'
import type { FollowerResponse, FollowingResponse } from '#/types/requests'

/**
 * TODO: paginate
 */
export function UserProfilePageTable({
  title,
  customClass,
  isLoading,
  isFetchingMore,
  isEndOfResults,
  followers,
  following,
  fetchMore,
  canEditTags
}: {
  title: 'following' | 'followers'
  customClass?: string
  isLoading: boolean
  isEndOfResults?: boolean
  isFetchingMore: boolean
  followers: FollowerResponse[]
  following: FollowingResponse[]
  fetchMore: () => void
  canEditTags?: boolean
}) {
  const [search, setSearch] = useState<string>('')
  const [showTags, setShowTags] = useState(false)

  const pathname = usePathname()
  const { t } = useTranslation('profile')
  const isProfile = pathname.includes('profile')

  const filteredFollowers =
    search.length === 0
      ? followers
      : followers?.filter(follower =>
          follower?.ens?.name?.toLowerCase().replaceAll('.eth', '').includes(search.toLowerCase())
        )
  const filteredFollowing =
    search.length === 0
      ? following
      : following?.filter(following =>
          following?.data?.toLowerCase().includes(search.toLowerCase())
        )

  const chosenResponses = title === 'following' ? filteredFollowing : filteredFollowers
  const showFollowsYouBadges = !isProfile || title === 'following'

  const profiles =
    chosenResponses?.map(res => ({
      ens: res.ens,
      tags: res.tags,
      // @ts-ignore
      address: title === 'following' ? res.data : res.address
    })) || []

  const allTags = chosenResponses?.flatMap(item => item.tags) || []

  const [loadMoreRef, entry] = useIntersectionObserver()

  useEffect(() => {
    if (!entry?.isIntersecting || isEndOfResults) return

    if (
      !(isLoading || isFetchingMore) &&
      chosenResponses.length > 0 &&
      chosenResponses.length % FETCH_LIMIT_PARAM === 0
    )
      fetchMore()
  }, [entry?.isIntersecting, chosenResponses])

  return (
    <div
      className={`glass-card flex flex-col gap-4 p-3 ${
        !(isLoading || isFetchingMore) && 'pb-0 sm:pb-0'
      } sm:p-4 w-full xl:w-[620px] border-2 rounded-2xl border-gray-200 ${customClass}`}
    >
      <TableHeader
        allTags={allTags}
        search={search}
        setSearch={(input: string) => setSearch(input)}
        showTags={showTags}
        setShowTags={(option: boolean) => setShowTags(option)}
        title={title}
      />
      {!isLoading && chosenResponses?.length === 0 && (
        <div className='text-center font-semibold py-4'>
          {title === 'followers' && (
            <span className='text-lg'>
              {t(isProfile ? 'followers myprofile empty' : 'followers empty')}
            </span>
          )}
          {title === 'following' && (
            <div className='flex flex-col items-center'>
              <span className='text-xl text-darkGrey italic mb-4'>
                {t(isProfile ? 'following myprofile empty first' : 'following empty first')}
              </span>
              {isProfile && (
                <span className='text-base text-darkGrey italic w-3/4 max-w-96'>
                  {t('following myprofile empty second')}
                </span>
              )}
            </div>
          )}
        </div>
      )}
      <FollowList
        isLoading={isLoading}
        isLoadingMore={isFetchingMore}
        loadingRows={10}
        listClassName='gap-2 rounded-xl'
        listItemClassName='rounded-xl hover:bg-white/50 px-0 py-2 sm:p-2'
        profiles={profiles}
        showTags={showTags}
        showFollowsYouBadges={showFollowsYouBadges}
        canEditTags={canEditTags}
      />
      <div ref={loadMoreRef} className='h-px w-full' />
    </div>
  )
}
