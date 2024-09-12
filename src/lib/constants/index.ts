import type { FollowSortType } from '#/types/requests'
import type { ProfileTableTitleType, ProfileTabType } from '#/types/common'

import FireEmoji from 'public/assets/icons/fire.svg'
import EyesEmoji from 'public/assets/icons/eyes.svg'
import GithubIcon from 'public/assets/icons/github.svg'
import DiscordIcon from 'public/assets/icons/discord.svg'
import TwitterIcon from 'public/assets/icons/twitter.svg'
import IranFlag from 'public/assets/icons/flags/iran.svg'
import HuggingEmoji from 'public/assets/icons/hugging.svg'
import TelegramIcon from 'public/assets/icons/telegram.svg'
import IndiaFlag from 'public/assets/icons/flags/india.svg'
import ChinaFlag from 'public/assets/icons/flags/china.svg'
import SpainFlag from 'public/assets/icons/flags/spain.svg'
import TurkeyFlag from 'public/assets/icons/flags/turkey.svg'
import StarEyesEmoji from 'public/assets/icons/star-eyes.svg'
import EtherscanIcon from 'public/assets/icons/etherscan.svg'
import FranceFLag from 'public/assets/icons/flags/france.svg'
import BrazilFLag from 'public/assets/icons/flags/brazil.svg'
import PolandFlag from 'public/assets/icons/flags/poland.svg'
import LatviaFlag from 'public/assets/icons/flags/latvia.svg'
import SwedenFlag from 'public/assets/icons/flags/sweden.svg'
import NorwayFlag from 'public/assets/icons/flags/norway.svg'
import TaiwanFlag from 'public/assets/icons/flags/taiwan.svg'
import RussiaFlag from 'public/assets/icons/flags/russia.svg'
import UkraineFlag from 'public/assets/icons/flags/ukraine.svg'
import VietnamFlag from 'public/assets/icons/flags/vietnam.svg'
import GermanyFLag from 'public/assets/icons/flags/germany.svg'
import PirateFlagEmoji from 'public/assets/icons/pirate-flag.svg'
import BulgariaFlag from 'public/assets/icons/flags/bulgaria.svg'
import TanzaniaFlag from 'public/assets/icons/flags/tanzania.svg'
import SloveniaFlag from 'public/assets/icons/flags/slovenia.svg'
import USAFlag from 'public/assets/icons/flags/united-states.svg'
import GithubIconLight from 'public/assets/icons/github-white.svg'
import LithuaniaFlag from 'public/assets/icons/flags/lithuania.svg'
import IndonesiaFlag from 'public/assets/icons/flags/indonesia.svg'
import NetherlandsFlag from 'public/assets/icons/flags/netherlands.svg'
import EtherscanIconLight from 'public/assets/icons/etherscan-light.svg'
import SaudiArabiaFlag from 'public/assets/icons/flags/saudi-arabia.svg'
import VaticanCityFlag from 'public/assets/icons/flags/vatican-city.svg'
import CzechRepublicFlag from 'public/assets/icons/flags/czech-republic.svg'

export const APP_NAME = 'Ethereum Follow Protocol'
export const APP_NAME_SHORT = 'EFP'
export const APP_DESCRIPTION =
  'A native Ethereum protocol for following and tagging Ethereum accounts.'
export const APP_URL =
  process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4321'

