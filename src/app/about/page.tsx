import type { Metadata } from 'next'

import Footer from '#/components/footer'
import Landing from '#/app/about/landing'

export const metadata: Metadata = {
  title: 'About | EFP',
  openGraph: {
    title: 'About | EFP',
    siteName: 'About - Ethereum Follow Protocol',
    description: 'Discover what Ethereum Follow Protocol is all about',
    url: 'https://efp.app/about',
    images: [
      {
        url: 'https://efp.app/assets/banners/about.png',
      },
    ],
  },
  twitter: {
    images: 'https://efp.app/assets/banners/about.png',
  },
}

const AboutPage = () => {
  return (
    <>
      <main className='mx-auto flex min-h-full w-full max-w-[1400px] flex-col pt-[6.75rem] sm:pt-[8.75rem] gap-8 items-center overflow-scroll px-4 text-center'>
        <Landing />
      </main>
      <Footer />
    </>
  )
}

export default AboutPage
