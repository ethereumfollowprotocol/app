import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'
import { Menu } from '#/components/menu.tsx'
import { usePathname } from 'next/navigation'
import { useAccount, useEnsName } from 'wagmi'
import { Search } from '#/components/search.tsx'
import { Avatar, Text } from '@radix-ui/themes'
import CartButton from '#/components/cart-button.tsx'
// import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useIsMounted } from '#/hooks/use-is-mounted.ts'
import { Connect } from '#/components/connect.tsx'

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
  const {
    data: ensName,
    error: ensNameError,
    status: ensNameStatus
  } = useEnsName({
    address: account?.address
    // cacheTime: 420_69_420_69,
    // enabled: account?.address && isAddress(account?.address)
  })

  return (
    <header className={clsx(['w-full px-2.5 font-sans sm:px-3 md:px-4 lg:px-5 xl:px-6'])}>
      <nav className='my-auto flex w-full flex-row justify-between'>
        <div className={clsx(['my-auto flex w-full items-center space-x-3 sm:pr-3'])}>
          <Link href='/' className='select-none' aria-label='Ethereum Follow Protocol Logo link'>
            <Avatar
              src='/assets/logo.png'
              fallback=''
              radius='full'
              size='4'
              mb='1'
              className='select-none'
              alt='Ethereum Follow Protocol Logo'
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
          {navItems.map((item, index) => (
            <li className='inline font-bold' key={`${index}`}>
              <Link
                prefetch={true}
                href={item.href}
                className={clsx([
                  'capitalize',
                  pathname === item.href ? 'text-black' : 'text-pink-400'
                ])}
              >
                <span className='hidden sm:block'>{item.name}</span>
              </Link>
            </li>
          ))}
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
      </nav>
    </header>
  )
}
