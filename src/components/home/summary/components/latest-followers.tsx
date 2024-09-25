import { useTranslation } from 'react-i18next'
import { FollowList } from '#/components/follow-list'
import { useLatestFollowers } from '../hooks/use-latest-followers'
import PageSelector from '#/app/leaderboard/components/page-selector'

const LatestFollowers = () => {
  const { t } = useTranslation()
  const {
    subPage,
    isLoading,
    setSubPage,
    displayedProfiles,
    isFetchingNextPage,
    isFetchingPreviousPage
  } = useLatestFollowers()

  const isLatestFollowersLoading = isLoading || isFetchingNextPage || isFetchingPreviousPage

  return (
    <div className='glass-card w-full max-h-[370px] sm:max-h-[400px] px-2 py-4 sm:p-4 flex flex-col gap-4 rounded-2xl border-[3px] border-zinc-200 dark:border-zinc-500'>
      <div className='flex w-full items-center justify-between'>
        <h2 className='text-2xl sm:text-3xl w-full p-2 font-bold'>{t('latest followers')}</h2>
        <PageSelector
          page={subPage}
          // setPage={(newPage: number) => {
          //   if (newPage > subPage && (newPage - 1) % 5 === 0) {
          //     setPage((newPage - 1) / 5 + 1)
          //   }
          //   if (newPage < subPage && newPage % 5 === 0) {
          //     setPage(newPage / 5)
          //   }
          //   setSubPage(newPage)
          // }}
          setPage={setSubPage}
          adjustUrl={false}
          hasSkipToFirst={false}
          displayPageNumber={false}
          // fetchNext={() => (subPage % 5 === 0 ? fetchNextPage() : null)}
          // fetchPrevious={() => ((subPage - 1) % 5 === 0 ? fetchPreviousPage() : null)}
          isLoading={isLatestFollowersLoading}
          // hasNextPage={(displayedProfiles?.length || 1) % 4 === 0}
          hasNextPage={subPage < 8}
        />
      </div>
      <FollowList
        loadingRows={4}
        listClassName='gap-3'
        showFollowsYouBadges={false}
        profiles={displayedProfiles}
        isLoading={isLatestFollowersLoading}
      />
      {!isLoading && displayedProfiles?.length === 0 && (
        <div className='w-full lg:h-[638px] flex justify-center items-center font-bold italic text-lg'>
          {t('no followers')}
        </div>
      )}
    </div>
  )
}

export default LatestFollowers
