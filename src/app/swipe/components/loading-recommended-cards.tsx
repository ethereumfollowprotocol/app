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
      <div className='halloween:border-[#a36d7d] bg-neutral xxs:max-w-92 flex h-[536px] w-full items-center rounded-sm border-[3px] border-[#FFDBD9] sm:mr-[14px] dark:border-[#a36d7d]'>
        <p className='w-full px-6 text-center text-lg font-semibold'>{t('no more profiles')}</p>
      </div>
    ) : (
      (isLoading || isFetchingNextPage || recommendedProfiles.length === 0) &&
      new Array(3).fill(1).map((_, i) => (
        <div
          className='xxs:max-w-92 absolute top-0 z-10 h-fit w-full sm:mr-[14px]'
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
    <div className='absolute top-0 z-10 h-fit w-full sm:mr-[14px] sm:max-w-92'>
      <Suspense>
        <UserProfileCard isResponsive={false} hideFollowButton={true} isRecommended={true} />
      </Suspense>
    </div>
  )
}

export default LoadingRecommendedCards
