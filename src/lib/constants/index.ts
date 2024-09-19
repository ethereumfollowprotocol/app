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
import ItalyFlag from 'public/assets/icons/flags/italy.svg'
import GhanaFlag from 'public/assets/icons/flags/ghana.svg'
import frensFlag from 'public/assets/icons/flags/frens.svg'
import IsraelFlag from 'public/assets/icons/flags/israel.svg'
import TurkeyFlag from 'public/assets/icons/flags/turkey.svg'
import StarEyesEmoji from 'public/assets/icons/star-eyes.svg'
import EtherscanIcon from 'public/assets/icons/etherscan.svg'
import FranceFLag from 'public/assets/icons/flags/france.svg'
import BrazilFLag from 'public/assets/icons/flags/brazil.svg'
import BosniaFlag from 'public/assets/icons/flags/bosnia.svg'
import PolandFlag from 'public/assets/icons/flags/poland.svg'
import LatviaFlag from 'public/assets/icons/flags/latvia.svg'
import SwedenFlag from 'public/assets/icons/flags/sweden.svg'
import NorwayFlag from 'public/assets/icons/flags/norway.svg'
import TaiwanFlag from 'public/assets/icons/flags/taiwan.svg'
import SerbiaFlag from 'public/assets/icons/flags/serbia.svg'
import RussiaFlag from 'public/assets/icons/flags/russia.svg'
import PirateFlag from 'public/assets/icons/flags/pirate.svg'
import HungaryFlag from 'public/assets/icons/flags/hungary.svg'
import ErmahgershFlag from 'public/assets/icons/flags/ermahgersh.svg'
import FinlandFlag from 'public/assets/icons/flags/finland.svg'
import RomaniaFlag from 'public/assets/icons/flags/romania.svg'
import GeorgiaFlag from 'public/assets/icons/flags/georgia.svg'
import ArmeniaFlag from 'public/assets/icons/flags/armenia.svg'
import CroatiaFlag from 'public/assets/icons/flags/croatia.svg'
import NigeriaFlag from 'public/assets/icons/flags/nigeria.svg'
import UkraineFlag from 'public/assets/icons/flags/ukraine.svg'
import VietnamFlag from 'public/assets/icons/flags/vietnam.svg'
import GermanyFLag from 'public/assets/icons/flags/germany.svg'
import EnglandFlag from 'public/assets/icons/flags/england.svg'
import PortugalFlag from 'public/assets/icons/flags/portugal.svg'
import PirateFlagEmoji from 'public/assets/icons/pirate-flag.svg'
import BulgariaFlag from 'public/assets/icons/flags/bulgaria.svg'
import TanzaniaFlag from 'public/assets/icons/flags/tanzania.svg'
import SloveniaFlag from 'public/assets/icons/flags/slovenia.svg'
import ThailandFlag from 'public/assets/icons/flags/thailand.svg'
import USAFlag from 'public/assets/icons/flags/united-states.svg'
import GithubIconLight from 'public/assets/icons/github-white.svg'
import GenAlphaFlag from 'public/assets/icons/flags/genalpha.svg'
import CorporateFlag from 'public/assets/icons/flags/corporate.svg'
import LithuaniaFlag from 'public/assets/icons/flags/lithuania.svg'
import IndonesiaFlag from 'public/assets/icons/flags/indonesia.svg'
import UzbekistanFlag from 'public/assets/icons/flags/uzbekistan.svg'
import KazakhstanFlag from 'public/assets/icons/flags/kazakhstan.svg'
import NetherlandsFlag from 'public/assets/icons/flags/netherlands.svg'
import PhilippinesFlag from 'public/assets/icons/flags/philippines.svg'
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
  // ----------- normal languages -----------
  { language: 'English', key: 'en', icon: USAFlag, englishLanguage: 'English' },
  { language: 'Slovenščina', key: 'si', icon: SloveniaFlag, englishLanguage: 'Slovenian' },
  { language: '简体中文', key: 'zh', icon: ChinaFlag, englishLanguage: 'Chinese' },
  { language: 'Français', key: 'fr', icon: FranceFLag, englishLanguage: 'French' },
  { language: 'Español', key: 'es', icon: SpainFlag, englishLanguage: 'Spanish' },
  { language: 'Deutsch', key: 'de', icon: GermanyFLag, englishLanguage: 'German' },
  { language: 'Português', key: 'pt', icon: PortugalFlag, englishLanguage: 'Portuguese' },
  { language: 'Português (BR)', key: 'ptbr', icon: BrazilFLag, englishLanguage: 'Portuguese (BR)' },
  { language: 'Nederlands', key: 'nl', icon: NetherlandsFlag, englishLanguage: 'Dutch' },
  { language: 'Polski', key: 'pl', icon: PolandFlag, englishLanguage: 'Polish' },
  { language: 'Lietuvių', key: 'lt', icon: LithuaniaFlag, englishLanguage: 'Lithuanian' },
  { language: 'العربية', key: 'ar', icon: SaudiArabiaFlag, englishLanguage: 'Arabic' },
  { language: 'Čeština', key: 'cs', icon: CzechRepublicFlag, englishLanguage: 'Czech' },
  { language: 'हिन्दी', key: 'hi', icon: IndiaFlag, englishLanguage: 'Hindi' },
  { language: 'ਪੰਜਾਬੀ (IN)', key: 'pain', icon: IndiaFlag, englishLanguage: 'Punjabi' },
  { language: 'Türkçe', key: 'tr', icon: TurkeyFlag, englishLanguage: 'Turkish' },
  { language: 'Bahasa Indonesia', key: 'id', icon: IndonesiaFlag, englishLanguage: 'Indonesian' },
  { language: 'ไทย', key: 'th', icon: ThailandFlag, englishLanguage: 'Thai' },
  { language: 'فارسی', key: 'fa', icon: IranFlag, englishLanguage: 'Persian' },
  { language: 'Latina', key: 'la', icon: VaticanCityFlag, englishLanguage: 'Latin' },
  { language: 'Kiswahili', key: 'sw', icon: TanzaniaFlag, englishLanguage: 'Swahili' },
  { language: 'Български', key: 'bg', icon: BulgariaFlag, englishLanguage: 'Bulgarian' },
  { language: 'Latviešu', key: 'lv', icon: LatviaFlag, englishLanguage: 'Latvian' },
  { language: 'Norsk', key: 'nb', icon: NorwayFlag, englishLanguage: 'Norwegian' },
  { language: 'Svenska', key: 'sv', icon: SwedenFlag, englishLanguage: 'Swedish' },
  { language: 'tiếng Việt', key: 'vn', icon: VietnamFlag, englishLanguage: 'Vietnamese' },
  { language: '繁體中文', key: 'zhtw', icon: TaiwanFlag, englishLanguage: 'Traditional Chinese' },
  { language: 'Русский', key: 'ru', icon: RussiaFlag, englishLanguage: 'Russian' },
  { language: 'Українська', key: 'uk', icon: UkraineFlag, englishLanguage: 'Ukrainian' },
  { language: 'മലയാളം', key: 'ml', icon: IndiaFlag, englishLanguage: 'Malayalam' },
  { language: 'Yorùbá', key: 'yo', icon: NigeriaFlag, englishLanguage: 'Yoruba' },
  { language: 'Қазақ', key: 'kk', icon: KazakhstanFlag, englishLanguage: 'Kazakh' },
  { language: 'ქართული', key: 'ka', icon: GeorgiaFlag, englishLanguage: 'Georgian' },
  {
    language: 'Nigerian Pidgin',
    key: 'pcm',
    icon: NigeriaFlag,
    englishLanguage: 'Nigerian Pidgin'
  },
  { language: 'Հայերեն', key: 'hy', icon: ArmeniaFlag, englishLanguage: 'Armenian' },
  { language: 'Srpski', key: 'sr', icon: SerbiaFlag, englishLanguage: 'Serbian' },
  { language: 'Hrvatski', key: 'hr', icon: CroatiaFlag, englishLanguage: 'Croatian' },
  { language: 'Italiano', key: 'it', icon: ItalyFlag, englishLanguage: 'Italian' },
  { language: "O'zbekcha", key: 'uz', icon: UzbekistanFlag, englishLanguage: 'Uzbek' },
  { language: 'ગુજરાતી', key: 'gu', icon: IndiaFlag, englishLanguage: 'Gujarati' },
  { language: 'עִברִית', key: 'he', icon: IsraelFlag, englishLanguage: 'Hebrew' },
  { language: 'Tagalog', key: 'tl', icon: PhilippinesFlag, englishLanguage: 'Tagalog' },
  { language: 'Hausa', key: 'ha', icon: NigeriaFlag, englishLanguage: 'Hausa' },
  { language: 'Suomi', key: 'fi', icon: FinlandFlag, englishLanguage: 'Finnish' },
  { language: 'Română', key: 'ro', icon: RomaniaFlag, englishLanguage: 'Romanian' },
  { language: 'Bosanski', key: 'bs', icon: BosniaFlag, englishLanguage: 'Bosnian' },
  { language: 'Magyar', key: 'hu', icon: HungaryFlag, englishLanguage: 'Hungarian' },
  { language: 'Eʋegbe', key: 'ee', icon: GhanaFlag, englishLanguage: 'Ewe' },
  { language: 'Twi', key: 'tw', icon: GhanaFlag, englishLanguage: 'Twi' },
  // ----------- special languages -----------
  { language: 'Pirate', key: 'pirate', icon: PirateFlag, englishLanguage: 'Pirate', special: true },
  {
    language: 'Corporate',
    key: 'corp',
    icon: CorporateFlag,
    englishLanguage: 'Corporate',
    special: true
  },
  {
    language: 'Gen Alpha',
    key: 'genalpha',
    icon: GenAlphaFlag,
    englishLanguage: 'Gen Alpha',
    special: true
  },
  {
    language: 'Shakespearean',
    key: 'shakespearean',
    icon: EnglandFlag,
    englishLanguage: 'Shakespearean',
    special: true
  },
  {
    language: 'frENS',
    key: 'frens',
    icon: frensFlag,
    englishLanguage: 'frENS',
    special: true
  },
  {
    language: 'Ermahgersh',
    key: 'ermahgersh',
    icon: ErmahgershFlag,
    englishLanguage: 'Ermahgersh',
    special: true
  }
]

export const DEFAULT_TAGS_TO_ADD = ['irl', 'bff', 'based', 'degen', 'top8']
export const DEFAULT_TAGS = ['no tag']
export const BLOCKED_MUTED_TAGS = ['block', 'mute']
export const SORT_OPTIONS: FollowSortType[] = ['follower count', 'latest first', 'earliest first']

export const NAV_ITEMS = [
  {
    href: () => '/',
    name: 'home',
    private: false
  },
  {
    href: (url?: string) => `/${url ?? 'profile'}`,
    name: 'profile',
    private: true
  },
  {
    href: () => '/feed',
    name: 'feed',
    private: true
  },
  {
    href: () => '/leaderboard',
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
