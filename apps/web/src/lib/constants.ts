export const APP_NAME = 'EFP'
export const APP_DESCRIPTION = 'Ethereum Follow Protocol'
export const APP_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://efp.vercel.app'

interface ProjectLink {
  href: string
  text: string
}

export const projectLinks = [
  {
    text: 'docs',
    // TODO: update this link once we have docs
    href: 'https://github.com/ethereumfollowprotocol',
  },
  {
    text: 'team',
    href: 'https://github.com/orgs/ethereumfollowprotocol/people',
  },
  {
    text: 'X',
    href: 'https://x.com/ethfollowpr',
  },
  /**
   * TODO: add Discord link once we have one
   */
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
    url: process.env.NEXT_PUBLIC_ALCHEMY_ID,
  },
  {
    name: 'LlamaNodes',
    chain: 'mainnet',
    url: 'https://rpc.llama.fi/mainnet',
  },
] satisfies ReadonlyArray<EVMTransport>

export const evmTransports = [...mainnetTransports] satisfies ReadonlyArray<EVMTransport>
