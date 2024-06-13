'use-client'

import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export const emojis = {
  home: '🏠',
  profile: '👤',
  leaderboard: '🏆',
  settings: '⚙️',
  bug: '🐛'
}

// const APP_VERSION = (
//   process.env['NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA'] || process.env['APP_VERSION']
// )?.slice(0, 7)

const navItems = [
  {
    href: '/',
    emoji: '🏠',
    name: 'home',
    external: false,
    displayLocation: 'header'
  },
  {
    href: '/profile',
    emoji: '👤',
    name: 'profile',
    private: true,
    external: false,
    displayLocation: 'header'
  },
  {
    href: '/leaderboard',
    emoji: '🏆',
    name: 'leaderboard',
    external: false,
    displayLocation: 'header'
  }
]

export function Menu() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className='relative'>
      <div>
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className=' flex flex-col items-center justify-center'
        >
          <div className='bg-black w-4 h-1 rounded-xl'></div>
          <div className='bg-black w-4 h-1 rounded-xl'></div>
          <div className='bg-black w-4 h-1 rounded-xl'></div>
        </div>
      </div>
      <div className='absolute top-full mt-2 left-0'>
        {navItems.map((route, index) => (
          <div
            className={clsx([
              'my-0.5 flex capitalize lg:hidden',
              pathname === route.href ? 'bg-pink-400 text-white' : ''
            ])}
            key={`route-${route.name}`}
          >
            <Link prefetch={true} href={route.href}>
              {route.name}
              <span>{emojis[route.name.toLowerCase() as keyof typeof emojis] || route.emoji}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
