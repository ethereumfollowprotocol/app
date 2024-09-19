'use client'

import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from '@uidotdev/usehooks'

import type {
  TagCountType,
  FollowSortType,
  FollowerResponse,
  FollowingResponse
} from '#/types/requests'
import { cn } from '#/lib/utilities'
import Recommendations from '../recommendations'
import TableHeader from './components/table-headers'
import { FollowList } from '#/components/follow-list'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import type { ProfileTableTitleType } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { BLOCKED_MUTED_TABS, FETCH_LIMIT_PARAM } from '#/lib/constants'

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
  setSelectedTags,
  setSearchFilter
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
  setSearchFilter: (search: string) => void
}) {
  const [search, setSearch] = useState<string>('')
  const [showTags, setShowTags] = useState(!!showTagsByDefault)
  const searchTimer = useRef<NodeJS.Timeout | null>(null)

  const onChangeSearch = (input: string) => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }
    setSearch(input)

    if (input.length === 0) {
      setSearchFilter(input)
    } else {
      searchTimer.current = setTimeout(() => {
        setSearchFilter(input)
      }, 500)
    }
  }

  useEffect(() => {
    setSearchFilter(search)
  }, [])

  useEffect(() => {
    if (!showTags) setSelectedTags(isShowingBlocked ? ['All'] : [])
  }, [showTags])

  const { t } = useTranslation()
  const { lists } = useEFPProfile()
  const isProfile = useIsEditView()

  const showFollowsYouBadges = !isProfile || title === 'following'

  const profiles =
    results?.map(res => ({
      tags: res.tags,
      address: res.address
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
    following:
      search.length > 2 ? (
        <div className='justify-center min-h-12 flex items-center font-bold'>{t('none')}</div>
      ) : (
        <div className='text-center min-h-12  font-bold'>
          {title === 'followers' && (
            <p className='text-lg'>
              {t(isProfile ? 'followers myprofile empty' : 'followers empty')}
            </p>
          )}
          {title === 'following' && (
            <div className='flex flex-col justify-center min-h-12 gap-4 items-center'>
              <p className='text-xl italic'>
                {t(isProfile ? 'following myprofile empty first' : 'following empty first')}
              </p>
              {isProfile && (
                <p className='text-base italic w-3/4 max-w-96'>
                  {t('following myprofile empty second')}
                </p>
              )}
            </div>
          )}
        </div>
      ),
    followers:
      search.length > 2 ? (
        <div className='justify-center min-h-12 flex items-center font-bold'>{t('none')}</div>
      ) : (
        <p className='text-xl italic flex justify-center items-center min-h-12'>
          {t(isProfile ? 'followers myprofile empty' : 'followers empty')}
        </p>
      ),
    'Blocked/Muted By': <span className='text-lg'>{t('none')}</span>,
    'Blocked/Muted': <span className='text-lg'>{t('none')}</span>
  }[title]

  return (
    <div
      className={cn(
        'flex flex-col w-full gap-4 py-2 px-0 sm:p-4 border-[3px] rounded-2xl border-zinc-200 dark:border-zinc-500',
        !(isLoading || isFetchingMore) && 'pb-0 sm:pb-0',
        BLOCKED_MUTED_TABS.includes(title) ? 'bg-white/70 dark:bg-darkGrey/70' : 'glass-card',
        customClass
      )}
    >
      <TableHeader
        search={search}
        setSearch={(input: string) => onChangeSearch(input)}
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
        <div className='text-center font-bold py-4 px-2'>{noResults}</div>
      )}
      <div className='flex flex-col pb-4'>
        <FollowList
          isLoading={isLoading}
          isLoadingMore={isFetchingMore}
          loadingRows={FETCH_LIMIT_PARAM}
          listClassName='gap-2 rounded-xl w-full px-3 sm:px-0'
          listItemClassName={`rounded-xl w-full px-0 py-2 sm:p-2 ${
            title === 'Blocked/Muted' || title === 'Blocked/Muted By' ? 'hover:bg-[#f8f8f8]' : ''
          }`}
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
            limit={40}
            endpoint='recommended'
            header={t('recommendations')}
            className='py-2'
          />
        )}
      </div>
    </div>
  )
}
