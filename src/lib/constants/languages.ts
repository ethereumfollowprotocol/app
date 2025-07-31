import IranFlag from 'public/assets/icons/flags/iran.svg?url'
import LaosFlag from 'public/assets/icons/flags/laos.svg?url'
import IndiaFlag from 'public/assets/icons/flags/india.svg?url'
import ChinaFlag from 'public/assets/icons/flags/china.svg?url'
import SpainFlag from 'public/assets/icons/flags/spain.svg?url'
import ItalyFlag from 'public/assets/icons/flags/italy.svg?url'
import GhanaFlag from 'public/assets/icons/flags/ghana.svg?url'
import JapanFlag from 'public/assets/icons/flags/japan.svg?url'
import frensFlag from 'public/assets/icons/flags/frens.svg?url'
import WalesFlag from 'public/assets/icons/flags/wales.svg?url'
import KoreaFlag from 'public/assets/icons/flags/korea.svg?url'
import IsraelFlag from 'public/assets/icons/flags/israel.svg?url'
import TurkeyFlag from 'public/assets/icons/flags/turkey.svg?url'
import FranceFLag from 'public/assets/icons/flags/france.svg?url'
import GreeceFlag from 'public/assets/icons/flags/greece.svg?url'
import BrazilFLag from 'public/assets/icons/flags/brazil.svg?url'
import BosniaFlag from 'public/assets/icons/flags/bosnia.svg?url'
import PolandFlag from 'public/assets/icons/flags/poland.svg?url'
import LatviaFlag from 'public/assets/icons/flags/latvia.svg?url'
import SwedenFlag from 'public/assets/icons/flags/sweden.svg?url'
import NorwayFlag from 'public/assets/icons/flags/norway.svg?url'
import TaiwanFlag from 'public/assets/icons/flags/taiwan.svg?url'
import SerbiaFlag from 'public/assets/icons/flags/serbia.svg?url'
import RussiaFlag from 'public/assets/icons/flags/russia.svg?url'
import MexicoFlag from 'public/assets/icons/flags/mexico.svg?url'
import PirateFlag from 'public/assets/icons/flags/pirate.svg?url'
import PirateFlagSvg from 'public/assets/icons/flags/pirate-flag.svg?url'
import HungaryFlag from 'public/assets/icons/flags/hungary.svg?url'
import FinlandFlag from 'public/assets/icons/flags/finland.svg?url'
import RomaniaFlag from 'public/assets/icons/flags/romania.svg?url'
import GeorgiaFlag from 'public/assets/icons/flags/georgia.svg?url'
import ArmeniaFlag from 'public/assets/icons/flags/armenia.svg?url'
import CroatiaFlag from 'public/assets/icons/flags/croatia.svg?url'
import NigeriaFlag from 'public/assets/icons/flags/nigeria.svg?url'
import UkraineFlag from 'public/assets/icons/flags/ukraine.svg?url'
import VietnamFlag from 'public/assets/icons/flags/vietnam.svg?url'
import GermanyFLag from 'public/assets/icons/flags/germany.svg?url'
import EnglandFlag from 'public/assets/icons/flags/england.svg?url'
import EstoniaFlag from 'public/assets/icons/flags/estonia.svg?url'
import IrelandFlag from 'public/assets/icons/flags/ireland.svg?url'
import MongoliaFlag from 'public/assets/icons/flags/mongolia.svg?url'
import CambodiaFlag from 'public/assets/icons/flags/cambodia.svg?url'
import EthiopiaFlag from 'public/assets/icons/flags/ethiopia.svg?url'
import MalaysiaFlag from 'public/assets/icons/flags/malaysia.svg?url'
import PortugalFlag from 'public/assets/icons/flags/portugal.svg?url'
import BulgariaFlag from 'public/assets/icons/flags/bulgaria.svg?url'
import TanzaniaFlag from 'public/assets/icons/flags/tanzania.svg?url'
import SloveniaFlag from 'public/assets/icons/flags/slovenia.svg?url'
import ThailandFlag from 'public/assets/icons/flags/thailand.svg?url'
import USAFlag from 'public/assets/icons/flags/united-states.svg?url'
import GenAlphaFlag from 'public/assets/icons/flags/genalpha.svg?url'
import PakistanFlag from 'public/assets/icons/flags/pakistan.svg?url'
import CataloniaFlag from 'public/assets/icons/flags/catalonia.svg?url'
import CorporateFlag from 'public/assets/icons/flags/corporate.svg?url'
import LithuaniaFlag from 'public/assets/icons/flags/lithuania.svg?url'
import IndonesiaFlag from 'public/assets/icons/flags/indonesia.svg?url'
import MillennialFlag from 'public/assets/icons/flags/millennial.svg?url'
import AzerbaijanFlag from 'public/assets/icons/flags/azerbaijan.svg?url'
import UzbekistanFlag from 'public/assets/icons/flags/uzbekistan.svg?url'
import KazakhstanFlag from 'public/assets/icons/flags/kazakhstan.svg?url'
import ErmahgershFlag from 'public/assets/icons/flags/ermahgersh.svg?url'
import NetherlandsFlag from 'public/assets/icons/flags/netherlands.svg?url'
import PhilippinesFlag from 'public/assets/icons/flags/philippines.svg?url'
import SouthAfricaFlag from 'public/assets/icons/flags/south-africa.svg?url'
import SaudiArabiaFlag from 'public/assets/icons/flags/saudi-arabia.svg?url'
import VaticanCityFlag from 'public/assets/icons/flags/vatican-city.svg?url'
import CzechRepublicFlag from 'public/assets/icons/flags/czech-republic.svg?url'
import type { StaticImageData } from 'next/image'
// import HalloweenFlag from 'public/assets/icons/flags/halloween.svg'

