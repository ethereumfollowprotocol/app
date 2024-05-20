import type { Metadata } from 'next'
import { Footer } from '#/components/footer'
import Summary from '#/components/home/summary'

export const metadata = {
  metadataBase: new URL('https://app.ethfollow.xyz'),
  openGraph: {
    images: [{ url: '/banner.png', alt: 'Ethereum Follow Protocol' }]
  },
  twitter: {
    images: [{ url: '/banner.png', alt: 'Ethereum Follow Protocol' }]
  }
} satisfies Metadata

const HomePage = () => {
  return (
    <>
      <main className='mx-auto bg-transparent flex h-screen w-full flex-col items-center font-sans'>
        <Summary />
      </main>
      <Footer />
    </>
  )
}

export default HomePage
