'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities.ts'
import FeedCard from '#/components/feed-card.tsx'
import Recommendations from '#/components/recommendations'
import useStickyScroll from './hooks/use-sticky-scroll.ts'
import LatestFollowers from './components/latest-followers'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import Apps from 'public/assets/icons/ui/apps.svg'
import ArrowRight from 'public/assets/icons/ui/arrow-right.svg'
import ProfileSummaryCard from './components/profile-summary-card.tsx'
import BackToTop from '../buttons/back-to-top.tsx'

const Home = () => {
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()
  const { followers, followersIsLoading } = useEFPProfile()
  const { StickyScrollRef: SidebarRef, onScroll: onScrollSidebar } = useStickyScroll(0)
  const isFollowersEmpty = !followersIsLoading && followers.length === 0

  return (
    <div
      id='home-page'
      className='flex h-screen w-full flex-col items-center gap-4 overflow-y-scroll px-4 pt-16 sm:pt-8 sm:pr-4 sm:pl-24'
      onScroll={(e) => onScrollSidebar(e.target as HTMLDivElement)}
    >
      <div className='mt-10 flex max-w-[1100px] flex-col gap-4 md:mt-12 lg:mt-16'>
        <h2 className='xs:text-4xl text-3xl font-bold sm:text-5xl lg:text-6xl'>Your friends, onchain</h2>
        <p className='w-[90%] text-lg sm:mt-3 lg:w-3/4 xl:w-2/3'>
          EFP is an onchain social graph protocol for Ethereum accounts, a primitive of the Ethereum identity stack that
          complements ENS and Sign in with Ethereum.
        </p>
        <Link href='https://efp.app/integrations' className='group/link ml-[-3px] flex w-fit items-center gap-2'>
          <Apps className='h-auto w-8' />
          <p className='text-lg font-bold italic'>Integrate it into your app</p>
          <ArrowRight className='h-auto w-5 transition-all group-hover/link:translate-x-1.5' />
        </Link>
      </div>
      <div className='mt-2 w-full lg:hidden'>
        <ProfileSummaryCard />
      </div>
      <div className='flex w-full max-w-[1100px] flex-row justify-center gap-5 lg:mt-2'>
        <FeedCard
          cardSize='w-full lg:max-w-[580px] rounded-sm h-[1000000vh]'
          contentSize='h-full w-full rounded-sm'
          title={t('feed')}
          description={t('feed description')}
        />
        <div
          ref={SidebarRef}
          className='hidden h-[90vh] w-full max-w-[520px] flex-col gap-4 lg:sticky lg:flex'
          style={{
            top: 'calc(100vh - 2000px)',
          }}
        >
          <ProfileSummaryCard />
          <Recommendations
            limit={10}
            endpoint='discover'
            header={t('recent')}
            className={cn('bg-neutral shadow-medium h-fit w-full rounded-sm p-3 py-4 2xl:p-4')}
          />
          {!isFollowersEmpty && userAddress && <LatestFollowers />}
        </div>
      </div>
      <BackToTop />
    </div>
  )
}

export default Home
