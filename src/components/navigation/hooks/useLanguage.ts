import i18n from '#/app/i18n'
import { LANGUAGES } from '#/lib/constants'
import type { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'

const useLanguage = () => {
  const [languageMenOpenu, setLanguageMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(
    LANGUAGES[LANGUAGES.map(lang => lang.key).indexOf(i18n.language || 'en')]
  )

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
    setSelectedLanguage(LANGUAGES[LANGUAGES.map(lang => lang.key).indexOf(i18n.language || 'en')])
  }, [i18n.language])

  return {
    changeLanguage,
    languageMenOpenu,
    selectedLanguage,
    setLanguageMenuOpen,
    setSelectedLanguage
  }
}

export default useLanguage
