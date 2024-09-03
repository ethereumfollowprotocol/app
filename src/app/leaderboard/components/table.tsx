'use client'

import { FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import TableRow from './row.tsx'
import LoadingRow from './loading-row.tsx'
import PageSelector from './page-selector.tsx'
import useLeaderboard from '../hooks/useLeaderboard.ts'
import type { LeaderboardItem } from '#/types/requests.ts'
import type { LeaderboardFilter } from '#/types/common.ts'
import LoadingCell from '#/components/loaders/loading-cell.tsx'
import { formatNumberLeaderboard } from '#/utils/formatNumber.ts'
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
    resetSearch,
    currentSearch,
    leaderboardStats,
    handleSearchEvent,
    isLeaderboardLoading,
    fetchNextLeaderboard,
    fetchPreviousLeaderboard,
    isLeaderboardStatsLoading,
    isFetchingNextLeaderboard,
    isFetchingPreviousLeaderboard
  } = useLeaderboard()
  const { t } = useTranslation()

  const onSelectFilter = (newFilter: LeaderboardFilter) => {
    setFilter(newFilter)
    setPage(1)

    const params = new URLSearchParams()
    params.set('filter', newFilter)
    if (search) params.set('query', search)
    router.push(`/leaderboard?${params.toString()}`)
  }

  const isLoading =
    isLeaderboardLoading || isFetchingNextLeaderboard || isFetchingPreviousLeaderboard

  const selectedRank = {
    followers: (entry: LeaderboardItem) => entry.followers_rank,
    following: (entry: LeaderboardItem) => entry.following_rank,
    mutuals: (entry: LeaderboardItem) => entry.mutuals_rank,
    blocked: (entry: LeaderboardItem) => entry.blocks_rank
  }[filter]

  return (
    <>
      <div className='mt-4 sm:mt-6 mb-4 sm:mb-6 lg:mb-0 flex items-center justify-center flex-wrap gap-4 xs:gap-8'>
        <div className='gradient-border flex flex-col rounded-2xl items-center justify-center h-24 xs:h-[118px] w-full xs:w-64'>
          {isLeaderboardStatsLoading ? (
            <LoadingCell className='h-10 w-32 rounded-lg' />
          ) : (
            <p className='font-bold text-2xl md:text-3xl'>
              {formatNumberLeaderboard(Number(leaderboardStats?.address_count))}
            </p>
          )}
          <p className='font-bold capitalize text-lg text-[#888] dark:text-[#aaa]'>
            {t('addresses')}
          </p>
        </div>
        <div className='gradient-border flex flex-col rounded-2xl items-center justify-center h-24 xs:h-[118px] w-full xs:w-64'>
          {isLeaderboardStatsLoading ? (
            <LoadingCell className='h-10 w-32 rounded-lg' />
          ) : (
            <p className='font-bold text-2xl md:text-3xl'>
              {formatNumberLeaderboard(Number(leaderboardStats?.list_count))}
            </p>
          )}
          <p className='font-bold capitalize text-lg text-[#888] dark:text-[#aaa]'>{t('lists')}</p>
        </div>
        <div className='gradient-border flex flex-col rounded-2xl items-center justify-center h-24 xs:h-[118px] w-full xs:w-64'>
          {isLeaderboardStatsLoading ? (
            <LoadingCell className='h-10 w-32 rounded-lg' />
          ) : (
            <p className='font-bold text-2xl md:text-3xl'>
              {formatNumberLeaderboard(Number(leaderboardStats?.list_op_count))}
            </p>
          )}
          <p className='font-bold capitalize text-lg text-[#888] dark:text-[#aaa]'>
            {t('list ops')}
          </p>
        </div>
      </div>
      <div className='flex w-full gap-1.5 justify-center lg:justify-end max-w-[1200px] text-sm mt-4 font-bold text-[#aaaaaa] md:text-[#CDCDCD] italic'>
        {t('last updated')}
        <span>
          {isLeaderboardLoading ? <LoadingCell className='h-5 w-16 rounded-md' /> : timeStamp}
        </span>
      </div>
      <div className='flex flex-col gap-6 w-full max-w-[1200px]'>
        <div className='flex w-full flex-wrap justify-center lg:hidden items-center gap-4'>
          {leaderboardFilters.map((item, i) => (
            <div
              key={item}
              className={`p-2 font-bold w-[132px] px-4 capitalize cursor-pointer transition-all rounded-full ${
                filter === item
                  ? 'bg-zinc-100 dark:bg-[#777] shadow-inner'
                  : 'bg-zinc-300 dark:bg-[#555] hover:scale-110'
              }`}
              onClick={() => onSelectFilter(item)}
            >
              {`${t(item)} ${leaderboardFiltersEmojies[i]}`}
            </div>
          ))}
        </div>
        <div className='flex justify-between gap-4'>
          <div className='relative w-full sm:w-[260px] 2xl:w-[300px]'>
            <div className='rounded-xl w-full group glass-card overflow-hidden border-[3px] dark:border-white/50 border-zinc-300 sm:text-sm focus:border-[#666] hover:border-[#666] dark:focus:border-white/80 dark:hover:border-white/80 dark:focus-within:border-white/80 focus-within:border-darkGrey/80 transition-colors'>
              <div
                className='pointer-events-none absolute inset-y-0 right-0 flex items-center pl-3'
                aria-hidden='true'
              >
                <FiSearch
                  className='mr-3 text-xl opacity-30 dark:opacity-60 group-hover:opacity-80 dark:group-hover:opacity-100 group-focus-within:opacity-80 dark:group-focus-within:opacity-100 transition-opacity'
                  aria-hidden='true'
                />
              </div>
              <input
                type='text'
                spellCheck={false}
                placeholder={t('search placeholder')}
                value={currentSearch}
                onChange={handleSearchEvent}
                className='h-[44px] block w-full border-0 font-medium border-transparent pl-4 pr-10 sm:text-sm bg-white/70 dark:bg-darkGrey/70'
              />
            </div>
          </div>
          <div className='hidden lg:flex items-center gap-4'>
            {leaderboardFilters.map((item, i) => (
              <div
                key={item}
                className={`p-2 font-bold px-4 capitalize cursor-pointer rounded-full transition-all ${
                  filter === item
                    ? 'bg-zinc-100 dark:bg-[#777] shadow-inner'
                    : 'bg-zinc-300 dark:bg-[#555] hover:scale-110'
                }`}
                onClick={() => onSelectFilter(item)}
              >
                {`${t(item)} ${leaderboardFiltersEmojies[i]}`}
              </div>
            ))}
          </div>
          <PageSelector
            page={page}
            setPage={setPage}
            hasNextPage={true}
            scrollOnChange={false}
            isLoading={isFetchingNextLeaderboard || isFetchingPreviousLeaderboard}
            fetchNext={() => fetchNextLeaderboard()}
            fetchPrevious={() => fetchPreviousLeaderboard()}
          />
        </div>
        <div className='glass-card border-zinc-200 dark:border-zinc-500 border-[3px] rounded-xl flex flex-col gap-4 p-1 sm:px-4 sm:py-6 lg:px-8 relative'>
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
              blocked={Number(entry.blocks) || 0}
            />
          ))}
          {new Array(isLoading ? 100 : 0).fill(1).map((_, i) => (
            <LoadingRow key={i} />
          ))}
          {!isLoading && leaderboard?.length === 0 && (
            <div className='flex justify-center flex-col items-center h-40'>
              <p className='text-lg font-bold'>No results found</p>
              <p
                className='transition-colors italic hover:text-gray-700 text-zinc-400 cursor-pointer font-bold'
                onClick={() => resetSearch()}
              >
                Clear Search
              </p>
            </div>
          )}
        </div>
        <PageSelector
          page={page}
          setPage={setPage}
          hasNextPage={true}
          scrollOnChange={false}
          isLoading={isFetchingNextLeaderboard || isFetchingPreviousLeaderboard}
          fetchNext={() => fetchNextLeaderboard()}
          fetchPrevious={() => fetchPreviousLeaderboard()}
        />
      </div>
    </>
  )
}

export default LeaderboardTable
