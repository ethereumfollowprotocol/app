'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import TableRow from './row.tsx'
import LoadingRow from './loading-row.tsx'
import PageSelector from './page-selector.tsx'
import { formatNumber } from '#/utils/formatNumber.ts'
import LoadingCell from '#/components/loading-cell.tsx'
import useLeaderboard from '../hooks/useLeaderboard.ts'
import type { LeaderboardItem } from '#/types/requests.ts'
import type { LeaderboardFilter } from '#/types/common.ts'
import MagnifyingGlass from 'public/assets/icons/magnifying-glass-dark.svg'
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
    leaderboardCount,
    handleSearchEvent,
    isLeaderboardLoading,
    fetchNextLeaderboard,
    fetchPreviousLeaderboard,
    isLeaderboardCountLoading,
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
      <div className='mb-10'>
        {isLeaderboardCountLoading ? (
          <LoadingCell className='h-7 w-40 rounded-lg' />
        ) : (
          <p className='h-2 font-semibold text-sm sm:text-lg'>{`${formatNumber(
            Number(leaderboardCount?.leaderboardCount)
          )} ${t('accounts')}`}</p>
        )}
      </div>
      <div className='flex w-full justify-center lg:justify-end max-w-[1200px] text-sm mb-2 font-semibold text-[#aaaaaa] md:text-[#CDCDCD] italic'>
        {t('last updated')}&nbsp;
        <span>
          {isLeaderboardLoading ? <LoadingCell className='h-5 w-16 rounded-md' /> : timeStamp}
        </span>
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
              {`${t(item)} ${leaderboardFiltersEmojies[i]}`}
            </div>
          ))}
        </div>
        <div className='flex justify-between gap-4'>
          <div className='relative w-full sm:w-[260px] 2xl:w-[300px]'>
            <div className='rounded-xl w-full group glass-card border-2 border-gray-200 hover:border-darkGrey focus-within:border-darkGrey transition-colors'>
              <div
                className='pointer-events-none absolute inset-y-0 right-0 flex items-center pl-3'
                aria-hidden='true'
              >
                <Image
                  src={MagnifyingGlass}
                  alt='Search'
                  className='mr-3 h-4 w-4 opacity-30 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity'
                  aria-hidden='true'
                />
              </div>
              <input
                type='text'
                spellCheck={false}
                placeholder={t('search placeholder')}
                value={currentSearch}
                onChange={handleSearchEvent}
                className='h-[44px] block w-full rounded-lg border-0 font-medium border-transparent pl-4 pr-10 sm:text-sm'
              />
            </div>
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
                {`${t(item)} ${leaderboardFiltersEmojies[i]}`}
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
        <div className='glass-card border-gray-200 border-2 rounded-xl flex flex-col gap-4 p-3 sm:px-8 sm:py-6 lg:px-12 relative'>
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
          {new Array(isLoading ? 100 : 0).fill(1).map((_, i) => (
            <LoadingRow key={i} />
          ))}
          {!isLoading && leaderboard?.length === 0 && (
            <div className='flex justify-center flex-col items-center h-40'>
              <p className='text-lg font-semibold'>No results found</p>
              <p
                className='transition-colors italic hover:text-gray-700 text-gray-400 cursor-pointer font-semibold'
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
          hasNextPage={leaderboard?.length === 100}
          fetchNext={() => fetchNextLeaderboard()}
          fetchPrevious={() => fetchPreviousLeaderboard()}
        />
      </div>
    </>
  )
}

export default LeaderboardTable
