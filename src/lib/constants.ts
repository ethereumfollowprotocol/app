// import { env } from '#lib/environment'

export const APP_NAME = 'EFP'
export const APP_DESCRIPTION = 'Ethereum Follow Protocol'
export const APP_URL =
  process.env['NEXT_PUBLIC_VERCEL_URL'] ||
  process.env['NEXT_PUBLIC_SITE_URL'] ||
  'http://localhost:4321'

interface ProjectLink {
  href: string
  text: string
}

export const projectLinks = [
  {
    text: 'Docs',
    href: 'https://docs.ethfollow.xyz',
  },
  /**
   * TODO: update with proper link
   */
  {
    text: 'Team',
    href: 'https://github.com/orgs/ethereumfollowprotocol/people',
  },
  {
    text: 'GitHub',
    href: 'https://github.com/ethereumfollowprotocol',
  },
  {
    text: 'X',
    href: 'https://x.com/ethfollowpr',
  },
  /**
   * TODO: add Discord link once we have one
   */
  {
    text: 'Discord',
    href: 'https://x.com/ethfollowpr',
  },
] satisfies ReadonlyArray<ProjectLink>

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

export const chains = ['mainnet', 'optimism', 'arbitrum', 'polygon', 'zkSync'] as const

export type Chain = (typeof chains)[number]

export interface EVMTransport {
  chain: Chain
  name: string
  url: string
}

export const mainnetTransports = [
  {
    name: 'Alchemy Mainnet',
    chain: 'mainnet',
    url: `https://eth-mainnet.alchemyapi.io/v2/${process.env['NEXT_PUBLIC_ALCHEMY_ID']}`,
  },
  {
    name: 'LlamaNodes',
    chain: 'mainnet',
    url: `https://eth.llamarpc.com/rpc/${process.env['NEXT_PUBLIC_LLAMAFOLIO_ID']}`,
  },
] satisfies ReadonlyArray<EVMTransport>

export const evmTransports = [...mainnetTransports] satisfies ReadonlyArray<EVMTransport>
