import { pageRoutes } from '#/lib/constants.ts'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { DropdownMenu, IconButton } from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const emojis = {
  home: '🏠',
  profile: '👤',
  leaderboard: '🏆',
  settings: '⚙️',
} satisfies Record<string, string>

export function Menu() {
  const pathname = usePathname()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton
          variant='soft'
          color='gray'
          size={'3'}
        >
          <HamburgerMenuIcon color='gray' />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {pageRoutes.map((route, index) => {
          return (
            <DropdownMenu.Item
              color={pathname === route.href ? 'blue' : 'gray'}
              asChild
              className='capitalize'
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
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut='⌘ N'>Archive</DropdownMenu.Item>

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
            <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />
        <DropdownMenu.Item>Share</DropdownMenu.Item>
        <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          shortcut='⌘ ⌫'
          color='red'
        >
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
