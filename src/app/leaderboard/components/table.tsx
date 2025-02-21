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
    <>
      <div className='mt-24 flex w-full max-w-[1300px] flex-col items-start gap-4 px-4 sm:mt-12 sm:px-1 xl:mt-24'>
        <h1 className='text-left text-3xl font-bold sm:text-6xl'>{t('leaderboard')}</h1>
        <p className='text-left text-lg font-medium'>{t('leaderboard description')}</p>
      </div>
      <div className='mt-4 flex w-full flex-wrap items-center justify-between gap-2 px-4 sm:gap-3 sm:px-0 xl:hidden'>
        {LeaderboardStatNames.map((name, i) => (
          <div
            key={`stat ${i}`}
            className='bg-neutral shadow-medium flex w-[48.5%] flex-col items-start justify-center rounded-sm p-4 pr-1 md:w-[23.5%]'
          >
            {isLeaderboardStatsLoading || !leaderboardStats ? (
              <LoadingCell className='h-8 w-24 rounded-sm' />
            ) : (
              <p className='text-xl font-bold'>{formatNumberLeaderboard(Number(Object.values(leaderboardStats)[i]))}</p>
            )}
            <p className='font-medium text-[#888] capitalize lg:text-lg dark:text-[#aaa]'>{t(name)}</p>
          </div>
        ))}
      </div>
      <div className='flex w-full max-w-[1300px] justify-center gap-6 xl:mt-4'>
        <div className='shadow-medium flex w-full flex-col xl:max-w-[800px]'>
          <div className='sticky top-16 z-10 sm:top-0'>
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
          <div className='bg-neutral relative flex flex-col rounded-b-sm'>
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
        <div className='hidden w-full max-w-[500px] flex-col gap-4 xl:flex'>
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
            limit={6}
            endpoint='discover'
            header={t('recent')}
            className={cn('bg-neutral shadow-medium h-fit w-full rounded-sm p-3 py-4 2xl:p-4')}
          />
          <Recommendations
            limit={6}
            endpoint='recommended'
            header={t('recommended')}
            className={cn('bg-neutral shadow-medium h-fit w-full rounded-sm p-3 py-4 2xl:p-4')}
          />
        </div>
      </div>
    </>
  )
}

export default LeaderboardTable
