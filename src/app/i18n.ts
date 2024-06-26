import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import home from '../../public/locales/en/home.json'
import editor from '../../public/locales/en/editor.json'
import common from '../../public/locales/en/common.json'
import profile from '../../public/locales/en/profile.json'
import transactions from '../../public/locales/en/transactions.json'

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
    ns: ['common', 'home', 'profile', 'editor', 'transactions'],
    react: {
      useSuspense: false
    }
  })

// preload english
i18n.addResourceBundle('en', 'home', home)
i18n.addResourceBundle('en', 'editor', editor)
i18n.addResourceBundle('en', 'common', common)
i18n.addResourceBundle('en', 'profile', profile)
i18n.addResourceBundle('en', 'transactions', transactions)

export default i18n
