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

const CartPage = () => (
  <main
    suppressHydrationWarning={true}
    className='flex flex-col-reverse xl:flex-row gap-4 min-h-full xl:h-screen w-full items-center xl:items-start xl:justify-center text-center'
  >
    <Cart />
  </main>
)

export default CartPage
