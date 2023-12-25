'use-client'

import clsx from 'clsx'
import Link from 'next/link'
import {
  GitHubLogoIcon,
  DiscordLogoIcon,
  TwitterLogoIcon,
  HamburgerMenuIcon
} from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'
import { projectSocials } from '#lib/constants/routes.ts'
import { DropdownMenu, IconButton, Button, Flex, Link as RadixLink } from '@radix-ui/themes'

export const emojis = {
  home: '🏠',
  profile: '👤',
  leaderboard: '🏆',
  settings: '⚙️',
  bug: '🐛'
} satisfies Record<string, string>

export const projectLinkIcons = {
  GitHub: () => (
    <IconButton size='1' variant='outline' className='shadow-none'>
      <GitHubLogoIcon width='28' height='28' className='text-black' />
    </IconButton>
  ),

  X: () => (
    <IconButton size='1' variant='outline' className='shadow-none'>
      <TwitterLogoIcon width='28' height='28' className='text-black' />
    </IconButton>
  ),

  Discord: () => (
    <IconButton size='1' variant='outline' className='shadow-none'>
      <DiscordLogoIcon width='28' height='28' className='text-black' />
    </IconButton>
  )
}

const APP_VERSION = (
  process.env['NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA'] || process.env['APP_VERSION']
)?.slice(0, 7)

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
  const pathname = usePathname()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton
          variant='soft'
          color='gray'
          className='bg-white hover:cursor-pointer hover:opacity-100'
          radius='large'
          size={'3'}
        >
          <HamburgerMenuIcon color='gray' />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <Flex my={'1'} gap={'2'} mx={'auto'}>
          <Button
            color='pink'
            className='bg-gradient-to-b from-yellow-300 to-pink-400 text-white'
            variant='classic'
            radius='full'
            size={'2'}
          >
            Cool
          </Button>
          <Button
            color='gray'
            variant='classic'
            className='bg-white text-gray-600'
            radius='full'
            size={'2'}
          >
            Lame
          </Button>
        </Flex>

        {navItems.map((route, index) => (
          <DropdownMenu.Item
            asChild
            className={clsx([
              'my-0.5 flex capitalize lg:hidden',
              pathname === route.href ? 'bg-pink-400 text-white' : ''
            ])}
            key={`route-${index}`}
          >
            <Link prefetch href={route.href}>
              {route.name}
              <span>{emojis[route.name.toLowerCase() as keyof typeof emojis] || route.emoji}</span>
            </Link>
          </DropdownMenu.Item>
        ))}
        <DropdownMenu.Separator className='block lg:hidden' />

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>List #2,932</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>List #3</DropdownMenu.Item>
            <DropdownMenu.Item>List #2,932</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.Item asChild>
          <Link prefetch href='/team'>
            Team
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item asChild>
          <a href='https://docs.ethfollow.xyz' target='_blank' rel='noopener noreferrer'>
            <span className='text-sm pr-4'>Docs</span>
            <span className='text-xl'>📚</span>
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <a
            href='https://github.com/ethereumfollowprotocol/app'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='text-sm pr-4'>Contribute</span>
            <span className='text-xl'>🤝</span>
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
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
                key={`link-${index}`}
                radius='full'
                variant='soft'
                className='bg-transparent text-black hover:bg-pink-200'
                asChild
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
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
