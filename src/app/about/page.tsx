import type { Metadata } from 'next'

import Footer from '#/components/footer'
import Landing from '#/components/home/landing'

export const metadata: Metadata = {
  title: 'About | EFP',
  openGraph: {
    title: 'About | EFP',
    siteName: 'About - Ethereum Follow Protocol',
    description: 'Discover what Ethereum Follow Protocol is all about',
    url: 'https://ethfollow.xyz/about',
    images: [
      {
        url: 'https://ethfollow.xyz/assets/banners/about.png'
      }
    ]
  },
  twitter: {
    images: 'https://ethfollow.xyz/assets/banners/about.png'
  }
}

const AboutPage = () => {
  return (
    <>
      <main className='mx-auto flex min-h-full w-full max-w-[1400px] flex-col pt-28 sm:pt-36 gap-8 items-center overflow-scroll px-4 text-center'>
        <Landing />
      </main>
      <Footer />
    </>
  )
}

export default AboutPage
