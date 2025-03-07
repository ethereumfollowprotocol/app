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
    <div className='bg-neutral shadow-medium flex w-full flex-col gap-3 rounded-sm pt-4'>
      <div className='flex w-full items-center justify-between px-4'>
        <h2 className='w-full pl-1 text-2xl font-bold'>{t('latest followers')}</h2>
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
