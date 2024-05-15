import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'

import ConnectButton from './connect-button'
import { Menu } from '#/components/menu.tsx'
import { Search } from '#/components/search.tsx'
import { useCart } from '#/contexts/cart-context'
import CartButton from '#/components/cart-button.tsx'

import FullLogo from 'public/assets/logo-full.svg'

export function shouldHidePath({
  connected,
  privatePath
}: { connected: boolean; privatePath?: boolean }) {
  return !connected && privatePath ? true : false
}

const navItems = [
  {
    href: '/',
    emoji: '🏠',
    name: 'home',
    private: false
  },
  {
    href: '/profile',
    emoji: '👤',
    name: 'profile',
    private: true
  },
  {
    href: '/leaderboard?filter=followers',
    emoji: '🏆',
    name: 'leaderboard',
    private: false
  }
]

const Navigation = () => {
  const pathname = usePathname()
  const account = useAccount()
  const { totalCartItems } = useCart()

  return (
    <header className={clsx(['w-full  font-sans '])}>
      <nav className='my-auto flex w-full flex-row justify-between'>
        <div className={clsx(['my-auto flex w-full items-center gap-6 space-x-3 sm:pr-3'])}>
          <Link href='/' className='select-none' aria-label='Ethereum Follow Protocol Logo link'>
            <Image
              src={FullLogo}
              className='w-32 select-none'
              alt='Ethereum Follow Protocol Logo'
            />
          </Link>
          <Search />
        </div>
        <div className='flex gap-10 items-center'>
          <ul className='flex gap-9 items-center'>
            {navItems.map((item, index) => {
              // Check if the environment variable is set
              if (!process.env.NEXT_PUBLIC_ENS_API_URL) {
                throw new Error(
                  "Environment variable 'NEXT_PUBLIC_ENS_API_URL' is not set. Please configure it in your environment."
                )
              }

              const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}${item.href}`)

              return (
                <li className='inline font-bold' key={`${item.name}`}>
                  <Link
                    prefetch={true}
                    href={item.href}
                    className={clsx([
                      'capitalize transition-colors',
                      url.pathname === pathname ? 'text-darkGrey' : 'text-grey hover:text-gray-500'
                    ])}
                  >
                    <span className='hidden sm:block'>{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className='flex items-center gap-6'>
            <CartButton cartItemsCount={totalCartItems} />
            <ConnectButton />
            {/* <Menu /> */}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navigation
