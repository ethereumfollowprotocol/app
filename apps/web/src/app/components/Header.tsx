'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { ConnectKitButton } from 'connectkit'
import { usePathname } from 'next/navigation'
import { pageRoutes } from '#/lib/constants.ts'

export function Header() {
  const pathname = usePathname()

  return (
    <header className={clsx(['w-full px-2.5 font-sans sm:px-3 md:px-4 lg:px-5 xl:px-6'])}>
      <nav className='w-full flex justify-between'>
        <div className={clsx(['flex space-x-3 my-auto w-full'])}>
          <a
            href='/'
            className='mt-3 w-15 h-15'
          >
            <Image
              alt='EFP Logo'
              src='/assets/logo.png'
              className='w-12'
            />
          </a>
          <p className={clsx(['w-20 h-20 text-pink-400 text-lg font-bold leading-4 pt-4'])}>
            Ethereum <br />
            Follow <br />
            Protocol
          </p>
        </div>
        <ul
          className={clsx([
            'my-auto flex space-x-0 text-lg font-semibold px-2.25 py-0.15',
            'sm:space-x-3 sm:p-0 sm:bg-transparent sm:pr-5',
          ])}
        >
          {pageRoutes.map((route, index) => (
            <li
              className='inline'
              key={`route-${index}`}
            >
              <a
                href={route.href}
                className={clsx([
                  'capitalize',
                  pathname === route.href ? 'text-black' : 'text-pink-400',
                ])}
              >
                <span className={clsx(['hidden mb-2', 'md:block'])}>{route.text}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className={clsx(['my-auto flex items-center pl-2 pb-2.5'])}>
          <ConnectKitButton />
        </div>
      </nav>
    </header>
  )
}
