import Image from 'next/image'
import { Suspense } from 'react'
import type { Metadata } from 'next'

import LeaderboardTable from './components/table.tsx'
import CloudLeft from 'public/assets/art/cloud-left.png'
import CloudRight from 'public/assets/art/cloud-right.png'
import CloudMiddle from 'public/assets/art/cloud-middle.png'
import BackToTop from '#/components/buttons/back-to-top.tsx'
import ConnectWalletButton from '#/components/buttons/connect-wallet.tsx'

export const metadata: Metadata = {
  title: 'Leaderboard | EFP',
  openGraph: {
    title: 'Leaderboard | EFP',
    siteName: 'Leaderboard - Ethereum Follow Protocol',
    description: 'Check the leaderboard of the most followed users on Ethereum',
    url: 'https://efp.app/leaderboard',
    images: [
      {
        url: 'https://efp.app/assets/banners/leaderboard.png',
      },
    ],
  },
  twitter: {
    images: 'https://efp.app/assets/banners/leaderboard.png',
  },
}

const Leaderboard = () => {
  return (
    <main
      id='leaderboard-page'
      className='relative flex h-screen w-full flex-col items-center gap-2 overflow-x-hidden overflow-y-scroll px-0 text-center sm:pr-4 sm:pl-24 md:pr-8 md:pl-28 lg:pr-8 lg:pl-28 2xl:pr-4 2xl:pl-24'
    >
      <div className='fixed top-4 right-4 z-50 hidden h-fit w-fit sm:block'>
        <ConnectWalletButton />
      </div>
      <div className='absolute top-0 right-12 -z-10 flex gap-24'>
        <Image src={CloudLeft} alt='Cloud Left' width={260} height={200} className='-translate-y-16 dark:opacity-40' />
        <Image
          src={CloudMiddle}
          alt='Cloud Middle'
          width={260}
          height={200}
          className='translate-y-24 dark:opacity-40'
        />
        <Image src={CloudRight} alt='Cloud Right' width={260} height={200} className='-translate-y-2 dark:opacity-40' />
      </div>
      <Suspense>
        <LeaderboardTable />
      </Suspense>
      <BackToTop />
    </main>
  )
}

export default Leaderboard
