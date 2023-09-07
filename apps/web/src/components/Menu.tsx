import clsx from 'clsx'
import Link from 'next/link'
import { useCurrentLocale, useI18n } from '#/locales/client'
import { usePathname } from 'next/navigation'
import { pageRoutes, projectLinks } from '#/lib/constants.ts'
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  HamburgerMenuIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons'
import { DropdownMenu, IconButton, Button, Flex } from '@radix-ui/themes'

export const emojis = {
  home: '🏠',
  profile: '👤',
  leaderboard: '🏆',
  settings: '⚙️',
  bug: '🐛',
} satisfies Record<string, string>

export const projectLinkIcons = {
  GitHub: GitHubLogoIcon,
  Discord: DiscordLogoIcon,
  X: TwitterLogoIcon,
}

export function Menu() {
  const t = useI18n()
  const currentLocale = useCurrentLocale()
  const pathname = usePathname()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton
          variant='soft'
          radius='large'
          size={'3'}
        >
          <HamburgerMenuIcon color='gray' />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <Flex
          my={'1'}
          gap={'2'}
          mx={'auto'}
        >
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
                'capitalize my-0.5 sm:hidden flex',
                pathname === route.href ? 'bg-orange-500 text-white' : '',
              ])}
              key={`route-${index}`}
            >
              <Link
                prefetch
                href={route.href}
              >
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
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>English</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item
              className={
                currentLocale === 'en' ? 'underline decoration-pink-300 decoration-4 font-bold' : ''
              }
            >
              English
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item asChild>
              <a
                href='https://github.com/ethereumfollowprotocol/app'
                target='_blank'
                rel='noopener noreferrer'
              >
                {t('CONTRIBUTE')}
                <GitHubLogoIcon className='ml-2.5' />
              </a>
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />
        <DropdownMenu.Item
          shortcut={emojis['bug']}
          asChild
        >
          <a
            href='https://github.com/ethereumfollowprotocol/app/issues/new'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t('REPORT_BUG')}
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className='bg-transparent'>
          {projectLinks.map((link, index) => {
            const Icon = projectLinkIcons[link.text as keyof typeof projectLinkIcons]
            return (
              <IconButton
                key={`link-${index}`}
                radius='full'
                variant='soft'
                className='text-black bg-transparent hover:bg-pink-200'
                asChild
              >
                <a
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Icon />
                </a>
              </IconButton>
            )
          })}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
