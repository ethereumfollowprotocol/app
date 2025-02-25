import type { FollowSortType } from '#/types/requests'
import type { ProfileTableTitleType, ProfileTabType } from '#/types/common'

import HomeIcon from 'public/assets/icons/ui/home.svg'
import SwipeIcon from 'public/assets/icons/ui/swipe.svg'
import PersonIcon from 'public/assets/icons/ui/person.svg'
import FireEmoji from 'public/assets/icons/emojis/fire.svg?url'
import EyesEmoji from 'public/assets/icons/emojis/eyes.svg?url'
import GithubIcon from 'public/assets/icons/socials/github.svg?url'
import DiscordIcon from 'public/assets/icons/socials/discord.svg?url'
import TwitterIcon from 'public/assets/icons/socials/twitter.svg?url'
import HuggingEmoji from 'public/assets/icons/emojis/hugging.svg?url'
import TelegramIcon from 'public/assets/icons/socials/telegram.svg?url'
import StarEyesEmoji from 'public/assets/icons/emojis/star-eyes.svg?url'
import LeaderboardIcon from 'public/assets/icons/ui/leaderboard.svg'
import EtherscanIcon from 'public/assets/icons/socials/etherscan.svg?url'
import PirateFlagEmoji from 'public/assets/icons/flags/pirate-flag.svg?url'
import GithubIconLight from 'public/assets/icons/socials/github-white.svg?url'
import EtherscanIconLight from 'public/assets/icons/socials/etherscan-light.svg?url'

export const APP_NAME = 'Ethereum Follow Protocol'
export const APP_NAME_SHORT = 'EFP'
export const APP_DESCRIPTION = 'A native Ethereum protocol for following and tagging Ethereum accounts.'
export const APP_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4321'
export const ENS_SUBGRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${process.env.NEXT_PUBLIC_ENS_SUBGRAPH_API_KEY}/subgraphs/id/5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH`

export const DEFAULT_AVATAR_URL = 'https://efp.app/assets/art/default-avatar.svg'

export const FETCH_LIMIT_PARAM = 12
export const LEADERBOARD_CHUNK_SIZE = 20
export const RECOMMENDED_PROFILES_LIMIT = 10
export const LEADERBOARD_FETCH_LIMIT_PARAM = 60

export const SECOND = 1_000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR

export const PROFILE_TABS: ProfileTabType[] = ['following', 'followers']
export const BLOCKED_MUTED_TABS: ProfileTableTitleType[] = ['Blocked/Muted', 'Blocked/Muted By']

export const DEFAULT_TAGS = ['no tag']
export const BLOCKED_MUTED_TAGS = ['block', 'mute']
export const DEFAULT_TAGS_TO_ADD = ['irl', 'bff', 'based', 'degen', 'top8']

export const SORT_OPTIONS: FollowSortType[] = ['follower count', 'latest first', 'earliest first']

export const EARLY_POAP_EVENT_IDS = ['178066', '183182']

export const NAV_ITEMS = [
  {
    href: () => '/',
    name: 'home',
    icon: HomeIcon,
    hiddenOnDisconnected: false,
  },
  {
    href: (url?: string) => `/${url ?? 'profile'}`,
    name: 'profile',
    icon: PersonIcon,
    hiddenOnDisconnected: true,
  },
  {
    href: () => '/swipe',
    name: 'swipe',
    icon: SwipeIcon,
    hiddenOnDisconnected: true,
  },
  {
    href: () => '/leaderboard',
    name: 'leaderboard',
    icon: LeaderboardIcon,
    hiddenOnDisconnected: false,
  },
]

export const EXTERNAL_LINKS = [
  // {
  //   text: 'about',
  //   href: '/about',
  //   target: '',
  // },
  {
    text: 'docs',
    href: 'https://docs.efp.app/intro',
    target: '_blank',
  },
  {
    text: 'faq',
    href: 'https://docs.efp.app/faq',
    target: '_blank',
  },
  {
    text: 'bug bounty',
    href: 'https://docs.efp.app/bugbounty',
    target: '_blank',
  },
  {
    text: 'team',
    href: '/team',
    target: '',
  },
]

export const leaderboardFilters = ['mutuals', 'followers', 'following', 'top8', 'blocked'] as const
export const leaderboardFiltersEmojies = [HuggingEmoji, StarEyesEmoji, EyesEmoji, FireEmoji, PirateFlagEmoji] as const

export const THEMES = ['light', 'dark']
const DARK_ICON_THEME = ['dark']

export const profileCardSocials = [
  {
    name: 'etherscan',
    url: (address: string) => `https://etherscan.io/address/${address}`,
    icon: (theme: string) => (DARK_ICON_THEME.includes(theme) ? EtherscanIconLight : EtherscanIcon),
  },
  {
    name: 'com.twitter',
    url: (username: string) => `https://twitter.com/${username}`,
    icon: (theme: string) => (DARK_ICON_THEME.includes(theme) ? TwitterIcon : TwitterIcon),
  },
  {
    name: 'com.github',
    url: (username: string) => `https://github.com/${username}`,
    icon: (theme: string) => (DARK_ICON_THEME.includes(theme) ? GithubIconLight : GithubIcon),
  },
  {
    name: 'org.telegram',
    url: (username: string) => `https://t.me/${username}`,
    icon: (theme: string) => (DARK_ICON_THEME.includes(theme) ? TelegramIcon : TelegramIcon),
  },
  {
    name: 'com.discord',
    url: (username: string) => `https://discord.com/users/${username}`,
    icon: (theme: string) => (DARK_ICON_THEME.includes(theme) ? DiscordIcon : DiscordIcon),
  },
] as const
