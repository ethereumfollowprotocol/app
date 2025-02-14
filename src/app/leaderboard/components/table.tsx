'use client'

import { Fragment, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { LEADERBOARD_CHUNK_SIZE, LEADERBOARD_FETCH_LIMIT_PARAM } from '#/lib/constants/index.ts'
import TableRow from './row.tsx'
import Filters from './filters.tsx'
import LoadingRow from './loading-row.tsx'
import PageSelector from '../../../components/page-selector.tsx'
import useLeaderboard from '../hooks/useLeaderboard.ts'
import type { LeaderboardItem } from '#/types/requests.ts'
import type { LeaderboardFilter } from '#/types/common.ts'
import LoadingCell from '#/components/loaders/loading-cell.tsx'
import { formatNumberLeaderboard } from '#/utils/format/format-number.ts'
import MagnifyingGlass from 'public/assets/icons/ui/magnifying-glass.svg'
const LeaderboardStatNames = ['addresses', 'lists', 'list ops', 'unique users']

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
    timeStamp,
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

  return (
    <Fragment>
      <p className='text-3xl font-bold sm:text-4xl'>{t('leaderboard')}</p>
      <div className='mt-4 mb-4 flex flex-wrap items-center justify-center gap-4 sm:mt-6 sm:mb-6 sm:gap-8 lg:mb-0'>
        {LeaderboardStatNames.map((name, i) => (
          <div
            key={`stat ${i}`}
            className='gradient-border flex h-28 w-[47.5%] flex-col items-center justify-center rounded-sm sm:w-56'
          >
            {isLeaderboardStatsLoading || !leaderboardStats ? (
              <LoadingCell className='h-8 w-24 rounded-sm' />
            ) : (
              <p className='text-2xl font-bold md:text-2xl'>
                {formatNumberLeaderboard(Number(Object.values(leaderboardStats)[i]))}
              </p>
            )}
            <p className='text-lg font-bold text-[#888] capitalize dark:text-[#aaa]'>{t(name)}</p>
          </div>
        ))}
      </div>
      <div className='mt-4 flex w-full max-w-[1300px] justify-center gap-1.5 text-sm font-bold text-[#aaaaaa] italic md:justify-end md:text-[#CDCDCD]'>
        {t('last updated')}
        <span>{isLeaderboardLoading ? <LoadingCell className='h-5 w-16 rounded-sm' /> : timeStamp}</span>
      </div>
      <div className='flex w-full max-w-[1300px] flex-col gap-2'>
        <div className='flex md:hidden'>
          <Filters filter={filter} onSelectFilter={onSelectFilter} />
        </div>
        <div className='flex justify-between gap-2'>
          <div className='relative w-full sm:w-[260px] 2xl:w-[300px]'>
            <div className='group border-grey focus:border-text/80 hover:border-text/80 focus-within:border-text/80 w-full overflow-hidden rounded-sm border-[3px] transition-colors sm:text-sm'>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pl-3' aria-hidden='true'>
                <MagnifyingGlass
                  className='mr-3 text-xl opacity-30 transition-opacity group-focus-within:opacity-80 group-hover:opacity-80 dark:opacity-60 dark:group-focus-within:opacity-100 dark:group-hover:opacity-100'
                  aria-hidden='true'
                />
              </div>
              <input
                type='text'
                spellCheck={false}
                placeholder={t('search placeholder')}
                value={currentSearch}
                onChange={handleSearchEvent}
                className='bg-neutral block h-[44px] w-full border-0 border-transparent pr-10 pl-4 font-medium sm:text-sm'
              />
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='hidden md:flex'>
              <Filters filter={filter} onSelectFilter={onSelectFilter} />
            </div>
            <Suspense>
              <PageSelector
                page={page}
                setPage={setPage}
                hasNextPage={true}
                scrollUp={true}
                isLoading={isFetchingNextLeaderboard || isFetchingPreviousLeaderboard}
                fetchNext={() => {
                  setChunk(1)
                  fetchNextLeaderboard()
                }}
                fetchPrevious={() => {
                  setChunk(1)
                  fetchPreviousLeaderboard()
                }}
              />
            </Suspense>
          </div>
        </div>
        <div className='glass-card border-grey relative mt-1 flex flex-col gap-4 rounded-sm border-[3px] p-1 sm:px-4 sm:py-6 lg:px-8'>
          {leaderboard
            ?.slice(0, chunk * LEADERBOARD_CHUNK_SIZE)
            .map((entry: LeaderboardItem, index) => (
              <TableRow
                key={entry.address}
                address={entry.address}
                name={entry.name}
                avatar={entry.avatar}
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
            <LoadingRow key={i} staticStats={false} />
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
        <Suspense>
          <PageSelector
            page={page}
            scrollUp={true}
            setPage={setPage}
            hasNextPage={true}
            isLoading={isFetchingNextLeaderboard || isFetchingPreviousLeaderboard}
            fetchNext={() => {
              setChunk(1)
              fetchNextLeaderboard()
            }}
            fetchPrevious={() => {
              setChunk(1)
              fetchPreviousLeaderboard()
            }}
          />
        </Suspense>
      </div>
    </Fragment>
  )
}

export default LeaderboardTable
