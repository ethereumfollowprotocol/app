import type { Metadata } from 'next'
import Members from './components/members'

export const metadata: Metadata = {
  title: 'Team - Ethereum Follow Protocol'
}

const TeamPage = () => {
  return (
    <main className='mx-auto flex min-h-full w-full max-w-[1400px] flex-col pt-28 sm:pt-36 gap-8 items-center overflow-scroll mb-12 px-4 text-center'>
      <h2 className='font-bold text-5xl'>Team</h2>
      <Members />
    </main>
  )
}

export default TeamPage
