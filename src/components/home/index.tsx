'use client'

import { useRef } from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities.ts'
import FeedCard from '#/components/feed-card.tsx'
import Recommendations from '#/components/recommendations'
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
    profileIsLoading,
    followersIsLoading
  } = useEFPProfile()
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()

  const isFollowersEmpty = !followersIsLoading && followers.length === 0

  const SidebarRef = useRef<HTMLDivElement>(null)
  const ProfileCardRef = useRef<HTMLDivElement>(null)

  let scrollTopSidebar = 0
  const onScrollSidebar = (e: React.UIEvent<HTMLDivElement>) => {
    const sidebar = SidebarRef.current
    if (!sidebar) return
    if (window.innerWidth < 1280) {
      sidebar.style.top = '0px'
      return
    }

    const sidebarHeight = sidebar.scrollHeight + 65
    const sidebarTop = sidebar.getBoundingClientRect().top || 0
    const viewportHeight = window.innerHeight

    if ((sidebarHeight + 108) < viewportHeight) return sidebar.style.top = '0px'

    if (scrollTopSidebar > e.currentTarget.scrollTop) {
      if (sidebarTop >= 120) sidebar.style.top = '0px'
      else sidebar.style.top = `${Number(sidebar.style.top.replace('px', '')) + (scrollTopSidebar - e.currentTarget.scrollTop)}px`
    } else {
      if (sidebarTop < (viewportHeight - sidebarHeight + 100)) sidebar.style.top = `${viewportHeight - 108 - sidebarHeight}px`
      else sidebar.style.top = `${Number(sidebar.style.top.replace('px', '')) - (e.currentTarget.scrollTop - scrollTopSidebar)}px`
    }

    scrollTopSidebar = e.currentTarget.scrollTop
  }

  let scrollTopProfileCard = 0
  const onScrollProfileCard = (e: React.UIEvent<HTMLDivElement>) => {
    const profileCard = ProfileCardRef.current
    if (!profileCard) return
    if (window.innerWidth < 1280) {
      profileCard.style.top = '0px'
      return
    }

    const profileCardHeight = profileCard.scrollHeight + 65
    const profileCardTop = profileCard?.getBoundingClientRect().top || 0
    const viewportHeight = window.innerHeight

    if ((profileCardHeight + 108) < viewportHeight) return profileCard.style.top = '0px'

    if (scrollTopProfileCard > e.currentTarget.scrollTop) {
      if (profileCardTop >= 120) profileCard.style.top = '0px'
      else profileCard.style.top = `${Number(profileCard.style.top.replace('px', '')) + (scrollTopProfileCard - e.currentTarget.scrollTop)}px`
    } else {
      if (profileCardTop < (viewportHeight - profileCardHeight + 100)) profileCard.style.top = `${viewportHeight - 108 - profileCardHeight}px`
      else profileCard.style.top = `${Number(profileCard.style.top.replace('px', '')) - (e.currentTarget.scrollTop - scrollTopProfileCard)}px`
    }

    scrollTopProfileCard = e.currentTarget.scrollTop
  }

  return (
    <div className='pt-[108px] relative md:pt-32 w-full lg:pt-32 xl:pt-40 h-screen px-4 overflow-y-scroll lg:px-6 xl:px-8 flex items-start lg:justify-center lg:gap-4 xl:justify-center justify-center flex-wrap xl:flex-nowrap gap-y-4'
      onScroll={(e) => {
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
          />
        </div>
      )}
      <div
        className='flex flex-col gap-4 h-auto w-full lg:hidden xl:sticky'
      >
        {!isFollowersEmpty && userAddress && <LatestFollowers />}
        <Recommendations
          limit={10}
          endpoint='discover'
          header={t('recent')}
          className={cn('h-fit w-full py-4 sm:p-4 glass-card border-[3px] border-grey rounded-2xl')}
        />
      </div>
      {userAddress ? (
        <FeedCard
          cardSize={cn(
            'w-full xl:min-w-[430px] lg:w-[49%] px-0 pt-4 xs:p-4 md:p-6 rounded-2xl',
            (lists?.lists?.length || 0) === 0 && !listsIsLoading
              ? 'h-[50vh] md:h-[640px] xl:w-2/5 2xl:w-[550px] '
              : 'h-[1000000vh] xl:w-2/5 2xl:w-[650px]'
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
            ? ' w-full lg:w-[49%] xl:w-[40%] 2xl:min-w-[450px] 2xl:w-2/5 2xl:max-w-[900px]'
            : 'w-full xl:w-1/2 xl:max-w-[900px] h-[638px]'
        )}
        style={{
          top: userAddress ? 'calc(100vh - 108px - 2000px)' : '0',
        }}
      >
        {!isFollowersEmpty && userAddress && <LatestFollowers />}
        <Recommendations
          limit={11}
          endpoint='discover'
          header={t('recent')}
          className={cn('h-fit w-full py-4 sm:p-4 glass-card border-[3px] border-grey rounded-2xl')}
        />
      </div>
      {/* <ScrollIndicator /> */}
    </div>
  )
}

export default Home
