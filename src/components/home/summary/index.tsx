'use client'

import { useTranslation } from 'react-i18next'
import Recommendations from '#/components/recommendations'
import LatestFollowers from './components/latest-followers'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { UserProfileCard } from '#/components/user-profile-card'
import { useAccount } from 'wagmi'

const Summary = () => {
  const { address } = useAccount()
  const { t } = useTranslation('home')
  const {
    profile,
    profileIsLoading,
    followersIsLoading,
    isFetchingMoreFollowers,
    followers,
    following
  } = useEFPProfile()

  return (
    <div className='mt-36 md:mt-48 w-full lg:mt-52 xl:mt-60 px-4 xl:px-0 2xl:px-8 flex items-start lg:justify-between xl:justify-center justify-center flex-wrap xl:flex-nowrap gap-y-4 xl:gap-4'>
      {address ? (
        <>
          <UserProfileCard
            profile={profile}
            following={following}
            isLoading={profileIsLoading}
            borderColor='border-[#FFDBD9]'
          />
          <LatestFollowers
            isLoading={followersIsLoading || isFetchingMoreFollowers}
            profiles={followers?.map(follower => ({
              tags: follower.tags,
              address: follower.address,
              ens: follower.ens
            }))}
          />
        </>
      ) : (
        <div className='h-36 w-full lg:w-[49%] xl:w-[770px] 2xl:w-[816px] lg:h-[638px] italic text-xl font-semibold rounded-2xl flex items-center justify-center glass-card border-2 border-gray-200 '>
          {t('connect wallet')}
        </div>
      )}
      <Recommendations
        limit={7}
        header={t('discover')}
        className='h-fit p-2 lg:h-[638px] w-full lg:w-[49%] xl:w-[470px] 2xl:w-[650px] py-4 sm:p-6 glass-card border-2 border-gray-200 rounded-2xl'
      />
    </div>
  )
}

export default Summary
