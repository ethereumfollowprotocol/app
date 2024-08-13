import type { Metadata } from 'next'
import LeaderboardTable from './components/table.tsx'

export const metadata: Metadata = {
  title: 'Leaderboard | EFP'
}

const Leaderboard = () => {
  return (
    <main className='font-sans mx-auto flex gap-2 h-full min-h-full w-full flex-col items-center overflow-scroll mb-12 px-4 pt-6 mt-24 sm:mt-28 lg:mt-32 xl:mt-28 text-center'>
      <p className='text-5xl font-bold'>Leaderboard</p>
      <LeaderboardTable />
    </main>
  )
}

export default Leaderboard
