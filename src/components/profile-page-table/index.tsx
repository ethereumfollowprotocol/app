'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useIntersectionObserver } from '@uidotdev/usehooks'

import type {
  TagCountType,
  FollowSortType,
  FollowerResponse,
  FollowingResponse
} from '#/types/requests'
import Recommendations from '../recommendations'
import { FETCH_LIMIT_PARAM } from '#/lib/constants'
import TableHeader from './components/table-headers'
import { FollowList } from '#/components/follow-list'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import type { ProfileTableTitleType } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'

/**
 * TODO: paginate
 */
export function UserProfilePageTable({
  title,
  customClass,
  isLoading,
  isFetchingMore,
  results,
  isEndOfResults,
  fetchMore,
  canEditTags,
  allTags,
  tagsLoading,
  selectedTags,
  toggleSelectedTags,
  sort,
  setSort,
  showTagsByDefault,
  isShowingBlocked,
  setSelectedTags
}: {
  title: ProfileTableTitleType
  customClass?: string
  isLoading: boolean
  isEndOfResults?: boolean
  isFetchingMore: boolean
  results: FollowerResponse[] | FollowingResponse[]
  fetchMore: () => void
  canEditTags?: boolean
  allTags?: TagCountType[]
  tagsLoading?: boolean
  selectedTags?: string[]
  sort: FollowSortType
  setSort: (option: FollowSortType) => void
  toggleSelectedTags: (title: ProfileTableTitleType, tag: string) => void
  showTagsByDefault?: boolean
  isShowingBlocked?: boolean
  setSelectedTags: (tags: string[]) => void
}) {
  const [search, setSearch] = useState<string>('')
  const [showTags, setShowTags] = useState(!!showTagsByDefault)

  useEffect(() => {
    if (!showTags) setSelectedTags(isShowingBlocked ? ['All'] : [])
  }, [showTags])

  const { lists } = useEFPProfile()
  const isProfile = useIsEditView()
  const { t } = useTranslation()

  const showFollowsYouBadges = !isProfile || title === 'following'

  const profiles =
    results?.map(res => ({
      tags: res.tags,
      // @ts-ignore
      address: title === 'following' || title === 'Blocked/Muted' ? res.data : res.address
    })) || []

  const [loadMoreRef, entry] = useIntersectionObserver()

  useEffect(() => {
    if (!entry?.isIntersecting || isEndOfResults) return

    if (
      !(isLoading || isFetchingMore) &&
      results.length > 0 &&
      results.length % FETCH_LIMIT_PARAM === 0
    )
      fetchMore()
  }, [entry?.isIntersecting, results])

  const noResults = {
    following: (
      <div className='text-center font-semibold'>
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
      className={`glass-card flex flex-col w-full gap-4 p-3 ${
        !(isLoading || isFetchingMore) && 'pb-0 sm:pb-0'
      } sm:p-4 border-2 rounded-2xl border-gray-200 ${customClass}`}
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
      <div className='flex flex-col pb-4'>
        <FollowList
          isLoading={isLoading}
          isLoadingMore={isFetchingMore}
          loadingRows={FETCH_LIMIT_PARAM}
          listClassName='gap-2 rounded-xl w-full'
          listItemClassName='rounded-xl w-full hover:bg-white/50 px-0 py-2 sm:p-2'
          profiles={profiles}
          showTags={showTags}
          showFollowsYouBadges={showFollowsYouBadges}
          canEditTags={canEditTags}
          isFollowers={title === 'followers' || title === 'Blocked/Muted By'}
          isBlockedList={isShowingBlocked}
          isBlockedBy={title === 'Blocked/Muted By' && isProfile}
        />
        <div ref={loadMoreRef} className='h-px w-full' />
        {title === 'following' && isProfile && lists?.lists && lists.lists.length === 0 && (
          <Recommendations
            endpoint='recommended'
            description='Those are recommended profiles and not people you follow'
            className='p-2'
          />
        )}
      </div>
    </div>
  )
}
