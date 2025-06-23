import React, { Suspense } from 'react'

import Filters from './filters'
import Search from './search'
import PageSelector from '#/components/page-selector'
import type { LeaderboardFilter } from '#/types/common'
import { useIsClient } from '@uidotdev/usehooks'
import { cn } from '#/lib/utilities'
import { useGlassTheme } from '#/hooks/use-glass-theme'

interface TableHeadersProps {
  filter: LeaderboardFilter
  onSelectFilter: (filter: LeaderboardFilter) => void
  page: number
  setPage: (page: number) => void
  isFetchingNextLeaderboard: boolean
  isFetchingPreviousLeaderboard: boolean
  currentSearch: string
  handleSearchEvent: (e: React.ChangeEvent<HTMLInputElement>) => void
  setChunk: (chunk: number) => void
  fetchNextLeaderboard: () => void
  fetchPreviousLeaderboard: () => void
}

const TableHeaders: React.FC<TableHeadersProps> = ({
  filter,
  onSelectFilter,
  page,
  setPage,
  isFetchingNextLeaderboard,
  isFetchingPreviousLeaderboard,
  currentSearch,
  handleSearchEvent,
  setChunk,
  fetchNextLeaderboard,
  fetchPreviousLeaderboard,
}) => {
  const isClient = useIsClient()
  const { getGlassClass } = useGlassTheme()

  return (
    <div
      className={cn(
        getGlassClass('glass-pseudo-modal', 'bg-neutral'),
        'z-50 flex items-center justify-between gap-2 rounded-sm px-4 py-2 pr-2 lg:pl-2'
      )}
    >
      <div className='flex items-center gap-4'>
        <Search currentSearch={currentSearch} handleSearchEvent={handleSearchEvent} />
        <Filters filter={filter} onSelectFilter={onSelectFilter} />
      </div>
      <Suspense>
        <PageSelector
          page={page}
          setPage={setPage}
          hasNextPage={true}
          scrollUp={true}
          displayPageNumber={isClient ? window.innerWidth > 768 : true}
          hasSkipToFirst={isClient ? window.innerWidth > 768 : true}
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
  )
}

export default TableHeaders
