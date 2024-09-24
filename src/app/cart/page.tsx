import type { Metadata } from 'next'
import Cart from './components/cart'

export const metadata: Metadata = {
  title: 'Cart | EFP',
  openGraph: {
    title: 'Cart | EFP',
    siteName: 'Cart - Ethereum Follow Protocol',
    description: 'Confirm your changes on chain',
    url: 'https://ethfollow.xyz/cart',
    images: [
      {
        url: 'https://ethfollow.xyz/assets/banners/editor.png'
      }
    ]
  },
  twitter: {
    images: 'https://ethfollow.xyz/assets/banners/editor.png'
  }
}

export default function EditorPage() {
  return (
    <main
      suppressHydrationWarning={true}
      className='flex flex-col-reverse xl:flex-row gap-4 min-h-full h-full w-full items-center xl:items-start justify-center text-center xl:gap-6 pt-4 pb-40 mt-[108px] sm:mt-28 lg:mt-32 xl:mt-36 px-2 lg:px-8'
    >
      <Cart />
    </main>
  )
}
