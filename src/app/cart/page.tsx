import type { Metadata } from 'next'
import Cart from './components/cart'

export const metadata: Metadata = {
  title: 'Cart | EFP',
  openGraph: {
    title: 'Cart | EFP',
    siteName: 'Cart - Ethereum Follow Protocol',
    description: 'Confirm your changes on chain',
    url: 'https://efp.app/cart',
    images: [
      {
        url: 'https://efp.app/assets/banners/editor.png',
      },
    ],
  },
  twitter: {
    images: 'https://efp.app/assets/banners/editor.png',
  },
}

const CartPage = () => (
  <main
    suppressHydrationWarning={true}
    className='flex min-h-full w-full flex-col-reverse items-center gap-4 text-center xl:h-screen xl:flex-row xl:items-start xl:justify-center'
  >
    <Cart />
  </main>
)

export default CartPage
