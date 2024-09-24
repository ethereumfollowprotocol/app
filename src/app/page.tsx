import { Footer } from '#/components/footer'
import Summary from '#/components/home/summary'
import Landing from '#/components/home/landing'
import type { Metadata } from 'next'

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
    <>
      <main className='mx-auto home bg-transparent flex min-h-screen w-full flex-col items-center '>
        <Summary />
        <Landing />
      </main>
      <Footer />
    </>
  )
}

export default HomePage
