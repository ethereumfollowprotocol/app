'use client'

import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import TableRow from './row.tsx'
import LoadingRow from './loading-row.tsx'
import useLeaderboard from '../hooks/useLeaderboard.ts'
import type { LeaderboardItem } from '#/types/requests.ts'
import type { LeaderboardFilter } from '#/types/common.ts'
import LoadingCell from '#/components/loaders/loading-cell.tsx'
import { formatNumberLeaderboard } from '#/utils/format/format-number.ts'
import { LEADERBOARD_CHUNK_SIZE, LEADERBOARD_FETCH_LIMIT_PARAM } from '#/lib/constants/index.ts'
import TableHeaders from './table-headers.tsx'
import Recommendations from '#/components/recommendations.tsx'
import { cn } from '#/lib/utilities.ts'
import { useIsClient } from '@uidotdev/usehooks'
import { useEffect } from 'react'
import { useState } from 'react'
import useStickyScroll from '#/components/home/hooks/use-sticky-scroll.ts'

const LeaderboardStatNames = ['addresses', 'lists', 'list ops', 'unique users']

let lastScrollTop = 0

const LeaderboardTable = () => {
  const router = useRouter()
  const {
    page,
    chunk,
    filter,
    search,
    setPage,
    setChunk,
    setFilter,
    leaderboard,
    resetSearch,
    loadChunkRef,
    currentSearch,
    leaderboardStats,
    handleSearchEvent,
    isLeaderboardLoading,
    fetchNextLeaderboard,
    fetchPreviousLeaderboard,
    isLeaderboardStatsLoading,
    isFetchingNextLeaderboard,
    isFetchingPreviousLeaderboard,
  } = useLeaderboard()
  const { t } = useTranslation()

  const onSelectFilter = (newFilter: LeaderboardFilter) => {
    setFilter(newFilter)
    setPage(1)

    const params = new URLSearchParams()
    params.set('filter', newFilter)
    if (search) params.set('query', search)
    router.push(`/leaderboard?${params.toString()}`, {
      scroll: false,
    })
  }

  const isLoading = isLeaderboardLoading || isFetchingNextLeaderboard || isFetchingPreviousLeaderboard

  const selectedRank = {
    followers: (entry: LeaderboardItem) => entry.followers_rank,
    following: (entry: LeaderboardItem) => entry.following_rank,
    mutuals: (entry: LeaderboardItem) => entry.mutuals_rank,
    top8: (entry: LeaderboardItem) => entry.top8_rank,
    blocked: (entry: LeaderboardItem) => entry.blocks_rank,
  }[filter]

  const { StickyScrollRef: SidebarRef, onScroll: onScrollLeaderboard } = useStickyScroll(0, 16)

  useEffect(() => {
    const leaderboardPage = document.getElementById('leaderboard-page')

    if (leaderboardPage) {
      leaderboardPage.addEventListener('scroll', (e) => onScrollLeaderboard(e.target as HTMLDivElement), {
        passive: false,
      })
    }
  }, [])

  const isClient = useIsClient()
  const [displayHeaders, setDisplayHeaders] = useState(false)
  const isMobile = isClient && window.innerWidth <= 640

  useEffect(() => {
    const leaderboardPage = document.getElementById('leaderboard-page')

    if (leaderboardPage && isMobile) {
      leaderboardPage.addEventListener(
        'scroll',
        () => {
          const deltaY = leaderboardPage.scrollTop - lastScrollTop
          if (deltaY < 0) setDisplayHeaders(true)
          else setDisplayHeaders(false)
          lastScrollTop = leaderboardPage.scrollTop
        },
        { passive: false }
      )
    }
  }, [isMobile])

  return (
    <>
      <div className='mt-24 flex w-full max-w-[1300px] flex-col items-start gap-4 px-4 sm:mt-12 sm:px-1 xl:mt-24'>
        <h1 className='text-left text-3xl font-bold sm:text-5xl 2xl:text-6xl'>{t('leaderboard')}</h1>
        <p className='text-left text-lg font-medium'>{t('leaderboard description')}</p>
      </div>
      <div className='mt-4 flex w-full flex-wrap items-center justify-between gap-2 px-2 sm:gap-3 sm:px-0 xl:hidden'>
        {LeaderboardStatNames.map((name, i) => (
          <div
            key={`stat ${i}`}
            className='bg-neutral shadow-medium flex w-[48.5%] flex-col items-start justify-center rounded-sm p-3 pr-1 sm:p-4 md:w-[23.5%]'
          >
            {isLeaderboardStatsLoading || !leaderboardStats ? (
              <LoadingCell className='h-full min-h-8 w-24 rounded-sm' />
            ) : (
              <p className='text-xl font-bold'>{formatNumberLeaderboard(Number(Object.values(leaderboardStats)[i]))}</p>
            )}
            <p className='text-left font-medium text-[#888] capitalize lg:text-lg dark:text-[#aaa]'>{t(name)}</p>
          </div>
        ))}
      </div>
      <div className='mt-2 flex w-full max-w-[1300px] justify-center gap-5 xl:mt-4'>
        <div className='flex w-full flex-col lg:gap-4 xl:max-w-[800px]'>
          <div
            className='shadow-medium sticky z-20 transition-all duration-300'
            style={{ top: isMobile ? (displayHeaders ? '74px' : '0px') : '0px' }}
          >
            <TableHeaders
              filter={filter}
              onSelectFilter={onSelectFilter}
              page={page}
              setPage={setPage}
              currentSearch={currentSearch}
              handleSearchEvent={handleSearchEvent}
              setChunk={setChunk}
              fetchNextLeaderboard={fetchNextLeaderboard}
              fetchPreviousLeaderboard={fetchPreviousLeaderboard}
              isFetchingNextLeaderboard={isFetchingNextLeaderboard}
              isFetchingPreviousLeaderboard={isFetchingPreviousLeaderboard}
            />
          </div>
          <div className='bg-neutral shadow-medium relative mb-16 flex flex-col rounded-sm'>
            {leaderboard
              ?.slice(0, chunk * LEADERBOARD_CHUNK_SIZE)
              .map((entry: LeaderboardItem, index) => (
                <TableRow
                  key={entry.address}
                  address={entry.address}
                  name={entry.name}
                  avatar={entry.avatar}
                  header={entry.header}
                  rank={Number(selectedRank(entry))}
                  followers={Number(entry.followers) || 0}
                  following={Number(entry.following) || 0}
                  mutuals={Number(entry.mutuals) || 0}
                  top8={Number(entry.top8) || 0}
                  blocked={Number(entry.blocks) || 0}
                  firstStat={filter}
                />
              ))}
            {new Array(isLoading ? LEADERBOARD_CHUNK_SIZE : 0).fill(1).map((_, i) => (
              <LoadingRow key={i} />
            ))}
            {(chunk * LEADERBOARD_CHUNK_SIZE) / LEADERBOARD_FETCH_LIMIT_PARAM < 1 &&
              !isLoading &&
              !(isFetchingNextLeaderboard || isFetchingPreviousLeaderboard) && (
                <div ref={loadChunkRef} className='h-px w-full' />
              )}
            {!isLoading && leaderboard?.length === 0 && (
              <div className='flex h-40 flex-col items-center justify-center'>
                <p className='text-lg font-bold'>No results found</p>
                <p
                  className='cursor-pointer font-bold text-zinc-400 italic transition-colors hover:text-gray-700'
                  onClick={() => resetSearch()}
                >
                  Clear Search
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='hidden w-full max-w-[500px] flex-col gap-4 xl:block'>
          <div
            className='sticky top-0 flex w-full flex-col gap-4'
            ref={SidebarRef}
            style={{
              top: 'calc(100vh - 2000px)',
            }}
          >
            <div className='flex w-full flex-wrap items-center justify-between gap-3'>
              {LeaderboardStatNames.map((name, i) => (
                <div
                  key={`stat ${i}`}
                  className='bg-neutral shadow-medium flex w-[48.5%] flex-col items-start justify-center rounded-sm p-4'
                >
                  {isLeaderboardStatsLoading || !leaderboardStats ? (
                    <LoadingCell className='h-8 w-24 rounded-sm' />
                  ) : (
                    <p className='text-xl font-bold'>
                      {formatNumberLeaderboard(Number(Object.values(leaderboardStats)[i]))}
                    </p>
                  )}
                  <p className='text-lg font-medium text-[#888] capitalize dark:text-[#aaa]'>{t(name)}</p>
                </div>
              ))}
            </div>
            <Recommendations
              limit={10}
              endpoint='recommended'
              header={t('recommendations')}
              className={cn('bg-neutral shadow-medium h-fit w-full rounded-sm')}
            />
            <Recommendations
              limit={10}
              endpoint='discover'
              header={t('recent')}
              className={cn('bg-neutral shadow-medium h-fit w-full rounded-sm')}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default LeaderboardTable
