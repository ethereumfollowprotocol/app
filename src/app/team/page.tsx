import type { Metadata } from 'next'
import Members from './components/members'
import BackToTop from '#/components/buttons/back-to-top'

export const metadata: Metadata = {
  title: 'Team',
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
    <main className='flex w-full flex-col gap-12 pt-24 pb-20 pl-0 sm:pt-12 sm:pb-0 sm:pl-[70px] lg:pt-20 2xl:pl-20'>
      <Members />
      <BackToTop />
    </main>
  )
}

export default TeamPage
