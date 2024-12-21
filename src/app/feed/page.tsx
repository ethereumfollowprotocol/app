import type { Metadata } from 'next'
import Feed from './feed'

export const metadata: Metadata = {
  title: 'Feed | EFP',
  openGraph: {
    title: 'Feed | EFP',
    siteName: 'Feed - Ethereum Follow Protocol',
    description: 'See what your EFP friends are doing onchain 👀',
    url: 'https://ethfollow.xyz/feed',
    images: [
      {
        url: 'https://ethfollow.xyz/assets/banners/feed.png'
      }
    ]
  },
  twitter: {
    images: 'https://ethfollow.xyz/assets/banners/feed.png'
  }
}

const FeedPage = () => {
  return (
    <main className='h-screen w-full'>
      <Feed />
    </main>
  )
}

export default FeedPage
