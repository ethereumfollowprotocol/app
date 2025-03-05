'use client'

import { useTranslation } from 'react-i18next'
import { useEffect, useState, forwardRef } from 'react'
import { useIntersectionObserver, useIsClient } from '@uidotdev/usehooks'

import { cn } from '#/lib/utilities'
import Recommendations from '../recommendations'
import ProfileList from '#/components/profile-list'
import TableHeader from './components/table-headers'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import type { ProfileTableTitleType } from '#/types/common'
import { FETCH_LIMIT_PARAM, SECOND } from '#/lib/constants'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import type { TagCountType, FollowSortType, FollowerResponse, FollowingResponse } from '#/types/requests'

let lastScrollTopUserPage = 0
export interface UserProfilePageTableProps {
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
  isTopEight?: boolean
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
      isTopEight,
      setSelectedTags,
      setSearchFilter,
      setActiveTab,
    },
    ref
  ) => {
    const [showTags, setShowTags] = useState(!!showTagsByDefault)
    const [search, setSearch] = useState<string>('')

    // Debounce search to prevent unnecessary re-fetches
    useEffect(() => {
      const userPage = document.getElementById('user-page')
      if (userPage && userPage.scrollTop > (window.innerWidth > 1024 ? 300 : 750)) {
        userPage.scrollTo({ top: window.innerWidth > 1024 ? 300 : 750, behavior: 'instant' })
      }

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
      results?.map((res) => ({
        tags: res.tags,
        address: res.address,
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
          <div className='flex h-full items-center justify-center font-bold'>{t('none')}</div>
        ) : (
          <div className='h-full text-center font-bold'>
            <div className='flex h-full flex-col items-center justify-center gap-4'>
              <p className='text-xl italic'>
                {t(isProfile ? 'following myprofile empty first' : 'following empty first')}
              </p>
              {isProfile && <p className='w-3/4 max-w-96 text-base italic'>{t('following myprofile empty second')}</p>}
            </div>
          </div>
        ),
      followers:
        search.length > 2 ? (
          <div className='flex h-full items-center justify-center font-bold'>{t('none')}</div>
        ) : (
          <p className='flex h-full min-h-12 items-center justify-center text-xl italic'>
            {t(isProfile ? 'followers myprofile empty' : 'followers empty')}
          </p>
        ),
      'Blocked/Muted By': <span className='text-lg'>{t('none')}</span>,
      'Blocked/Muted': <span className='text-lg'>{t('none')}</span>,
    }[title]

    const isClient = useIsClient()
    const [displayHeaders, setDisplayHeaders] = useState(false)
    const isMobile = isClient && window.innerWidth <= 640

    useEffect(() => {
      const userPage = document.getElementById('user-page')

      if (userPage && isMobile) {
        userPage.addEventListener(
          'scroll',
          () => {
            const deltaY = userPage.scrollTop - lastScrollTopUserPage
            if (deltaY <= 0) setDisplayHeaders(true)
            else setDisplayHeaders(false)
            lastScrollTopUserPage = userPage.scrollTop
          },
          { passive: false }
        )
      }
    }, [isMobile])

    return (
      <div
        className={cn('flex w-full flex-col rounded-sm', !(isLoading || isFetchingMore) && 'pb-0 sm:pb-0', customClass)}
      >
        <div
          className={cn('top-0 z-10 transition-all duration-300', isTopEight ? 'xl:sticky' : 'sticky')}
          ref={ref}
          style={{ top: isTopEight || !isMobile ? '-2px' : displayHeaders ? '74px' : '-2px' }}
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
            isTopEight={isTopEight}
            toggleSelectedTags={toggleSelectedTags}
            isShowingBlocked={isShowingBlocked}
          />
        </div>
        <div className={cn('flex flex-col pt-4')}>
          {profilesEmpty && (
            <div className='bg-neutral shadow-medium content-center rounded-sm p-8 text-center font-bold'>
              {noResults}
            </div>
          )}
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
            isTopEight={isTopEight}
            className={cn('bg-neutral shadow-medium rounded-sm', !isLoading && profiles.length === 0 && 'hidden')}
          />
          {!isLoading && <div ref={loadMoreRef} className='mb-4 h-px w-full' />}
          {isFollowingTable && isProfile && (lists?.lists?.length || 0) === 0 && (
            <Recommendations
              limit={40}
              endpoint='recommended'
              header={t('recommendations')}
              className='py-2'
              isTopEight={isTopEight}
            />
          )}
        </div>
      </div>
    )
  }
)

UserProfilePageTable.displayName = 'UserProfilePageTable'

export default UserProfilePageTable
