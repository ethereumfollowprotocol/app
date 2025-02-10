import type { Metadata } from 'next'
import LeaderboardTable from './components/table.tsx'
import { Suspense } from 'react'

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
    <main className=' mx-auto flex gap-2 h-full min-h-full w-full flex-col items-center overflow-scroll mb-12 px-4 mt-24 sm:mt-28 lg:mt-32 text-center'>
      <Suspense>
        <LeaderboardTable />
      </Suspense>
    </main>
  )
}

export default Leaderboard
