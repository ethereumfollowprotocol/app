'use client'

import { useTranslation } from 'react-i18next'
import { useEffect, useState, forwardRef } from 'react'
import { useIntersectionObserver } from '@uidotdev/usehooks'

import type {
  TagCountType,
  FollowSortType,
  FollowerResponse,
  FollowingResponse
} from '#/types/requests'
import { cn } from '#/lib/utilities'
import Recommendations from '../recommendations'
import ProfileList from '#/components/profile-list'
import TableHeader from './components/table-headers'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import type { ProfileTableTitleType } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { BLOCKED_MUTED_TABS, FETCH_LIMIT_PARAM, SECOND } from '#/lib/constants'

interface UserProfilePageTableProps {
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
  setActiveTab?: (tab: ProfileTableTitleType) => void
}

const UserProfilePageTable = forwardRef<HTMLDivElement, UserProfilePageTableProps>(
  (
    {
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
      setSearchFilter,
      setActiveTab
    },
    ref
  ) => {
    const [showTags, setShowTags] = useState(!!showTagsByDefault)
    const [search, setSearch] = useState<string>('')

    // Debounce search to prevent unnecessary re-fetches
    useEffect(() => {
      const searchTimeout = setTimeout(() => setSearchFilter(search), 0.5 * SECOND)
      return () => clearTimeout(searchTimeout)
    }, [search])

    // Reset search when switching tabs
    useEffect(() => {
      setSearch('')
      setSearchFilter('')
    }, [title])

    // Display all tags by default if the user is showing the blocked/muted tab
    useEffect(() => {
      if (!showTags) setSelectedTags(isShowingBlocked ? ['All'] : [])
    }, [showTags])

    const { t } = useTranslation()
    const { lists } = useEFPProfile()
    const isProfile = useIsEditView()

    const isFollowingTable = title === 'following'
    const showFollowsYouBadges = !isProfile || isFollowingTable

    const profiles =
      results?.map(res => ({
        tags: res.tags,
        address: res.address
      })) || []

    const [loadMoreRef, entry] = useIntersectionObserver()
    useEffect(() => {
      if (!entry?.isIntersecting || isEndOfResults) return
      if (isLoading || isFetchingMore) return

      if (results.length > 0 && results.length % FETCH_LIMIT_PARAM === 0) fetchMore()
    }, [entry?.isIntersecting, results])
    const profilesEmpty = !isLoading && results.length === 0

    const noResults = {
      following:
        search.length > 2 ? (
          <div className='justify-center h-full flex items-center font-bold'>{t('none')}</div>
        ) : (
          <div className='text-center h-full font-bold'>
            <div className='flex flex-col justify-center h-full gap-4 items-center'>
              <p className='text-xl italic'>
                {t(isProfile ? 'following myprofile empty first' : 'following empty first')}
              </p>
              {isProfile && (
                <p className='text-base italic w-3/4 max-w-96'>
                  {t('following myprofile empty second')}
                </p>
              )}
            </div>
          </div>
        ),
      followers:
        search.length > 2 ? (
          <div className='justify-center h-full flex items-center font-bold'>{t('none')}</div>
        ) : (
          <p className='text-xl italic flex h-full justify-center items-center min-h-12'>
            {t(isProfile ? 'followers myprofile empty' : 'followers empty')}
          </p>
        ),
      'Blocked/Muted By': <span className='text-lg'>{t('none')}</span>,
      'Blocked/Muted': <span className='text-lg'>{t('none')}</span>
    }[title]

    return (
      <div
        className={cn(
          'flex flex-col w-full gap-4 py-4 px-0 sm:px-4 border-[3px] rounded-2xl border-grey',
          !(isLoading || isFetchingMore) && 'pb-0 sm:pb-0',
          BLOCKED_MUTED_TABS.includes(title) ? 'bg-neutral/70' : 'glass-card',
          customClass
        )}
      >
        <TableHeader
          setActiveTab={setActiveTab}
          search={search}
          setSearch={setSearch}
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
        {profilesEmpty && (
          <div className='text-center font-bold h-[152px] py-4 content-center px-2'>
            {noResults}
          </div>
        )}
        <div
          ref={ref}
          className={cn(
            'flex flex-col px-3 sm:px-0',
            !BLOCKED_MUTED_TABS.includes(title) && 'xl:overflow-y-scroll',
            !(BLOCKED_MUTED_TABS.includes(title) || profilesEmpty) &&
              (showTags ? 'profile-page-table-tags' : 'profile-page-table')
          )}
        >
          <ProfileList
            isLoading={isLoading}
            isLoadingMore={isFetchingMore}
            loadingRows={FETCH_LIMIT_PARAM}
            profiles={profiles}
            showTags={showTags}
            showFollowsYouBadges={showFollowsYouBadges}
            canEditTags={canEditTags}
            isBlockedList={isShowingBlocked}
            isBlockedBy={title === 'Blocked/Muted By' && isProfile}
          />
          <div ref={loadMoreRef} className='h-px w-full mb-4' />
          {isFollowingTable && isProfile && (lists?.lists?.length || 0) === 0 && (
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
)

export default UserProfilePageTable
