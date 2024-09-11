import { useTranslation } from 'react-i18next'
import { FollowList } from '#/components/follow-list'
import { useLatestFollowers } from '../hooks/use-latest-followers'
import PageSelector from '#/app/leaderboard/components/page-selector'

const LatestFollowers = () => {
  const { t } = useTranslation()
  const {
    displayedProfiles,
    page,
    setPage,
    isLoading,
    hasNextPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage
  } = useLatestFollowers()

  const isLatestFollowersLoading = isLoading || isFetchingNextPage || isFetchingPreviousPage

  return (
    <div className='glass-card lg:max-h-[638px] w-full lg:w-[49%] xl:w-[450px] 2xl:w-108 px-2 py-4 sm:p-4 flex flex-col gap-4 rounded-2xl border-[3px] border-zinc-200 dark:border-zinc-500'>
      <div className='flex w-full items-center justify-between'>
        <h2 className='text-2xl sm:text-3xl w-full p-2 font-bold'>{t('latest followers')}</h2>
        <PageSelector
          page={page}
          setPage={setPage}
          adjustUrl={false}
          hasSkipToFirst={false}
          displayPageNumber={false}
          fetchNext={fetchNextPage}
          fetchPrevious={fetchPreviousPage}
          isLoading={isLatestFollowersLoading}
          hasNextPage={hasNextPage && (displayedProfiles?.length || 1) % 7 === 0}
        />
      </div>
      <FollowList
        loadingRows={7}
        listClassName='gap-3'
        showFollowsYouBadges={true}
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
