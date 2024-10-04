'use client'

import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities.ts'
import FeedCard from '#/components/feed-card.tsx'
import Recommendations from '#/components/recommendations'
import LatestFollowers from './components/latest-followers'
import UserProfileCard from '#/components/user-profile-card'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import LeaderboardSummary from './components/leaderboard-summary.tsx'
import { useRef } from 'react'

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

  const SidebarRef = useRef<HTMLDivElement>(null)
  let scrollTop = 0

  return (
    <div className='pt-[108px] relative md:pt-32 w-full lg:pt-32 xl:pt-40 h-screen px-4 overflow-y-scroll lg:px-6 xl:px-8 flex items-start lg:justify-center lg:gap-4 xl:justify-center justify-center flex-wrap xl:flex-nowrap gap-y-4'
    onScroll={(e) => {
      const sidebar = SidebarRef.current
      if (!sidebar) return

      const sidebarHeight = sidebar.scrollHeight + 65
      const sidebarTop = sidebar?.getBoundingClientRect().top || 0
      const viewportHeight = window.innerHeight

      console.log(viewportHeight - sidebarHeight + 65);

      console.log(sidebar.style.top, sidebarTop)
      if (scrollTop > e.currentTarget.scrollTop) {
        if (sidebarTop >= 135) sidebar.style.top = '0px'
        else sidebar.style.top = Number(sidebar.style.top.replace('px', '')) + (scrollTop - e.currentTarget.scrollTop) + 'px'
      } else {
        if (sidebarTop < (viewportHeight - sidebarHeight + 65)) sidebar.style.top = viewportHeight - 108 - sidebarHeight + 'px'
        else sidebar.style.top = Number(sidebar.style.top.replace('px', '')) - (e.currentTarget.scrollTop - scrollTop) + 'px'
      }

      scrollTop = e.currentTarget.scrollTop
    }}
    >
      {userAddress && (
        <div className='sticky top-0'>
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
      {userAddress ? (
        <FeedCard
          cardSize={cn(
            'w-full xl:min-w-[420px] lg:w-[49%] px-0 pt-4 xs:p-4 md:p-6 rounded-2xl',
            (lists?.lists?.length || 0) === 0 && !listsIsLoading
              ? 'h-[50vh] md:h-[640px] xl:w-1/3 2xl:w-[500px] '
              : 'h-[1000000vh] xl:w-1/3 2xl:w-[600px]'
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
          'flex flex-col gap-4 h-[85vh]',
          userAddress
            ? ' w-full lg:w-[49%] xl:w-[45%] 2xl:min-w-[500px] 2xl:w-1/2 2xl:max-w-[900px]'
            : 'w-full xl:w-1/2 xl:max-w-[900px] h-[638px]'
        )}
        style={{
          top: userAddress ? 'calc(100vh - 108px - 1360px)' : '0',
          position: 'sticky'
        }}

      >
        {!isFollowersEmpty && userAddress && <LatestFollowers />}
        <Recommendations
          limit={7}
          endpoint='discover'
          header={t('recent')}
          className={cn('h-fit w-full py-4 sm:p-4 glass-card border-[3px] border-grey rounded-2xl')}
        />
      </div>
      {/* <ScrollIndicator /> */}
    </div>
  )
}

export default Summary
