'use client'

import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities.ts'
import FeedCard from '#/components/feed-card.tsx'
import Recommendations from '#/components/recommendations'
import LatestFollowers from './components/latest-followers'
import UserProfileCard from '#/components/user-profile-card'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import ScrollIndicator from '#/components/scroll-indicator.tsx'
import LeaderboardSummary from './components/leaderboard-summary.tsx'

const Summary = () => {
  const {
    stats,
    lists,
    profile,
    followers,
    selectedList,
    statsIsLoading,
    listsIsLoading,
    profileIsLoading,
    followersIsLoading
  } = useEFPProfile()
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()

  const isFollowersEmpty = !followersIsLoading && followers.length === 0

  return (
    <div className='mt-[108px] relative md:mt-32 w-full lg:mt-32 xl:mt-40 px-4 lg:px-6 xl:px-8 flex items-start lg:justify-center lg:gap-4 xl:justify-center justify-center flex-wrap xl:flex-nowrap gap-y-4'>
      {userAddress && (
        <UserProfileCard
          profileList={selectedList || Number(profile?.primary_list)}
          hideFollowButton={true}
          stats={stats}
          profile={profile}
          isStatsLoading={statsIsLoading}
          isLoading={profileIsLoading}
        />
      )}
      {userAddress ? (
        <FeedCard
          cardSize={cn(
            'w-full xl:min-w-[420px] lg:w-[49%] px-0 pt-4 xs:p-4 md:p-6 rounded-2xl',
            (lists?.lists?.length || 0) === 0 && !listsIsLoading
              ? 'h-[50vh] md:h-[640px] xl:w-1/3 2xl:w-[500px] '
              : 'h-[90vh] md:h-[823px] xl:w-1/3 2xl:w-[600px]'
          )}
          contentSize='h-full w-full rounded-2xl'
          title={t('feed')}
          description={t('feed description')}
        />
      ) : (
        <LeaderboardSummary />
      )}
      <div
        className={cn(
          'flex flex-col gap-4',

          userAddress
            ? 'lg:h-[400px] w-full lg:w-[49%] xl:w-[45%] 2xl:min-w-[500px] 2xl:w-1/2 2xl:max-w-[900px]'
            : 'w-full xl:w-1/2 xl:max-w-[900px] h-[638px]'
        )}
      >
        {!isFollowersEmpty && userAddress && <LatestFollowers />}
        <Recommendations
          limit={!isFollowersEmpty && userAddress ? 4 : 7}
          endpoint='discover'
          header={t('recent')}
          className={cn(
            'h-fit w-full py-4 sm:p-4 glass-card border-[3px] border-zinc-200 dark:border-zinc-500 rounded-2xl'
          )}
        />
      </div>
      <ScrollIndicator />
    </div>
  )
}

export default Summary
