import CartButton from '#/components/cart-button.tsx'
import { Avatar, Text } from '@radix-ui/themes'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAccount } from 'wagmi'
// import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Connect } from '#/components/connect.tsx'
import { Menu } from '#/components/menu.tsx'
import { Search } from '#/components/search.tsx'
import { useIsMounted } from '#/hooks/use-is-mounted.ts'
import { colorScheme } from '#/lib/constants/colors'
import { DevelopmentMenu } from '#/components/development-menu'

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

export function Header() {
  const pathname = usePathname()
  const isMounted = useIsMounted()

  const account = useAccount()

  return (
    <header className={clsx(['w-full px-2.5 font-sans sm:px-3 md:px-4 lg:px-5 xl:px-6'])}>
      <nav className='my-auto flex w-full flex-row justify-between'>
        <div className={clsx(['my-auto flex w-full items-center space-x-3 sm:pr-3'])}>
          <Link href='/' className='select-none' aria-label='Ethereum Follow Protocol Logo link'>
            <Avatar
              mb='1'
              size='4'
              id='logo'
              fallback=''
              alt='Ethereum Follow Protocol Logo'
              src='/assets/logo-gray-on-transparent.png'
              className='select-none rounded-lg bg-kournikova-300'
            />
          </Link>
          <Text
            className={clsx(['w-22 mx-auto h-20 pt-5 font-bold !leading-4 text-black'])}
            trim={'both'}
            weight={'bold'}
            size={{
              initial: '1',
              sm: '1',
              md: '3'
            }}
          >
            Ethereum <br />
            Follow <br />
            Protocol
          </Text>
          <Search />
        </div>
        <ul
          className={clsx([
            'px-2.25 py-0.15 my-auto flex space-x-0 md:text-lg text-sm font-semibold mx-2',
            'sm:space-x-3.5 sm:bg-transparent sm:p-0',
            'hidden lg:flex'
          ])}
        >
          {navItems.map((item, index) => {
            // this line is unsafe???
            const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}${item.href}`)

            return (
              <li className='inline font-bold' key={`${index}`}>
                <Link
                  prefetch={true}
                  href={item.href}
                  className={clsx([
                    'capitalize',
                    url.pathname === pathname ? 'text-black' : 'text-pink-400'
                  ])}
                >
                  <span className='hidden sm:block' style={{ color: colorScheme().tertiary }}>
                    {item.name}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
        <div className='my-auto ml-2 pb-0.5 mr-4'>
          <CartButton cartItemsCount={24} />
        </div>

        {isMounted && (
          <div
            className={clsx([
              !account.isConnected && 'w-min',
              'my-auto flex items-center justify-end pb-1 min-w-fit'
            ])}
          >
            {/* <ConnectButton
              showBalance={false}
              chainStatus={'none'}
              label='Connect'
              accountStatus={ensName ? 'full' : 'address'}
            /> */}
            <Connect />
          </div>
        )}

        <div className='my-auto pb-0.5 pl-2.5'>
          <Menu />
        </div>
        <div className='my-auto pb-0.5 pl-2.5'>
          <DevelopmentMenu />
        </div>
      </nav>
    </header>
  )
}
