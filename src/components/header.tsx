'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { Text } from '@radix-ui/themes'
import { Menu } from '#components/menu.tsx'
import { Search } from '#components/search'
import { ConnectKitButton } from 'connectkit'
import { usePathname } from 'next/navigation'
import { pageRoutes } from '#lib/constants.ts'
import { CartButton } from '#components/cart-button.tsx'

export function Header() {
  const pathname = usePathname()

  return (
    <header className={clsx(['w-full px-2.5 font-sans sm:px-3 md:px-4 lg:px-5 xl:px-6'])}>
      <nav className='my-auto flex w-full flex-row justify-between'>
        <div className={clsx(['my-auto flex w-full items-center space-x-3 pr-3'])}>
          <a
            href='/'
            className='mb-3.5'
          >
            <Image
              src='/assets/logo.png'
              width={58}
              height={58}
              alt='Ethereum Follow Protocol'
            />
          </a>
          <Text
            className={clsx(['w-22 mx-auto h-20 pt-4 font-bold !leading-4 text-pink-400'])}
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
            'px-2.25 py-0.15 my-auto flex space-x-0 text-lg font-semibold',
            'sm:space-x-3 sm:bg-transparent sm:p-0',
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
        <div className='mx-4 my-auto pb-0.5'>
          <CartButton cartItemsCount={24} />
        </div>
        <div className={clsx(['my-auto flex items-center pb-1'])}>
          <ConnectKitButton />
        </div>
        <div className='my-auto pb-0.5 pl-2.5'>
          <Menu />
        </div>
      </nav>
    </header>
  )
}
