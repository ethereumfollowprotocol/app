'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'

import FeedCard from '#/components/feed-card.tsx'
import Recommendations from '#/components/recommendations'
import useStickyScroll from './hooks/use-sticky-scroll.ts'
import LatestFollowers from './components/latest-followers'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import Apps from 'public/assets/icons/ui/apps.svg'
import ArrowRight from 'public/assets/icons/ui/arrow-right.svg'
import ProfileSummaryCard from './components/profile-summary-card.tsx'
import BackToTop from '../buttons/back-to-top.tsx'
import ConnectWalletButton from '../buttons/connect-wallet.tsx'
import Image from 'next/image'
import homeBackgroundLight from 'public/assets/art/home-background-light.png'
import homeBackgroundDark from 'public/assets/art/home-background-dark.png'

const Home = () => {
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()
  const { followers, followersIsLoading } = useEFPProfile()
  const { StickyScrollRef: SidebarRef, onScroll: onScrollSidebar } = useStickyScroll(0, 16)
  const isFollowersEmpty = !followersIsLoading && followers.length === 0

  return (
    <div
      id='home-page'
      className='flex h-screen w-full flex-col items-center gap-4 overflow-y-scroll px-4 sm:pr-4 sm:pl-24'
      onScroll={(e) => onScrollSidebar(e.target as HTMLDivElement)}
    >
      <Image
        src={homeBackgroundLight}
        alt='home-bg'
        width={2600}
        height={2600}
        className='3xl:-right-[1600px] 3xl:h-[2600px] 3xl:w-[2600px] 3xl:-top-[1050px] 3xl:-rotate-6 fixed -top-[760px] -right-[900px] -z-10 aspect-square h-[2100px] w-[2100px] overflow-visible object-cover sm:-right-[150vw] md:-right-[110vw] lg:-right-[85vw] xl:-right-[70vw] dark:hidden'
      />
      <Image
        src={homeBackgroundDark}
        alt='home-bg'
        width={6000}
        height={6000}
        className='3xl:-right-[1600px] 3xl:h-[2600px] 3xl:w-[2600px] 3xl:-top-[1050px] 3xl:-rotate-6 fixed -top-[760px] -right-[900px] -z-10 hidden aspect-square h-[2100px] w-[2100px] overflow-visible object-cover sm:-right-[150vw] md:-right-[110vw] lg:-right-[85vw] xl:-right-[70vw] dark:block'
      />
      <div className='fixed top-4 right-4 z-50 hidden h-fit w-fit sm:block'>
        <ConnectWalletButton />
      </div>
      <div className='mt-24 flex w-full max-w-[1100px] flex-col gap-4 md:mt-20 lg:mt-24'>
        <h2 className='xs:text-4xl text-3xl font-bold sm:text-5xl 2xl:text-6xl'>{t('home title')}</h2>
        <p className='w-[90%] text-lg sm:mt-3 lg:w-3/4 xl:w-2/3'>
          <b>{t('home description efp')}</b>
          {t('home description')}
        </p>
        <Link
          href='/integrations'
          className='group/link ml-[-3px] flex w-fit items-center gap-2 transition-opacity hover:opacity-70'
        >
          <Apps className='h-auto w-8' />
          <p className='text-lg font-bold italic'>{t('integrate link')}</p>
          <ArrowRight className='h-auto w-5 transition-all group-hover/link:translate-x-1.5' />
        </Link>
      </div>
      <div className='mt-2 w-full lg:hidden'>
        <ProfileSummaryCard />
      </div>
      <div className='flex w-full max-w-[1100px] flex-row justify-center gap-5 lg:mt-2'>
        <FeedCard
          cardSize='w-full lg:max-w-[580px] rounded-sm'
          contentSize='h-full w-full rounded-sm'
          title={t('feed')}
          description={t('feed description')}
        />
        <div
          ref={SidebarRef}
          className='hidden h-[90vh] w-full max-w-[520px] flex-col gap-4 lg:sticky lg:flex'
          style={{
            top: 'calc(100vh - 2700px)',
          }}
        >
          <ProfileSummaryCard />
          <Recommendations
            limit={10}
            endpoint='discover'
            header={t('recent')}
            className='bg-neutral shadow-medium h-fit w-full rounded-sm'
          />
          {userAddress && !isFollowersEmpty && <LatestFollowers />}
          <Recommendations
            limit={10}
            endpoint='recommended'
            header={t('recommended.title')}
            className='bg-neutral shadow-medium h-fit w-full rounded-sm'
          />
        </div>
      </div>
      <BackToTop />
    </div>
  )
}

export default Home
