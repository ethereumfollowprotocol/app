'use-client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { pageRoutes } from '#lib/constants.ts'
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  HamburgerMenuIcon,
  TwitterLogoIcon
} from '@radix-ui/react-icons'
import { DropdownMenu, IconButton, Button, Flex } from '@radix-ui/themes'

export const emojis = {
  home: '🏠',
  profile: '👤',
  leaderboard: '🏆',
  settings: '⚙️',
  bug: '🐛'
} satisfies Record<string, string>

export const projectLinkItems = [
  {
    text: 'GitHub',
    href: 'https://github.com/ethereumfollowprotocol',
    icon: () => (
      <IconButton size='1' variant='outline' className='shadow-none'>
        <GitHubLogoIcon width='28' height='28' className='text-black' />
      </IconButton>
    )
  },
  {
    text: 'X',
    href: 'https://x.com/ethfollowpr',
    icon: () => (
      <IconButton size='1' variant='outline' className='shadow-none'>
        <TwitterLogoIcon width='28' height='28' className='text-black' />
      </IconButton>
    )
  },
  /**
   * TODO: add Discord link once we have one
   */
  {
    text: 'Discord',
    href: 'https://docs.ethfollow.xyz',
    icon: () => (
      <IconButton size='1' variant='outline' className='shadow-none'>
        <DiscordLogoIcon width='28' height='28' className='text-black' />
      </IconButton>
    )
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

        {pageRoutes.map((route, index) => {
          return (
            <DropdownMenu.Item
              asChild
              className={clsx([
                'my-0.5 flex capitalize sm:hidden',
                pathname === route.href ? 'bg-orange-500 text-white' : ''
              ])}
              key={`route-${index}`}
            >
              <Link prefetch href={route.href}>
                {route.text}
                <span>{emojis[route.text.toLowerCase() as keyof typeof emojis]}</span>
              </Link>
            </DropdownMenu.Item>
          )
        })}
        <DropdownMenu.Separator className='block sm:hidden' />

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
          <a
            href='https://github.com/ethereumfollowprotocol/app'
            target='_blank'
            rel='noopener noreferrer'
          >
            Contribute
            <IconButton size='1' variant='outline' className='shadow-none'>
              <GitHubLogoIcon width='20' height='20' className='text-black' />
            </IconButton>
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item shortcut={emojis['bug']} asChild>
          <a
            href='https://github.com/ethereumfollowprotocol/app/issues/new'
            target='_blank'
            rel='noopener noreferrer'
          >
            Report a bug
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className='bg-transparent'>
          {projectLinkItems.map((link, index) => {
            return (
              <IconButton
                key={`link-${index}`}
                radius='full'
                variant='soft'
                className='bg-transparent text-black hover:bg-pink-200'
                asChild
              >
                <a href={link.href} target='_blank' rel='noopener noreferrer'>
                  <link.icon />
                </a>
              </IconButton>
            )
          })}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
