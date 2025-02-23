import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import ProfileList from '#/components/profile-list'
import PageSelector from '#/components/page-selector'
import { useLatestFollowers } from '../hooks/use-latest-followers'

const LatestFollowers = () => {
  const { t } = useTranslation()
  const { subPage, isLoading, setSubPage, displayedProfiles, isFetchingNextPage, isFetchingPreviousPage } =
    useLatestFollowers(10, 10)

  const isLatestFollowersLoading = isLoading || isFetchingNextPage || isFetchingPreviousPage

  return (
    <div className='bg-neutral shadow-medium flex w-full flex-col gap-3 rounded-sm px-2 py-4 sm:p-4 xl:p-3 2xl:gap-4'>
      <div className='flex w-full items-center justify-between'>
        <h2 className='w-full p-2 text-2xl font-bold 2xl:text-3xl'>{t('latest followers')}</h2>
        <Suspense>
          <PageSelector
            page={subPage}
            setPage={setSubPage}
            adjustUrl={false}
            hasSkipToFirst={false}
            displayPageNumber={false}
            isLoading={isLatestFollowersLoading}
            hasNextPage={subPage < 5}
          />
        </Suspense>
      </div>
      <ProfileList
        loadingRows={10}
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
