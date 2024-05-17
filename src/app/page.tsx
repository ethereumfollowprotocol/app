import type { Metadata } from 'next'
import { Footer } from '#/components/footer'

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
      <main className='mx-auto flex h-full min-h-full w-full flex-col items-center overflow-scroll px-4 pt-8 text-center font-sans'></main>
      <Footer />
    </>
  )
}

export default HomePage
