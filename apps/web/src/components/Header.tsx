'use client'

import clsx from 'clsx'
import { Menu } from '#/components/Menu'
import { Search } from '#/components/Search'
import { CartButton } from '#/components/cart-button.tsx'
import { ConnectKitButton } from 'connectkit'
import { usePathname } from 'next/navigation'
import { Text, Avatar } from '@radix-ui/themes'
import { pageRoutes } from '#/lib/constants.ts'

export function Header() {
  const pathname = usePathname()

  return (
    <header className={clsx(['w-full px-2.5 font-sans sm:px-3 md:px-4 lg:px-5 xl:px-6'])}>
      <nav className='w-full flex flex-row justify-between my-auto'>
        <div className={clsx(['flex space-x-3 pr-3 my-auto w-full items-center'])}>
          <a
            href='/'
            className='mb-3.5'
          >
            <Avatar
              size={'4'}
              src='/assets/logo.png'
              fallback='EFP'
            />
          </a>
          <Text
            className={clsx(['w-22 mx-auto h-20 text-pink-400 font-bold !leading-4 pt-4'])}
            trim={'both'}
            weight={'bold'}
            size={{
              initial: '1',
              sm: '1',
              md: '3',
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
            'my-auto flex space-x-0 text-lg font-semibold px-2.25 py-0.15',
            'sm:space-x-3 sm:p-0 sm:bg-transparent',
            'hidden sm:flex',
          ])}
        >
          {pageRoutes.map((route, index) => (
            <li
              className='inline font-bold'
              key={`route-${index}`}
            >
              <a
                href={route.href}
                className={clsx([
                  'capitalize',
                  pathname === route.href ? 'text-black' : 'text-pink-400',
                ])}
              >
                <span className={clsx(['hidden', 'sm:block'])}>{route.text}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className='my-auto mx-4 pb-0.5'>
          <CartButton />
        </div>
        <div className={clsx(['my-auto flex items-center pb-1'])}>
          <ConnectKitButton />
        </div>
        <div className='my-auto pl-2.5 pb-0.5'>
          <Menu />
        </div>
      </nav>
    </header>
  )
}
