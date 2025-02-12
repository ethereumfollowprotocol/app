'use client'

import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities.ts'
import { useRouter } from 'next/navigation'
import FeedCard from '#/components/feed-card.tsx'
import { refetchState } from '#/utils/reset-queries.ts'
import Recommendations from '#/components/recommendations'
import useStickyScroll from './hooks/use-sticky-scroll.ts'
import LatestFollowers from './components/latest-followers'
import UserProfileCard from '#/components/user-profile-card'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import LeaderboardSummary from './components/leaderboard-summary.tsx'

const Home = () => {
  const {
    stats,
    lists,
    profile,
    followers,
    selectedList,
    statsIsLoading,
    listsIsLoading,
    refetchProfile,
    profileIsLoading,
    fetchFreshProfile,
    followersIsLoading,
    setFetchFreshProfile,
    setFetchFreshStats,
    refetchStats,
    fetchFreshStats,
  } = useEFPProfile()
  const router = useRouter()
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()

  const isFollowersEmpty = !followersIsLoading && followers.length === 0

  const { StickyScrollRef: SidebarRef, onScroll: onScrollSidebar } = useStickyScroll(60)
  const { StickyScrollRef: ProfileCardRef, onScroll: onScrollProfileCard } = useStickyScroll(60)

  return (
    <div
      className='relative flex h-screen w-full flex-wrap items-start justify-center gap-y-4 overflow-y-scroll px-4 pt-[108px] md:pt-[6.75rem] lg:justify-center lg:gap-4 lg:px-6 xl:flex-nowrap xl:justify-center xl:px-8'
      onScroll={(e) => {
        onScrollSidebar(e)
        onScrollProfileCard(e)
      }}
    >
      {userAddress && (
        <div className='w-full xl:sticky xl:w-fit' ref={ProfileCardRef}>
          <UserProfileCard
            profileList={selectedList || Number(profile?.primary_list)}
            hideFollowButton={true}
            stats={stats}
            profile={profile}
            isStatsLoading={statsIsLoading}
            isLoading={profileIsLoading}
            refetchProfile={() => {
              refetchState(fetchFreshProfile, setFetchFreshProfile, refetchProfile)
              refetchState(fetchFreshStats, setFetchFreshStats, refetchStats)
            }}
            showMoreOptions={true}
            openBlockModal={() => {
              if (profile)
                router.push(
                  `/${selectedList && selectedList !== Number(profile.primary_list) ? selectedList : profile.address}?modal=block_mute_list`
                )
            }}
            openListSettingsModal={() => {
              if (profile)
                router.push(
                  `/${selectedList && selectedList !== Number(profile.primary_list) ? selectedList : profile.address}?modal=list_settings`
                )
            }}
            openQrCodeModal={() => {
              if (profile)
                router.push(
                  `/${selectedList && selectedList !== Number(profile.primary_list) ? selectedList : profile.address}?modal=qr_code`
                )
            }}
          />
        </div>
      )}
      <div className='flex h-auto w-full flex-col gap-4 lg:hidden xl:sticky'>
        <Recommendations
          limit={10}
          endpoint='discover'
          header={t('recent')}
          className={cn('glass-card border-grey h-fit w-full rounded-2xl border-[3px] py-4 sm:p-4')}
        />
        {!isFollowersEmpty && userAddress && <LatestFollowers />}
      </div>
      {userAddress ? (
        <FeedCard
          cardSize={cn(
            'w-full xl:min-w-[430px] lg:w-[49%] px-0 pt-4 xs:p-4 xl:p-[18px] 2xl:p-6 rounded-2xl',
            (lists?.lists?.length || 0) === 0 && !listsIsLoading
              ? 'h-[50vh] md:h-[640px] xl:w-2/5 2xl:w-[550px] '
              : 'h-[1000000vh] xl:w-[45%] 2xl:w-[650px]'
          )}
          contentSize='h-full w-full rounded-2xl'
          title={t('feed')}
          description={t('feed description')}
        />
      ) : (
        <LeaderboardSummary />
      )}
      <div
        ref={SidebarRef}
        className={cn(
          'hidden h-[85vh] flex-col gap-4 lg:flex xl:sticky',
          userAddress
            ? 'w-full lg:w-[49.2%] xl:w-[40%] 2xl:w-2/5 2xl:max-w-[900px] 2xl:min-w-[450px]'
            : 'h-[638px] w-full xl:w-1/2 xl:max-w-[900px]'
        )}
        style={{
          top: userAddress ? 'calc(100vh - 108px - 2000px)' : '0',
        }}
      >
        <Recommendations
          limit={11}
          endpoint='discover'
          header={t('recent')}
          className={cn('glass-card border-grey h-fit w-full rounded-2xl border-[3px] p-3 py-4 2xl:p-4')}
        />
        {!isFollowersEmpty && userAddress && <LatestFollowers />}
      </div>
      {/* <ScrollIndicator /> */}
    </div>
  )
}

export default Home
