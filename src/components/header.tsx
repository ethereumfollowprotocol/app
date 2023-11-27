'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { Menu } from '#components/menu.tsx'
import { usePathname } from 'next/navigation'
import { pageRoutes } from '#lib/constants.ts'
import { useAccount, useEnsName } from 'wagmi'
import { Search } from '#components/search.tsx'
import { Avatar, Text } from '@radix-ui/themes'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { CartButton } from '#components/cart-button.tsx'

export function Header() {
  const pathname = usePathname()

  const account = useAccount()
  const {
    data: ensName,
    error: ensError,
    status: ensStatus
  } = useEnsName({ address: account.address, cacheTime: 4206942069 })
  return (
    <header className={clsx(['w-full px-2.5 font-sans sm:px-3 md:px-4 lg:px-5 xl:px-6'])}>
      <nav className='my-auto flex w-full flex-row justify-between'>
        <div className={clsx(['my-auto flex w-full items-center space-x-3 pr-3'])}>
          <Link href='/' className='select-none'>
            <Avatar
              src='/assets/logo.png'
              fallback=''
              radius='full'
              size='5'
              mb='1'
              className='select-none'
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
            'px-2.25 py-0.15 my-auto flex space-x-0 text-lg font-semibold mx-2',
            'sm:space-x-5 sm:bg-transparent sm:p-0',
            'hidden md:flex'
          ])}
        >
          {pageRoutes.map((route, index) => (
            <li className='inline font-bold' key={`route-${index}`}>
              <Link
                passHref
                href={route.href}
                className={clsx([
                  'capitalize',
                  pathname === route.href ? 'text-black' : 'text-pink-400'
                ])}
              >
                <span className={clsx(['hidden', 'sm:block'])}>{route.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className='my-auto ml-2 pb-0.5'>
          <CartButton cartItemsCount={24} />
        </div>
        <div
          className={clsx([
            'my-auto flex items-center justify-end pb-1 w-72 max-w-context text-sm'
          ])}
        >
          <ConnectButton
            showBalance={false}
            chainStatus={'none'}
            label='Connect'
            accountStatus={ensName ? 'full' : 'address'}
          />
        </div>
        <div className='my-auto pb-0.5 pl-2.5'>
          <Menu />
        </div>
      </nav>
    </header>
  )
}
