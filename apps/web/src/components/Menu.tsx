import { pageRoutes } from '#/lib/constants.ts'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { DropdownMenu, IconButton, Button, Flex } from '@radix-ui/themes'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const emojis = {
  home: '🏠',
  profile: '👤',
  leaderboard: '🏆',
  settings: '⚙️',
  bug: '🐛',
} satisfies Record<string, string>

export function Menu() {
  const pathname = usePathname()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton
          variant='soft'
          // color='gray'
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
            color='orange'
            variant='outline'
            radius='full'
            size={'2'}
          >
            Cool
          </Button>
          <Button
            color='gray'
            variant='outline'
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
            <DropdownMenu.Item>Lorem…</DropdownMenu.Item>
            <DropdownMenu.Item>Ipsum…</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item>Dolor…</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut={emojis['bug']}>Report bug</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
