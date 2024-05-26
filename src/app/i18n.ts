import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import common from '../../public/locales/en/common.json'
import home from '../../public/locales/en/home.json'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'si'],
    keySeparator: '.',
    interpolation: {
      escapeValue: false
    },
    defaultNS: 'common',
    ns: ['common', 'home'],
    react: {
      useSuspense: false
    }
  })

// preload english
i18n.addResourceBundle('en', 'common', common)
i18n.addResourceBundle('en', 'home', home)

export default i18n
