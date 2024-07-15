import LeaderboardTable from './table.tsx'

const Leaderboard = () => {
  return (
    <main className='font-sans mx-auto flex gap-6 h-full min-h-full w-full flex-col items-center overflow-scroll mb-12 px-4 pt-6 mt-24 sm:mt-28 lg:mt-32 xl:mt-28 text-center'>
      <p className='text-4xl font-bold'>Leaderboard</p>
      <LeaderboardTable />
    </main>
  )
}

export default Leaderboard
