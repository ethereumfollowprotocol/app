interface PageRoute {
  href: string
  text: string | Record<string, unknown>
  hidden?: boolean
}

export const pageRoutes = [
  {
    href: '/',
    text: 'home',
  },
  {
    href: '/profile',
    text: 'profile',
  },
  {
    href: '/leaderboard',
    text: 'leaderboard',
  },
] satisfies ReadonlyArray<PageRoute>
