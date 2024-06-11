import type { Address } from 'viem'
import type { ProfileTabType } from '#/types/common'

export const APP_NAME = 'Ethereum Follow Protocol'
export const APP_NAME_SHORT = 'EFP'
export const APP_DESCRIPTION =
  'A native Ethereum protocol for following and tagging Ethereum accounts.'
export const APP_URL =
  process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4321'

export const ENS_SUBGRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${process.env.NEXT_PUBLIC_ENS_SUBGRAPH_API_KEY}/subgraphs/id/5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH`

export const teamAddresses: Address[] = [
  '0x983110309620D911731Ac0932219af06091b6744',
  '0xC983Ebc9dB969782D994627bdfFeC0ae6efee1b3'
]

export const FETCH_LIMIT_PARAM = 10

export const SECOND = 1_000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const WEEK = 7 * DAY

export const PROFILE_TABS: ProfileTabType[] = ['following', 'followers']
export const LANGUAGES = [
  { language: 'English', key: 'en' },
  { language: 'Slovenščina', key: 'si' }
]
export const DEFAULT_TAGS_TO_ADD = ['blocked', 'muted']
export const DEFAULT_TAGS = ['no tag', 'blocked', 'muted']
export const SORT_OPTIONS = ['follower count', 'latest first', 'earliest first', 'alphabetical']

export const NAV_ITEMS = [
  {
    href: '/',
    emoji: '🏠',
    name: 'home',
    private: false
  },
  {
    href: '/profile',
    emoji: '👤',
    name: 'profile',
    private: true
  },
  {
    href: '/leaderboard?filter=followers',
    emoji: '🏆',
    name: 'leaderboard',
    private: false
  }
]
