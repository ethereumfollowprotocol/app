export const APP_NAME = 'EFP'
export const APP_DESCRIPTION = 'Ethereum Follow Protocol'
export const APP_URL =
  process.env['NEXT_PUBLIC_VERCEL_URL'] ||
  process.env['NEXT_PUBLIC_SITE_URL'] ||
  'http://localhost:4321'

export const ENS_SUBGRAPH = `https://api.thegraph.com/subgraphs/name/ensdomains/ens`

interface ProjectLink {
  href: string
  text: string
}

export const projectLinks = [
  {
    text: 'Docs',
    href: 'https://docs.ethfollow.xyz'
  },
  /**
   * TODO: update with proper link
   */
  {
    text: 'Team',
    href: 'https://github.com/orgs/ethereumfollowprotocol/people'
  },
  {
    text: 'GitHub',
    href: 'https://github.com/ethereumfollowprotocol'
  },
  {
    text: 'X',
    href: 'https://x.com/ethfollowpr'
  },
  /**
   * TODO: add Discord link once we have one
   */
  {
    text: 'Discord',
    href: 'https://x.com/ethfollowpr'
  }
] satisfies ReadonlyArray<ProjectLink>

interface PageRoute {
  href: string
  text: string | Record<string, unknown>
  public: boolean
}

export const pageRoutes = [
  {
    href: '/',
    text: 'home',
    public: true
  },
  {
    href: '/profile',
    text: 'profile',
    public: false
  },
  {
    href: '/leaderboard',
    text: 'leaderboard',
    public: true
  }
] satisfies ReadonlyArray<PageRoute>

export const chains = ['mainnet', 'optimism', 'arbitrum', 'polygon', 'zkSync'] as const

export type Chain = (typeof chains)[number]
