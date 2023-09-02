interface PageRoute {
  href: string
  text: string | Record<string, unknown>
  hidden?: boolean
}

export const pageRoutes = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/profile',
    text: 'My Profile',
  },
  {
    href: '/leaderboard',
    text: 'Leaderboard',
  },
] satisfies ReadonlyArray<PageRoute>
