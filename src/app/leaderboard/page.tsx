import type { LeaderboardFilter } from './types.ts'

const LeaderboardPage = ({
  searchParams
}: {
  searchParams: { query?: string; filter?: LeaderboardFilter }
}) => {
  // const query = searchParams.query || ''
  // const filter = searchParams.filter || 'followers'

  // const queryClient = new QueryClient()
  // await queryClient.prefetchQuery({
  //   queryKey: ['leaderboard', filter],
  //   queryFn: () =>
  //     fetchLeaderboard({
  //       filter,
  //       limit: 4, // change to 200 once ENS data is fixed
  //       include: ['ens', 'blocked', 'muted', 'mutuals']
  //     })
  // })

  // console.log(queryClient.getQueryData(['leaderboard', filter]))

  return (
    <main className='font-sans mx-auto flex h-full min-h-full w-full flex-col items-center overflow-scroll mb-12 px-4 pt-6 mt-24 sm:mt-28 lg:mt-32 xl:mt-40 text-center'>
      <p className='mb-5 text-4xl font-bold'>Leaderboard</p>
      {/* <LeaderboardTable initialFilter={filter} query={query} /> */}
    </main>
  )
}

export default LeaderboardPage
