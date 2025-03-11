import type { Metadata } from 'next'
import Home from '#/components/home'

export const metadata: Metadata = {
  title: 'Ethereum Follow Protocol',
  openGraph: {
    title: 'Ethereum Follow Protocol',
    siteName: 'Ethereum Follow Protocol',
    description: 'Social graph for Ethereum',
    url: 'https://efp.app',
    images: [
      {
        url: 'https://efp.app/assets/banners/home.png',
      },
    ],
  },
  twitter: {
    images: 'https://efp.app/assets/banners/home.png',
  },
}

const HomePage = () => {
  return (
    <main className='mx-auto flex min-h-screen w-full flex-col items-center overflow-hidden bg-transparent'>
      <h1 className='hidden'>Ethereum Follow Protocol</h1>
      <Home />
    </main>
  )
}

export default HomePage