export const LANGUAGES: {
  language: string
  key: string
  icon: StaticImageData
  englishLanguage: string
  special?: boolean
}[] = [
  // ----------- normal languages -----------
  { language: 'English', key: 'en', icon: USAFlag, englishLanguage: 'English' },
  { language: 'Slovenščina', key: 'sl', icon: SloveniaFlag, englishLanguage: 'Slovenian' },
  { language: '简体中文', key: 'zh', icon: ChinaFlag, englishLanguage: 'Chinese' },
  { language: 'Français', key: 'fr', icon: FranceFLag, englishLanguage: 'French' },
  { language: 'Español', key: 'es', icon: SpainFlag, englishLanguage: 'Spanish' },
  {
    language: 'Español (MX)',
    key: 'es-MX',
    icon: MexicoFlag,
    englishLanguage: 'Spanish (Mexican)',
  },
  { language: '日本語', key: 'ja', icon: JapanFlag, englishLanguage: 'Japanese' },
  { language: '한국어', key: 'ko', icon: KoreaFlag, englishLanguage: 'Korean' },
  { language: 'Deutsch', key: 'de', icon: GermanyFLag, englishLanguage: 'German' },
  { language: 'हिन्दी', key: 'hi', icon: IndiaFlag, englishLanguage: 'Hindi' },
  { language: 'Português', key: 'pt', icon: PortugalFlag, englishLanguage: 'Portuguese' },
  {
    language: 'Português (BR)',
    key: 'pt-BR',
    icon: BrazilFLag,
    englishLanguage: 'Portuguese (Brazilian)',
  },
  {
    language: 'Nigerian Pidgin',
    key: 'pcm',
    icon: NigeriaFlag,
    englishLanguage: 'Nigerian Pidgin',
  },
  { language: '繁體中文', key: 'zh-TW', icon: TaiwanFlag, englishLanguage: 'Traditional Chinese' },
  { language: 'Nederlands', key: 'nl', icon: NetherlandsFlag, englishLanguage: 'Dutch' },
  { language: 'Polski', key: 'pl', icon: PolandFlag, englishLanguage: 'Polish' },
  { language: 'Lietuvių', key: 'lt', icon: LithuaniaFlag, englishLanguage: 'Lithuanian' },
  { language: 'العربية', key: 'ar', icon: SaudiArabiaFlag, englishLanguage: 'Arabic' },
  { language: 'Čeština', key: 'cs', icon: CzechRepublicFlag, englishLanguage: 'Czech' },
  { language: 'ਪੰਜਾਬੀ (IN)', key: 'pa-in', icon: IndiaFlag, englishLanguage: 'Punjabi' },
  { language: 'Türkçe', key: 'tr', icon: TurkeyFlag, englishLanguage: 'Turkish' },
  { language: 'Bahasa Indonesia', key: 'id', icon: IndonesiaFlag, englishLanguage: 'Indonesian' },
  { language: 'ไทย', key: 'th', icon: ThailandFlag, englishLanguage: 'Thai' },
  { language: 'فارسی', key: 'fa', icon: IranFlag, englishLanguage: 'Persian' },
  { language: 'Kiswahili', key: 'sw', icon: TanzaniaFlag, englishLanguage: 'Swahili' },
  { language: 'Български', key: 'bg', icon: BulgariaFlag, englishLanguage: 'Bulgarian' },
  { language: 'Latviešu', key: 'lv', icon: LatviaFlag, englishLanguage: 'Latvian' },
  { language: 'Norsk', key: 'nb', icon: NorwayFlag, englishLanguage: 'Norwegian' },
  { language: 'Svenska', key: 'sv', icon: SwedenFlag, englishLanguage: 'Swedish' },
  { language: 'tiếng Việt', key: 'vn', icon: VietnamFlag, englishLanguage: 'Vietnamese' },
  { language: 'Русский', key: 'ru', icon: RussiaFlag, englishLanguage: 'Russian' },
  { language: 'Українська', key: 'uk', icon: UkraineFlag, englishLanguage: 'Ukrainian' },
  { language: 'മലയാളം', key: 'ml', icon: IndiaFlag, englishLanguage: 'Malayalam' },
  { language: 'Yorùbá', key: 'yo', icon: NigeriaFlag, englishLanguage: 'Yoruba' },
  { language: 'Қазақ', key: 'kk', icon: KazakhstanFlag, englishLanguage: 'Kazakh' },
  { language: 'ქართული', key: 'ka', icon: GeorgiaFlag, englishLanguage: 'Georgian' },
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
  { language: 'Ελληνικά', key: 'el', icon: GreeceFlag, englishLanguage: 'Greek' },
  { language: 'Azərbaycan dili', key: 'az', icon: AzerbaijanFlag, englishLanguage: 'Azerbaijani' },
  { language: 'Eʋegbe', key: 'ee', icon: GhanaFlag, englishLanguage: 'Ewe' },
  { language: 'Zulu', key: 'zu', icon: SouthAfricaFlag, englishLanguage: 'Zulu' },
  { language: 'Twi', key: 'tw', icon: GhanaFlag, englishLanguage: 'Twi' },
  { language: 'Igbo', key: 'ig', icon: NigeriaFlag, englishLanguage: 'Igbo' },
  { language: 'Idoma', key: 'idu', icon: NigeriaFlag, englishLanguage: 'Idoma' },
  { language: 'Melayu', key: 'ms', icon: MalaysiaFlag, englishLanguage: 'Malay' },
  { language: 'मराठी', key: 'mr', icon: IndiaFlag, englishLanguage: 'Marathi' },
  { language: 'भोजपुरी', key: 'bho', icon: IndiaFlag, englishLanguage: 'Bhojpuri' },
  { language: 'தமிழ்', key: 'ta', icon: IndiaFlag, englishLanguage: 'Tamil' },
  { language: 'ಕನ್ನಡ', key: 'kn', icon: IndiaFlag, englishLanguage: 'Kannada' },
  { language: 'తెలుగు', key: 'te', icon: IndiaFlag, englishLanguage: 'Telugu' },
  { language: 'Igala', key: 'igala', icon: NigeriaFlag, englishLanguage: 'Igala' },
  { language: 'Umeke', key: 'igede', icon: NigeriaFlag, englishLanguage: 'Igede' },
  { language: 'Tiv', key: 'tiv', icon: NigeriaFlag, englishLanguage: 'Tiv' },
  { language: 'Fante', key: 'fante', icon: GhanaFlag, englishLanguage: 'Fante' },
  { language: 'বাংলা', key: 'bn', icon: IndiaFlag, englishLanguage: 'Bengali' },
  { language: 'አማርኛ', key: 'am', icon: EthiopiaFlag, englishLanguage: 'Amharic' },
  { language: 'Afrikaans', key: 'af', icon: SouthAfricaFlag, englishLanguage: 'Afrikaans' },
  { language: 'ខ្មែរ', key: 'km', icon: CambodiaFlag, englishLanguage: 'Khmer' },
  { language: 'Basa Jawa', key: 'jv', icon: IndonesiaFlag, englishLanguage: 'Javanese' },
  { language: 'Eesti keel', key: 'et', icon: EstoniaFlag, englishLanguage: 'Estonian' },
  { language: 'Gaeilge', key: 'ga', icon: IrelandFlag, englishLanguage: 'Irish' },
  { language: 'Xhosa', key: 'xh', icon: SouthAfricaFlag, englishLanguage: 'Xhosa' },
  { language: 'Català', key: 'ca', icon: CataloniaFlag, englishLanguage: 'Catalan' },
  { language: 'Монгол', key: 'mn', icon: MongoliaFlag, englishLanguage: 'Mongolian' },
  { language: 'Saesneg', key: 'cy', icon: WalesFlag, englishLanguage: 'Welsh' },
  { language: 'ລອຍ', key: 'lo', icon: LaosFlag, englishLanguage: 'Lao' },
  { language: 'ئۇيغۇر تىلى', key: 'ug', icon: ChinaFlag, englishLanguage: 'Uyghur' },
  { language: 'Latina', key: 'la', icon: VaticanCityFlag, englishLanguage: 'Latin' },
  { language: 'اردو', key: 'ur', icon: PakistanFlag, englishLanguage: 'Urdu' },
  { language: 'ଓଡିଆ', key: 'or', icon: IndiaFlag, englishLanguage: 'Odia' },
  { language: '廣東話', key: 'yue', icon: ChinaFlag, englishLanguage: 'Cantonese' },
  // ----------- special languages -----------
  { language: 'Pirate', key: 'pirate', icon: PirateFlag, englishLanguage: 'Pirate', special: true },
  {
    language: 'Corporate',
    key: 'corp',
    icon: CorporateFlag,
    englishLanguage: 'Corporate',
    special: true,
  },
  {
    language: 'Gen Alpha',
    key: 'genalpha',
    icon: GenAlphaFlag,
    englishLanguage: 'Gen Alpha',
    special: true,
  },
  {
    language: 'Shakespearean',
    key: 'shakespearean',
    icon: EnglandFlag,
    englishLanguage: 'Shakespearean',
    special: true,
  },
  {
    language: 'frENS',
    key: 'frens',
    icon: frensFlag,
    englishLanguage: 'frENS',
    special: true,
  },
  {
    language: 'Ermahgersh',
    key: 'ermahgersh',
    icon: ErmahgershFlag,
    englishLanguage: 'Ermahgersh',
    special: true,
  },
  {
    language: 'Millennial',
    key: 'millennial',
    icon: MillennialFlag,
    englishLanguage: 'Millennial',
    special: true,
  },
  {
    language: 'tlhIngan Hol',
    key: 'tlh',
    icon: PirateFlagSvg,
    englishLanguage: 'Klingon',
    special: true,
  },
  // {
  //   language: 'Halloween',
  //   key: 'halloween',
  //   icon: HalloweenFlag,
  //   englishLanguage: 'Halloween',
  //   special: true
  // }
]

export const languageKeys = LANGUAGES.map((language) => language.key)
