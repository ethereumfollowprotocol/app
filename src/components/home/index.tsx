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
    setFetchFreshProfile
  } = useEFPProfile()
  const router = useRouter()
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()

  const isFollowersEmpty = !followersIsLoading && followers.length === 0

  const { StickyScrollRef: SidebarRef, onScroll: onScrollSidebar } = useStickyScroll(60)
  const { StickyScrollRef: ProfileCardRef, onScroll: onScrollProfileCard } = useStickyScroll(60)

  return (
    <div
      className='pt-[108px] relative md:pt-[6.75rem] w-full h-screen px-4 overflow-y-scroll lg:px-6 xl:px-8 flex items-start lg:justify-center lg:gap-4 xl:justify-center justify-center flex-wrap xl:flex-nowrap gap-y-4'
      onScroll={e => {
        onScrollSidebar(e)
        onScrollProfileCard(e)
      }}
    >
      {userAddress && (
        <div className='xl:sticky w-full xl:w-fit ' ref={ProfileCardRef}>
          <UserProfileCard
            profileList={selectedList || Number(profile?.primary_list)}
            hideFollowButton={true}
            stats={stats}
            profile={profile}
            isStatsLoading={statsIsLoading}
            isLoading={profileIsLoading}
            refetchProfile={() =>
              refetchState(fetchFreshProfile, setFetchFreshProfile, refetchProfile)
            }
            showMoreOptions={true}
            openBlockModal={() => {
              if (profile) router.push(`/${profile.address}?modal=block_mute_list`)
            }}
            openListSettingsModal={() => {
              if (profile) router.push(`/${profile.address}?modal=list_settings`)
            }}
            openQrCodeModal={() => {
              if (profile) router.push(`/${profile.address}?modal=qr_code`)
            }}
          />
        </div>
      )}
      <div className='flex flex-col gap-4 h-auto w-full lg:hidden xl:sticky'>
        <Recommendations
          limit={10}
          endpoint='discover'
          header={t('recent')}
          className={cn('h-fit w-full py-4 sm:p-4 glass-card border-[3px] border-grey rounded-2xl')}
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
          'hidden flex-col gap-4 h-[85vh] lg:flex xl:sticky',
          userAddress
            ? ' w-full lg:w-[49.2%] xl:w-[40%] 2xl:min-w-[450px] 2xl:w-2/5 2xl:max-w-[900px]'
            : 'w-full xl:w-1/2 xl:max-w-[900px] h-[638px]'
        )}
        style={{
          top: userAddress ? 'calc(100vh - 108px - 2000px)' : '0'
        }}
      >
        <Recommendations
          limit={11}
          endpoint='discover'
          header={t('recent')}
          className={cn(
            'h-fit w-full py-4 p-3 2xl:p-4 glass-card border-[3px] border-grey rounded-2xl'
          )}
        />
        {!isFollowersEmpty && userAddress && <LatestFollowers />}
      </div>
      {/* <ScrollIndicator /> */}
    </div>
  )
}

export default Home
