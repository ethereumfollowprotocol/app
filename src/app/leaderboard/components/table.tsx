'use client'
import { useRouter } from 'next/navigation'

import TableRow from './row.tsx'
import LoadingRow from './loading-row.tsx'
import PageSelector from './page-selector.tsx'
import LoadingCell from '#/components/loading-cell.tsx'
import useLeaderboard from '../hooks/useLeaderboard.ts'
import type { LeaderboardItem } from '#/types/requests.ts'
import type { LeaderboardFilter } from '#/types/common.ts'
import { leaderboardFilters, leaderboardFiltersEmojies } from '#/lib/constants/index.ts'

const LeaderboardTable = () => {
  const router = useRouter()
  const {
    page,
    filter,
    search,
    setPage,
    setFilter,
    timeStamp,
    leaderboard,
    currentSearch,
    leaderboardCount,
    handleSearchEvent,
    isLeaderboardLoading,
    fetchNextLeaderboard,
    fetchPreviousLeaderboard,
    isLeaderboardCountLoading,
    isFetchingNextLeaderboard,
    isFetchingPreviousLeaderboard
  } = useLeaderboard()

  const onSelectFilter = (newFilter: LeaderboardFilter) => {
    setFilter(newFilter)
    setPage(1)

    const params = new URLSearchParams()
    params.set('filter', newFilter)
    if (search) params.set('query', search)
    router.push(`/leaderboard?${params.toString()}`)
  }

  const selectedRank = {
    followers: (entry: LeaderboardItem) => entry.followers_rank,
    following: (entry: LeaderboardItem) => entry.following_rank,
    mutuals: (entry: LeaderboardItem) => entry.mutuals_rank,
    blocked: (entry: LeaderboardItem) => entry.blocks_rank
  }[filter]

  return (
    <>
      <div className='mb-10'>
        {isLeaderboardCountLoading ? (
          <LoadingCell className='h-7 w-40 rounded-lg' />
        ) : (
          <p className='h-2 font-semibold text-sm sm:text-lg'>{`${leaderboardCount?.leaderboardCount} accounts`}</p>
        )}
      </div>
      <div className='flex w-full justify-end text-sm mb-2 font-semibold text-[#CDCDCD] italic'>
        Last updated {timeStamp}
      </div>
      <div className='flex flex-col gap-6 w-full max-w-[1200px]'>
        <div className='flex w-full flex-wrap justify-center lg:hidden items-center gap-4'>
          {leaderboardFilters.map((item, i) => (
            <div
              key={item}
              className={`p-2 font-semibold w-[132px] px-4 capitalize cursor-pointer rounded-full ${
                filter === item ? 'bg-gray-100 shadow-inner' : 'bg-gray-300'
              }`}
              onClick={() => onSelectFilter(item)}
            >
              {`${item} ${leaderboardFiltersEmojies[i]}`}
            </div>
          ))}
        </div>
        <div className='flex justify-between gap-4'>
          <div className='w-full sm:max-w-sm sm:w-52'>
            <input
              className='h-9 rounded-lg border-2 w-full border-gray-200 px-2'
              spellCheck={false}
              placeholder='Search ENS Name'
              value={currentSearch}
              onChange={handleSearchEvent}
            />
          </div>
          <div className='hidden lg:flex items-center gap-4'>
            {leaderboardFilters.map((item, i) => (
              <div
                key={item}
                className={`p-2 font-semibold px-4 capitalize cursor-pointer rounded-full ${
                  filter === item ? 'bg-gray-100 shadow-inner' : 'bg-gray-300'
                }`}
                onClick={() => onSelectFilter(item)}
              >
                {`${item} ${leaderboardFiltersEmojies[i]}`}
              </div>
            ))}
          </div>
          <PageSelector
            page={page}
            setPage={setPage}
            hasNextPage={leaderboard?.length === 100}
            fetchNext={() => fetchNextLeaderboard()}
            fetchPrevious={() => fetchPreviousLeaderboard()}
          />
        </div>
        <div className='glass-card border-gray-200 border-2 rounded-xl flex flex-col gap-4 p-3 sm:px-8 sm:py-6 lg:px-12 lg:py-10 relative'>
          {leaderboard?.map((entry: LeaderboardItem, index) => (
            <TableRow
              key={entry.address}
              address={entry.address}
              name={entry.name}
              avatar={entry.avatar}
              rank={Number(selectedRank(entry))}
              followers={Number(entry.followers) || 0}
              following={Number(entry.following) || 0}
              mutuals={Number(entry.mutuals) || 0}
              blockedMuted={Number(entry.blocks) || 0}
            />
          ))}
          {new Array(
            isLeaderboardLoading || isFetchingNextLeaderboard || isFetchingPreviousLeaderboard
              ? 100
              : 0
          )
            .fill(1)
            .map((_, i) => (
              <LoadingRow key={i} />
            ))}
        </div>
        <PageSelector
          page={page}
          setPage={setPage}
          hasNextPage={leaderboard?.length === 100}
          fetchNext={() => fetchNextLeaderboard()}
          fetchPrevious={() => fetchPreviousLeaderboard()}
        />
      </div>
    </>
  )
}

export default LeaderboardTable
