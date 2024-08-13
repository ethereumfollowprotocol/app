import type { FollowSortType } from '#/types/requests'
import type { ProfileTableTitleType, ProfileTabType } from '#/types/common'

import SloveniaFlag from 'public/assets/icons/flags/slovenia.png'
import USAFlag from 'public/assets/icons/flags/united-states-of-america.png'

export const APP_NAME = 'Ethereum Follow Protocol'
export const APP_NAME_SHORT = 'EFP'
export const APP_DESCRIPTION =
  'A native Ethereum protocol for following and tagging Ethereum accounts.'
export const APP_URL =
  process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4321'

export const ENS_SUBGRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${process.env.NEXT_PUBLIC_ENS_SUBGRAPH_API_KEY}/subgraphs/id/5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH`

export const FETCH_LIMIT_PARAM = 20
export const LEADERBOARD_FETCH_LIMIT_PARAM = 100

export const SECOND = 1_000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const WEEK = 7 * DAY

export const PROFILE_TABS: ProfileTabType[] = ['following', 'followers']
export const BLOCKED_MUTED_TABS: ProfileTableTitleType[] = ['Blocked/Muted', 'Blocked/Muted By']

export const LANGUAGES = [
  { language: 'English', key: 'en', icon: USAFlag },
  { language: 'Slovenščina', key: 'si', icon: SloveniaFlag }
]

export const DEFAULT_TAGS_TO_ADD = ['crypto', 'friend', 'family', 'irl', 'work']
export const DEFAULT_TAGS = ['no tag']
export const BLOCKED_MUTED_TAGS = ['block', 'mute']
export const SORT_OPTIONS: FollowSortType[] = ['latest first', 'earliest first', 'follower count']

export const NAV_ITEMS = [
  {
    href: () => '/',
    emoji: '🏠',
    name: 'home',
    private: false
  },
  {
    href: (url?: string) => `/${url ?? ''}`,
    emoji: '👤',
    name: 'profile',
    private: true
  },
  {
    href: () => '/leaderboard',
    emoji: '🏆',
    name: 'leaderboard',
    private: false
  }
]

export const leaderboardFilters = ['mutuals', 'followers', 'following', 'blocked'] as const
export const leaderboardFiltersEmojies = ['🫂', '🤩', '👀', '🚫'] as const