export const ENS_SUBGRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${process.env.NEXT_PUBLIC_ENS_SUBGRAPH_API_KEY}/subgraphs/id/5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH`

export const FETCH_LIMIT_PARAM = 12
export const LEADERBOARD_FETCH_LIMIT_PARAM = 60
export const LEADERBOARD_CHUNK_SIZE = 20

export const SECOND = 1_000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const WEEK = 7 * DAY

export const PROFILE_TABS: ProfileTabType[] = ['following', 'followers']
export const BLOCKED_MUTED_TABS: ProfileTableTitleType[] = ['Blocked/Muted', 'Blocked/Muted By']

export const LANGUAGES = [
  { language: 'English', key: 'en', icon: USAFlag },
  { language: 'Slovenščina', key: 'si', icon: SloveniaFlag },
  { language: '简体中文', key: 'zh', icon: ChinaFlag },
  { language: 'Français', key: 'fr', icon: FranceFLag },
  { language: 'Español', key: 'es', icon: SpainFlag },
  { language: 'Deutsch', key: 'de', icon: GermanyFLag },
  { language: 'Português (BR)', key: 'ptbr', icon: BrazilFLag },
  { language: 'Nederlands', key: 'nl', icon: NetherlandsFlag },
  { language: 'Polski', key: 'pl', icon: PolandFlag },
  { language: 'Lietuvių', key: 'lt', icon: LithuaniaFlag },
  { language: 'العربية', key: 'ar', icon: SaudiArabiaFlag },
  { language: 'Čeština', key: 'cs', icon: CzechRepublicFlag },
  { language: 'हिन्दी', key: 'hi', icon: IndiaFlag },
  { language: 'ਪੰਜਾਬੀ (IN)', key: 'pain', icon: IndiaFlag },
  { language: 'Türkçe', key: 'tr', icon: TurkeyFlag },
  { language: 'Bahasa Indonesia', key: 'id', icon: IndonesiaFlag },
  { language: 'فارسی', key: 'fa', icon: IranFlag },
  { language: 'Latina', key: 'la', icon: VaticanCityFlag },
  { language: 'Kiswahili', key: 'sw', icon: TanzaniaFlag },
  { language: 'Български', key: 'bg', icon: BulgariaFlag },
  { language: 'Latviešu', key: 'lv', icon: LatviaFlag },
  { language: 'Norsk', key: 'nb', icon: NorwayFlag },
  { language: 'Svenska', key: 'sv', icon: SwedenFlag },
  { language: 'tiếng Việt', key: 'vn', icon: VietnamFlag },
  { language: '繁體中文', key: 'zhtw', icon: TaiwanFlag },
  { language: 'Русский', key: 'ru', icon: RussiaFlag },
  { language: 'Українська', key: 'uk', icon: UkraineFlag },
  { language: 'മലയാളം', key: 'ml', icon: IndiaFlag }
]

export const DEFAULT_TAGS_TO_ADD = ['irl', 'bff', 'based', 'degen', 'top8']
export const DEFAULT_TAGS = ['no tag']
export const BLOCKED_MUTED_TAGS = ['block', 'mute']
export const SORT_OPTIONS: FollowSortType[] = ['follower count', 'latest first', 'earliest first']

export const NAV_ITEMS = [
  {
    href: () => '/',
    emoji: '🏠',
    name: 'home',
    private: false
  },
  {
    href: (url?: string) => `/${url ?? 'profile'}`,
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

export const leaderboardFilters = ['mutuals', 'followers', 'following', 'top8', 'blocked'] as const
export const leaderboardFiltersEmojies = [
  HuggingEmoji,
  StarEyesEmoji,
  EyesEmoji,
  FireEmoji,
  PirateFlagEmoji
] as const

export const profileCardSocials = [
  {
    name: 'etherscan',
    url: (address: string) => `https://etherscan.io/address/${address}`,
    icon: (theme: string) => (theme === 'dark' ? EtherscanIconLight : EtherscanIcon)
  },
  {
    name: 'com.twitter',
    url: (username: string) => `https://twitter.com/${username}`,
    icon: (theme: string) => (theme === 'dark' ? TwitterIcon : TwitterIcon)
  },
  {
    name: 'com.github',
    url: (username: string) => `https://github.com/${username}`,
    icon: (theme: string) => (theme === 'dark' ? GithubIconLight : GithubIcon)
  },
  {
    name: 'org.telegram',
    url: (username: string) => `https://t.me/${username}`,
    icon: (theme: string) => (theme === 'dark' ? TelegramIcon : TelegramIcon)
  },
  {
    name: 'com.discord',
    url: (username: string) => `https://discord.com/users/${username}`,
    icon: (theme: string) => (theme === 'dark' ? DiscordIcon : DiscordIcon)
  }
] as const
