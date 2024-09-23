import type { Metadata } from 'next'
import Cart from './components/cart'

export const metadata: Metadata = {
  title: 'Cart | EFP',
  openGraph: {
    title: 'Cart | EFP',
    siteName: 'Cart - Ethereum Follow Protocol',
    description: 'Confirm your changes on chain',
    url: 'https://testing.ethfollow.xyz/cart',
    images: [
      {
        url: 'https://testing.ethfollow.xyz/assets/banners/editor.png'
      }
    ]
  },
  twitter: {
    images: 'https://testing.ethfollow.xyz/assets/banners/editor.png'
  }
}

export default function EditorPage() {
  return (
    <main
      suppressHydrationWarning={true}
      className='flex flex-col-reverse xl:flex-row gap-4 min-h-full h-full w-full items-center xl:items-start justify-center text-center xl:gap-6 pb-40 pt-[108px] sm:pt-32 lg:pt-36 xl:pt-40 px-2 lg:px-8'
    >
      <Cart />
    </main>
  )
}
