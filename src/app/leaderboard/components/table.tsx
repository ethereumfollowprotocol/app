'use client'

import { Fragment } from 'react'
import { FiSearch } from 'react-icons/fi'
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
      <p className="text-3xl sm:text-4xl font-bold">{t('leaderboard')}</p>
      <div className="mt-4 sm:mt-6 mb-4 sm:mb-6 lg:mb-0 flex items-center justify-center flex-wrap gap-4 sm:gap-8">
        {LeaderboardStatNames.map((name, i) => (
          <div
            key={`stat ${i}`}
            className="gradient-border flex flex-col rounded-2xl items-center justify-center h-28 w-[47.5%] sm:w-56"
          >
            {isLeaderboardStatsLoading || !leaderboardStats ? (
              <LoadingCell className="h-8 w-24 rounded-lg" />
            ) : (
              <p className="font-bold text-2xl md:text-2xl">
                {formatNumberLeaderboard(Number(Object.values(leaderboardStats)[i]))}
              </p>
            )}
            <p className="font-bold capitalize text-lg text-[#888] dark:text-[#aaa]">{t(name)}</p>
          </div>
        ))}
      </div>
      <div className="flex w-full gap-1.5 justify-center md:justify-end max-w-[1300px] text-sm mt-4 font-bold text-[#aaaaaa] md:text-[#CDCDCD] italic">
        {t('last updated')}
        <span>{isLeaderboardLoading ? <LoadingCell className="h-5 w-16 rounded-md" /> : timeStamp}</span>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-[1300px]">
        <div className="flex md:hidden">
          <Filters filter={filter} onSelectFilter={onSelectFilter} />
        </div>
        <div className="flex justify-between gap-2">
          <div className="relative w-full sm:w-[260px] 2xl:w-[300px]">
            <div className="rounded-xl w-full group overflow-hidden border-[3px] border-grey sm:text-sm focus:border-text/80 hover:border-text/80 focus-within:border-text/80 transition-colors">
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-3" aria-hidden="true">
                <FiSearch
                  className="mr-3 text-xl opacity-30 dark:opacity-60 group-hover:opacity-80 dark:group-hover:opacity-100 group-focus-within:opacity-80 dark:group-focus-within:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                spellCheck={false}
                placeholder={t('search placeholder')}
                value={currentSearch}
                onChange={handleSearchEvent}
                className="h-[44px] block w-full border-0 font-medium border-transparent pl-4 pr-10 sm:text-sm bg-neutral"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <Filters filter={filter} onSelectFilter={onSelectFilter} />
            </div>
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
          </div>
        </div>
        <div className="glass-card border-grey mt-1 border-[3px] rounded-xl flex flex-col gap-4 p-1 sm:px-4 sm:py-6 lg:px-8 relative">
          {leaderboard
            ?.slice(0, chunk * LEADERBOARD_CHUNK_SIZE)
            .map((entry: LeaderboardItem) => (
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
              <div ref={loadChunkRef} className="h-px w-full" />
            )}
          {!isLoading && leaderboard?.length === 0 && (
            <div className="flex justify-center flex-col items-center h-40">
              <p className="text-lg font-bold">No results found</p>
              <p
                className="transition-colors italic hover:text-gray-700 text-zinc-400 cursor-pointer font-bold"
                onClick={() => resetSearch()}
              >
                Clear Search
              </p>
            </div>
          )}
        </div>
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
      </div>
    </Fragment>
  )
}

export default LeaderboardTable
