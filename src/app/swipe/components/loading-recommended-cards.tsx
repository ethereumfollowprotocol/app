import { useTranslation } from 'react-i18next'
import UserProfileCard from '#/components/user-profile-card'
import type { ProfileDetailsResponse } from '#/types/requests'
import { Suspense } from 'react'

interface LoadingRecommendedCardsProps {
  gone: Set<number>
  isLoading: boolean
  userAddress?: string
  isFetchingNextPage: boolean
  recommendedProfiles: ProfileDetailsResponse[]
}

const LoadingRecommendedCards = ({
  gone,
  isLoading,
  userAddress,
  isFetchingNextPage,
  recommendedProfiles,
}: LoadingRecommendedCardsProps) => {
  const { t } = useTranslation()

  return userAddress ? (
    gone.size === recommendedProfiles.length && !(isFetchingNextPage || isLoading) ? (
      <div className='bg-neutral mr-[14px] flex h-[450px] w-[364px] items-center rounded-sm'>
        <p className='w-full px-6 text-center text-lg font-semibold'>{t('no more profiles')}</p>
      </div>
    ) : (
      (isLoading || isFetchingNextPage || recommendedProfiles.length === 0) &&
      new Array(3).fill(1).map((_, i) => (
        <div
          className='absolute top-0 z-10 mr-[14px] h-fit w-[364px]'
          key={i}
          style={{
            marginTop: `${30 - i * 10}px`,
          }}
        >
          <UserProfileCard isLoading={true} isResponsive={false} hideFollowButton={true} isRecommended={true} />
        </div>
      ))
    )
  ) : (
    <div className='absolute top-0 z-10 h-fit w-[364px] sm:mr-[14px]'>
      <Suspense>
        <UserProfileCard isResponsive={false} hideFollowButton={true} isRecommended={true} />
      </Suspense>
    </div>
  )
}

export default LoadingRecommendedCards
