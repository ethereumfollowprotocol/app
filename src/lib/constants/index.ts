import type { FollowSortType } from '#/types/requests'
import type { ProfileTableTitleType, ProfileTabType } from '#/types/common'

import FireEmoji from 'public/assets/icons/fire.svg'
import EyesEmoji from 'public/assets/icons/eyes.svg'
import GithubIcon from 'public/assets/icons/github.svg'
import DiscordIcon from 'public/assets/icons/discord.svg'
import TwitterIcon from 'public/assets/icons/twitter.svg'
import HuggingEmoji from 'public/assets/icons/hugging.svg'
import TelegramIcon from 'public/assets/icons/telegram.svg'
import StarEyesEmoji from 'public/assets/icons/star-eyes.svg'
import EtherscanIcon from 'public/assets/icons/etherscan.svg'
import PirateFlagEmoji from 'public/assets/icons/pirate-flag.svg'
import GithubIconLight from 'public/assets/icons/github-white.svg'
import EtherscanIconLight from 'public/assets/icons/etherscan-light.svg'

export const APP_NAME = 'Ethereum Follow Protocol'
export const APP_NAME_SHORT = 'EFP'
export const APP_DESCRIPTION =
  'A native Ethereum protocol for following and tagging Ethereum accounts.'
export const APP_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4321'

export const ENS_SUBGRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${process.env.NEXT_PUBLIC_ENS_SUBGRAPH_API_KEY}/subgraphs/id/5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH`

export const FETCH_LIMIT_PARAM = 12
export const LEADERBOARD_FETCH_LIMIT_PARAM = 60
export const LEADERBOARD_CHUNK_SIZE = 20
export const RECOMMENDED_PROFILES_LIMIT = 10
export const SECOND = 1_000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const WEEK = 7 * DAY

export const PROFILE_TABS: ProfileTabType[] = ['following', 'followers']
export const BLOCKED_MUTED_TABS: ProfileTableTitleType[] = ['Blocked/Muted', 'Blocked/Muted By']

export const DEFAULT_TAGS_TO_ADD = ['irl', 'bff', 'based', 'degen', 'top8']
export const DEFAULT_TAGS = ['no tag']
export const BLOCKED_MUTED_TAGS = ['block', 'mute']
export const SORT_OPTIONS: FollowSortType[] = ['follower count', 'latest first', 'earliest first']

export const NAV_ITEMS = [
  {
    href: () => '/',
    name: 'home',
    hiddenOnDesktop: true
  },
  {
    href: (url?: string) => `/${url ?? 'profile'}`,
    name: 'profile',
    hiddenOnDesktop: true
  },
  // {
  //   href: () => '/feed',
  //   name: 'feed',
  // },
  {
    href: () => '/leaderboard',
    name: 'leaderboard',
    hiddenOnDesktop: true
  }
]

export const EXTERNAL_LINKS = [
  {
    text: 'about',
    href: '/about',
    target: ''
  },
  {
    text: 'docs',
    href: 'https://docs.ethfollow.xyz/intro',
    target: '_blank'
  },
  {
    text: 'faq',
    href: 'https://docs.ethfollow.xyz/faq',
    target: '_blank'
  },
  {
    text: 'bug bounty',
    href: 'https://docs.ethfollow.xyz/bugbounty',
    target: '_blank'
  },
  {
    text: 'team',
    href: '/team',
    target: ''
  }
]

export const leaderboardFilters = ['mutuals', 'followers', 'following', 'top8', 'blocked'] as const
export const leaderboardFiltersEmojies = [
  HuggingEmoji,
  StarEyesEmoji,
  EyesEmoji,
  FireEmoji,
  PirateFlagEmoji
] as const

const DARK_ICON_THEME = ['dark', 'halloween'] as const

export const profileCardSocials = [
  {
    name: 'etherscan',
    url: (address: string) => `https://etherscan.io/address/${address}`,
    icon: (theme: string) => (DARK_ICON_THEME.includes(theme) ? EtherscanIconLight : EtherscanIcon)
  },
  {
    name: 'com.twitter',
    url: (username: string) => `https://twitter.com/${username}`,
    icon: (theme: string) => (DARK_ICON_THEME.includes(theme) ? TwitterIcon : TwitterIcon)
  },
  {
    name: 'com.github',
    url: (username: string) => `https://github.com/${username}`,
    icon: (theme: string) => (DARK_ICON_THEME.includes(theme) ? GithubIconLight : GithubIcon)
  },
  {
    name: 'org.telegram',
    url: (username: string) => `https://t.me/${username}`,
    icon: (theme: string) => (DARK_ICON_THEME.includes(theme) ? TelegramIcon : TelegramIcon)
  },
  {
    name: 'com.discord',
    url: (username: string) => `https://discord.com/users/${username}`,
    icon: (theme: string) => (DARK_ICON_THEME.includes(theme) ? DiscordIcon : DiscordIcon)
  }
] as const
