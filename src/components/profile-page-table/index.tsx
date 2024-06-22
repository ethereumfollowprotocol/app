'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useIntersectionObserver } from '@uidotdev/usehooks'

import { FETCH_LIMIT_PARAM } from '#/lib/constants'
import TableHeader from './components/table-headers'
import { FollowList } from '#/components/follow-list'
import type { ProfileTableTitleType } from '#/types/common'
import type { FollowerResponse, FollowingResponse, FollowSortType } from '#/types/requests'

/**
 * TODO: paginate
 */
export function UserProfilePageTable({
  title,
  customClass,
  isLoading,
  isFetchingMore,
  results,
  fetchMore,
  canEditTags,
  allTags,
  tagsLoading,
  selectedTags,
  toggleSelectedTags,
  sort,
  setSort,
  showTagsByDefault,
  isShowingBlocked
}: {
  title: ProfileTableTitleType
  customClass?: string
  isLoading: boolean
  isFetchingMore: boolean
  results: FollowerResponse[] | FollowingResponse[]
  fetchMore: () => void
  canEditTags?: boolean
  allTags?: string[]
  tagsLoading?: boolean
  selectedTags?: string[]
  sort: FollowSortType
  setSort: (option: FollowSortType) => void
  toggleSelectedTags: (title: ProfileTableTitleType, tag: string) => void
  showTagsByDefault?: boolean
  isShowingBlocked?: boolean
}) {
  const [search, setSearch] = useState<string>('')
  const [showTags, setShowTags] = useState(!!showTagsByDefault)

  const pathname = usePathname()
  const { t } = useTranslation('profile')
  const isProfile = pathname.includes('profile')

  const showFollowsYouBadges = !isProfile || title === 'following'

  const profiles =
    results?.map(res => ({
      tags: res.tags,
      // @ts-ignore
      address: title === 'following' || title === 'Blocked/Muted' ? res.data : res.address
    })) || []

  const [loadMoreRef, entry] = useIntersectionObserver()

  useEffect(() => {
    if (!entry?.isIntersecting) return

    if (
      !(isLoading || isFetchingMore) &&
      results.length > 0 &&
      results.length % FETCH_LIMIT_PARAM === 0
    )
      fetchMore()
  }, [entry?.isIntersecting, results])

  const noResults = {
    following: (
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
    ),
    followers: (
      <span className='text-lg'>
        {t(isProfile ? 'followers myprofile empty' : 'followers empty')}
      </span>
    ),
    'Blocked/Muted By': (
      <span className='text-lg'>{t(isProfile ? 'blocked myprofile empty' : 'blocked empty')}</span>
    ),
    'Blocked/Muted': (
      <span className='text-lg'>
        {t(isProfile ? 'blocking myprofile empty' : 'blocking empty')}
      </span>
    )
  }[title]

  return (
    <div
      className={`glass-card flex flex-col gap-4 p-3 ${
        !(isLoading || isFetchingMore) && 'pb-0 sm:pb-0'
      } sm:p-4 w-full xl:w-[620px] border-2 rounded-2xl border-gray-200 ${customClass}`}
    >
      <TableHeader
        search={search}
        setSearch={(input: string) => setSearch(input)}
        showTags={showTags}
        setShowTags={(option: boolean) => setShowTags(option)}
        title={title}
        allTags={allTags}
        tagsLoading={tagsLoading}
        selectedTags={selectedTags}
        sort={sort}
        setSort={setSort}
        toggleSelectedTags={toggleSelectedTags}
        isShowingBlocked={isShowingBlocked}
      />
      {!isLoading && results?.length === 0 && (
        <div className='text-center font-semibold py-4'>{noResults}</div>
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
      <div ref={loadMoreRef} className='h-px w-full' />
    </div>
  )
}
