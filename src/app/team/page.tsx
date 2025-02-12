import type { Metadata } from 'next'
import Members from './components/members'

export const metadata: Metadata = {
  title: 'Team | EFP',
  openGraph: {
    title: 'Team | EFP',
    siteName: 'Team - Ethereum Follow Protocol',
    description: 'Discover the team behind Ethereum Follow Protocol',
    url: 'https://efp.app/team',
    images: [
      {
        url: 'https://efp.app/assets/banners/team.png',
      },
    ],
  },
  twitter: {
    images: 'https://efp.app/assets/banners/team.png',
  },
}

const TeamPage = () => {
  return (
    <main className='mx-auto mb-12 flex min-h-full w-full max-w-[1400px] flex-col items-center gap-8 overflow-scroll px-4 pt-[6.75rem] text-center sm:pt-[7.75rem]'>
      <Members />
    </main>
  )
}

export default TeamPage
