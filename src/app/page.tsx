import type { Metadata } from 'next'
import Summary from '#/components/home/summary'

export const metadata: Metadata = {
  title: 'Home | EFP',
  openGraph: {
    title: 'Home | EFP',
    siteName: 'App - Ethereum Follow Protocol',
    description: 'Social graph for Ethereum',
    url: 'https://ethfollow.xyz',
    images: [
      {
        url: 'https://ethfollow.xyz/assets/banners/home.png'
      }
    ]
  },
  twitter: {
    images: 'https://ethfollow.xyz/assets/banners/home.png'
  }
}

const HomePage = () => {
  return (
    <main className='mx-auto bg-transparent overflow-hidden flex min-h-screen w-full flex-col items-center '>
      <Summary />
    </main>
  )
}

export default HomePage
