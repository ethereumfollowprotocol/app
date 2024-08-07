'use client'

import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'

import Recommendations from '#/components/recommendations'
import LatestFollowers from './components/latest-followers'
import UserProfileCard from '#/components/user-profile-card'
import { useEFPProfile } from '#/contexts/efp-profile-context'

const Summary = () => {
  const { address } = useAccount()
  const { t } = useTranslation()
  const { profile, followers, selectedList, profileIsLoading, followersIsLoading } = useEFPProfile()

  const isFollowersEmpty = !followersIsLoading && followers.length === 0

  return (
    <div className='mt-[108px] md:mt-28 w-full lg:mt-32 xl:mt-40 px-4 xl:px-0 2xl:px-8 flex items-start lg:justify-center lg:gap-4 xl:justify-center justify-center flex-wrap xl:flex-nowrap gap-y-4'>
      <UserProfileCard
        profileList={selectedList}
        hideFollowButton={true}
        profile={profile}
        isLoading={profileIsLoading}
        borderColor='border-[#FFDBD9]'
      />
      {!isFollowersEmpty && address && (
        <LatestFollowers
          isLoading={followersIsLoading}
          profiles={followers?.slice(0, 7).map(follower => ({
            tags: follower.tags,
            address: follower.address,
            ens: follower.ens
          }))}
        />
      )}

      <Recommendations
        limit={7}
        endpoint='discover'
        header={t('discover')}
        className={`h-fit w-full p-2 ${
          isFollowersEmpty || !address
            ? 'xl:w-2/3 xl:max-w-[900px]'
            : 'lg:h-[638px] lg:w-[49%] xl:w-[470px] 2xl:w-[650px]'
        } py-4 sm:p-6 glass-card border-2 border-gray-200 rounded-2xl`}
      />
    </div>
  )
}

export default Summary
