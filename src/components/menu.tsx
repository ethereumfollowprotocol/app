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
        {/* <div className='flex gap-2 my-1 mx-auto'>
          <button
            className='bg-gradient-to-b from-yellow-300 to-pink-400 text-white p-4'
          >
            Cool
          </button>
          <button
            color='gray'
            variant='classic'
            className='bg-white text-gray-600'
            radius='full'
            size={'2'}
          >
            Lame
          </button>
        </div> */}

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
        {/* <div>
          <Link href='/onboarding'>Get started</Link>
        </div>
        <hr />
        <div>
          <DropdownMenu.SubTrigger>List #2,932</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>List #3</DropdownMenu.Item>
            <DropdownMenu.Item>List #2,932</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </div>
        <DropdownMenu.Separator />
        <DropdownMenu.Item asChild={true}>
          <Link prefetch={true} href='/team'>
            Team
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item asChild={true}>
          <a href='https://docs.ethfollow.xyz' target='_blank' rel='noopener noreferrer'>
            <span className='text-sm pr-4'>Docs</span>
            <span className='text-xl'>📚</span>
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild={true}>
          <a
            href='https://github.com/ethereumfollowprotocol/app'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='text-sm pr-4'>Contribute</span>
            <span className='text-xl'>🤝</span>
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild={true}>
          <a
            href='https://github.com/ethereumfollowprotocol/app/issues/new'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='text-sm pr-4'>Report a bug</span>
            <span className='text-xl'>🐛</span>
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className='bg-transparent'>
          {projectSocials.map((link, index) => {
            return (
              <IconButton
                key={`link-${link.name}`}
                radius='full'
                variant='soft'
                className='bg-transparent text-black hover:bg-pink-200'
                asChild={true}
              >
                <a
                  href={link.href}
                  target={link.external === true ? '_blank' : '_self'}
                  rel='noopener noreferrer'
                >
                  {projectLinkIcons[link.name]()}
                </a>
              </IconButton>
            )
          })}
        </DropdownMenu.Item>
        <DropdownMenu.Item className='p-0 hover:bg-transparent'>
          <RadixLink
            size='1'
            mx='auto'
            color='gray'
            weight='medium'
            underline='always'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-black'
            href={`https://github.com/ethereumfollowprotocol/app/tree/${APP_VERSION}`}
          >
            {APP_VERSION}
          </RadixLink>
        </DropdownMenu.Item> */}
      </div>
    </div>
  )
}
