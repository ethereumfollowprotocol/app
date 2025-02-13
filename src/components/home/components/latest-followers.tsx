import { useTranslation } from 'react-i18next'
import ProfileList from '#/components/profile-list'
import { useLatestFollowers } from '../hooks/use-latest-followers'
import PageSelector from '#/components/page-selector'
import { Suspense } from 'react'

const LatestFollowers = () => {
  const { t } = useTranslation()
  const { subPage, isLoading, setSubPage, displayedProfiles, isFetchingNextPage, isFetchingPreviousPage } =
    useLatestFollowers()

  const isLatestFollowersLoading = isLoading || isFetchingNextPage || isFetchingPreviousPage

  return (
    <div className='glass-card border-grey flex w-full flex-col gap-3 rounded-sm border-[3px] px-2 py-4 sm:p-4 xl:p-3 2xl:gap-4'>
      <div className='flex w-full items-center justify-between'>
        <h2 className='w-full p-2 text-2xl font-bold 2xl:text-3xl'>{t('latest followers')}</h2>
        <Suspense>
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
            hasNextPage={subPage < 5}
          />
        </Suspense>
      </div>
      <ProfileList
        loadingRows={11}
        showFollowsYouBadges={false}
        profiles={displayedProfiles}
        isLoading={isLatestFollowersLoading}
      />
      {!isLoading && displayedProfiles?.length === 0 && (
        <div className='flex w-full items-center justify-center text-lg font-bold italic lg:h-[638px]'>
          {t('no followers')}
        </div>
      )}
    </div>
  )
}

export default LatestFollowers
