import { useEffect, useRef, useState } from 'react'

import i18n from '#/app/i18n'
import { track } from '#/lib/analytics'
import { LANGUAGES } from '#/lib/constants/languages'
import type { StaticImageData } from 'next/image'

const useLanguage = () => {
  const [languageMenOpen, setLanguageMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(
    LANGUAGES[LANGUAGES.map((lang) => lang.key).indexOf(i18n.language || 'en')]
  )
  const previousLanguage = useRef<string | undefined>(undefined)

  const changeLanguage = (lang: {
    language: string
    key: string
    icon: StaticImageData
    englishLanguage: string
    special?: boolean | undefined
  }) => {
    i18n.changeLanguage(lang.key)
    setSelectedLanguage(lang)
    setLanguageMenuOpen(false)
  }

  useEffect(() => {
    setSelectedLanguage(LANGUAGES[LANGUAGES.map((lang) => lang.key).indexOf(i18n.language || 'en')])

    const englishName = LANGUAGES.find((lang) => lang.key === i18n.language)?.englishLanguage

    if (previousLanguage.current && previousLanguage.current !== i18n.language) {
      track('language_changed', {
        from_language: previousLanguage.current,
        to_language: i18n.language,
        to_language_name: englishName,
      })
    }
    previousLanguage.current = i18n.language
  }, [i18n.language])

  return {
    changeLanguage,
    languageMenOpen,
    selectedLanguage,
    setLanguageMenuOpen,
    setSelectedLanguage,
  }
}

export default useLanguage
