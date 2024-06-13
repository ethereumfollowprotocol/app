'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useIntersectionObserver } from '@uidotdev/usehooks'

import { FETCH_LIMIT_PARAM } from '#/lib/constants'
import TableHeader from './components/table-headers'
import { FollowList } from '#/components/follow-list'
import type { FollowerResponse, FollowingResponse } from '#/api/requests'

/**
 * TODO: paginate
 */
export function UserProfilePageTable({
  displayedTitle,
  title,
  customClass,
  isLoading,
  isFetchingMore,
  followers,
  following,
  fetchMore,
  canEditTags,
  showTagsByDefault,
  isShowingBlocked
}: {
  displayedTitle?: string
  title: 'following' | 'followers'
  customClass?: string
  isLoading: boolean
  isFetchingMore: boolean
  followers: FollowerResponse[]
  following: FollowingResponse[]
  fetchMore: () => void
  canEditTags?: boolean
  showTagsByDefault?: boolean
  isShowingBlocked?: boolean
}) {
  const [search, setSearch] = useState<string>('')
  const [showTags, setShowTags] = useState(!!showTagsByDefault)

  const pathname = usePathname()
  const { t } = useTranslation('profile')
  const isProfile = pathname.includes('profile')

  const filteredFollowers = followers?.filter(follower =>
    follower?.ens.name?.toLowerCase().replaceAll('.eth', '').includes(search.toLowerCase())
  )
  const filteredFollowing = following?.filter(following =>
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
    if (entry?.isIntersecting) return
    if (
      !(isLoading || isFetchingMore) &&
      chosenResponses.length > 0 &&
      chosenResponses.length % FETCH_LIMIT_PARAM === 0
    )
      fetchMore()
  }, [entry?.isIntersecting])

  return (
    <div
      className={`glass-card flex flex-col gap-4 p-3 ${
        !(isLoading || isFetchingMore) && 'pb-0 sm:pb-0'
      } sm:p-4 w-full xl:w-[620px] border-2 rounded-2xl border-gray-200 ${customClass}`}
    >
      <TableHeader
        displayedTitle={displayedTitle}
        allTags={allTags}
        search={search}
        setSearch={(input: string) => setSearch(input)}
        showTags={showTags}
        setShowTags={(option: boolean) => setShowTags(option)}
        title={title}
        isShowingBlocked={isShowingBlocked}
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
        isLoading={isLoading || isFetchingMore}
        loadingRows={10}
        listClassName='gap-2 rounded-xl'
        listItemClassName='rounded-xl hover:bg-white/50 px-0 py-2 sm:p-2'
        profiles={profiles}
        showTags={showTags}
        showFollowsYouBadges={showFollowsYouBadges}
        canEditTags={canEditTags}
      />
      {!(isLoading || isFetchingMore) && <div ref={loadMoreRef} className='h-px w-full' />}
    </div>
  )
}
