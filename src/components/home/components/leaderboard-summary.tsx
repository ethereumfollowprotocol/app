import PageSelector from '#/components/page-selector'
import { useTranslation } from 'react-i18next'
import { useLeaderboardSummary } from '../hooks/useLeaderboardSummary'
import { leaderboardFilters, leaderboardFiltersEmojies } from '#/lib/constants'
import LoadingRow from '#/app/leaderboard/components/loading-row'
import TableRow from '#/app/leaderboard/components/row'
import type { LeaderboardItem } from '#/types/requests'
import Image from 'next/image'

const LeaderboardSummary = () => {
  const { t } = useTranslation()
  const { page, setPage, leaderboardSummaryData, isLeaderboardSummaryLoading } =
    useLeaderboardSummary()

  // const timestamp = leaderboardSummaryData?.[0]?.last_updated
  const displayedData = leaderboardSummaryData?.slice((page - 1) * 2, page * 2)
  const displayedTitles = leaderboardFilters.slice((page - 1) * 2, page * 2)
  const displayedEmojies = leaderboardFiltersEmojies.slice((page - 1) * 2, page * 2)

  return (
    <div className='glass-card mb-3 w-full xl:w-1/2 xl:max-w-[900px] rounded-2xl flex flex-col gap-3 2xl:gap-4 p-1 py-3 border-[3px] border-grey'>
      <div className='w-full flex items-center justify-between p-2 sm:px-4'>
        <h3 className='text-2xl 2xl:text-3xl font-bold'>{t('leaderboard')}</h3>
        <PageSelector
          page={page}
          setPage={setPage}
          hasNextPage={page !== 3}
          hasSkipToFirst={false}
          adjustUrl={false}
          displayPageNumber={false}
        />
      </div>
      <div className='flex flex-col gap-3 2xl:gap-[18px]'>
        {displayedTitles.map((title, index) => {
          const selectedRank = {
            followers: (entry: LeaderboardItem) => entry.followers_rank,
            following: (entry: LeaderboardItem) => entry.following_rank,
            mutuals: (entry: LeaderboardItem) => entry.mutuals_rank,
            top8: (entry: LeaderboardItem) => entry.top8_rank,
            blocked: (entry: LeaderboardItem) => entry.blocks_rank
          }[title]

          return (
            <div key={title} className='flex flex-col gap-1 2xl:gap-1.5'>
              <h4 className='text-xl flex gap-2 sm:text-xl 2xl:text-2xl font-bold capitalize px-2 sm:px-4'>
                <p>{t(title)}</p>
                <Image
                  src={displayedEmojies[index]}
                  alt={title}
                  width={24}
                  height={24}
                  className='inline-block'
                />
              </h4>
              {isLeaderboardSummaryLoading ? (
                <div className='animate-pulse flex flex-col'>
                  {new Array(5).fill(null).map((_, index) => (
                    <LoadingRow key={index} />
                  ))}
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
                      top8={Number(entry.top8) || 0}
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
