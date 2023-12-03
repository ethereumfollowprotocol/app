export const projectSocials = [
  {
    name: 'GitHub',
    emoji: '🐙',
    href: 'https://github.com/ethereumfollowprotocol',
    external: true
  },
  {
    name: 'X',
    emoji: '🐦',
    href: 'https://x.com/ethfollowpr',
    external: true
  },
  {
    name: 'Discord',
    emoji: '💬',
    href: 'https://discord.ethfollow.xyz',
    external: true
  }
] as const

interface Route {
  href: string
  emoji?: string
  name: string | Record<string, unknown>
  private?: boolean
  external: boolean
  displayLocation: 'header' | 'footer' | String
}

export const pageRoutes = [
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
  },
  {
    name: 'Docs',
    emoji: '📚',
    href: 'https://docs.ethfollow.xyz',
    external: true,
    displayLocation: 'footer'
  },
  {
    name: 'Team',
    emoji: '👨‍👩‍👧',
    href: '/team',
    external: false,
    displayLocation: 'footer'
  }
] satisfies ReadonlyArray<Route>
