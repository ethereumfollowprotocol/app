import PageSelector from '#/app/leaderboard/components/page-selector'
import { useTranslation } from 'react-i18next'
import { useLeaderboardSummary } from '../hooks/useLeaderboardSummary'
import { leaderboardFilters, leaderboardFiltersEmojies } from '#/lib/constants'
import LoadingRow from '#/app/leaderboard/components/loading-row'
import TableRow from '#/app/leaderboard/components/row'
import type { LeaderboardItem } from '#/types/requests'

const LeaderboardSummary = () => {
  const { t } = useTranslation()
  const { page, setPage, leaderboardSummaryData, isLeaderboardSummaryLoading } =
    useLeaderboardSummary()

  // const timestamp = leaderboardSummaryData?.[0]?.last_updated
  const displayedData = leaderboardSummaryData?.slice((page - 1) * 2, page * 2)
  const displayedTitles = leaderboardFilters.slice((page - 1) * 2, page * 2)
  const displayedEmojies = leaderboardFiltersEmojies.slice((page - 1) * 2, page * 2)

  return (
    <div className='glass-card w-full xl:w-[47.5%] xl:max-w-[900px] rounded-2xl flex flex-col gap-4 p-1 py-3 border-[3px] border-zinc-200 dark:border-zinc-500'>
      <div className='w-full flex items-center justify-between p-2 sm:p-4'>
        <h3 className='text-2xl sm:text-3xl font-bold'>{t('leaderboard')}</h3>
        <PageSelector
          page={page}
          setPage={setPage}
          hasNextPage={page !== 2}
          hasSkipToFirst={false}
          adjustUrl={false}
          displayPageNumber={false}
        />
      </div>
      <div className='flex flex-col gap-3'>
        {displayedTitles.map((title, index) => {
          const selectedRank = {
            followers: (entry: LeaderboardItem) => entry.followers_rank,
            following: (entry: LeaderboardItem) => entry.following_rank,
            mutuals: (entry: LeaderboardItem) => entry.mutuals_rank,
            blocked: (entry: LeaderboardItem) => entry.blocks_rank
          }[title]

          return (
            <div key={title} className='flex flex-col gap-1'>
              <h4 className='text-xl sm:text-xl font-bold capitalize px-2 sm:px-4'>
                {title} {displayedEmojies[index]}
              </h4>
              {isLeaderboardSummaryLoading ? (
                <div className='animate-pulse flex flex-col'>
                  <LoadingRow staticStats={false} />
                  <LoadingRow staticStats={false} />
                  <LoadingRow staticStats={false} />
                </div>
              ) : (
                <div className='flex flex-col'>
                  {displayedData?.[index]?.results.map(entry => (
                    <TableRow
                      key={entry.address}
                      address={entry.address}
                      name={entry.name}
                      avatar={entry.avatar}
                      rank={Number(selectedRank(entry))}
                      firstStat={title}
                      followers={Number(entry.followers) || 0}
                      following={Number(entry.following) || 0}
                      mutuals={Number(entry.mutuals) || 0}
                      blocked={Number(entry.blocks) || 0}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LeaderboardSummary
