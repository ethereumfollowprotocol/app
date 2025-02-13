import { useEffect, useState, type SVGProps } from 'react'
import { track } from '@vercel/analytics/react'

import i18n from '#/app/i18n'
import { LANGUAGES } from '#/lib/constants/languages'

const useLanguage = () => {
  const [languageMenOpenu, setLanguageMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(
    LANGUAGES[LANGUAGES.map((lang) => lang.key).indexOf(i18n.language || 'en')]
  )

  const changeLanguage = (lang: {
    language: string
    key: string
    icon: React.FC<SVGProps<SVGSVGElement>>
    englishLanguage: string
    special?: boolean | undefined
  }) => {
    i18n.changeLanguage(lang.key)
    setSelectedLanguage(lang)
    setLanguageMenuOpen(false)
  }

  useEffect(() => {
    setSelectedLanguage(LANGUAGES[LANGUAGES.map((lang) => lang.key).indexOf(i18n.language || 'en')])
    track(`Changed language to ${LANGUAGES.find((lang) => lang.key === i18n.language)?.englishLanguage}`)
  }, [i18n.language])

  return {
    changeLanguage,
    languageMenOpenu,
    selectedLanguage,
    setLanguageMenuOpen,
    setSelectedLanguage,
  }
}

export default useLanguage
