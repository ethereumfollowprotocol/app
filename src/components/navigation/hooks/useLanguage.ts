import i18n from '#/app/i18n'
import { LANGUAGES } from '#/lib/constants'
import { useState } from 'react'

const useLanguage = () => {
  const [languageMenOpenu, setLanguageMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(
    LANGUAGES[LANGUAGES.map(lang => lang.key).indexOf(i18n.language || 'en')]
  )

  const changeLanguage = (lang: {
    language: string
    key: string
  }) => {
    i18n.changeLanguage(lang.key)
    setSelectedLanguage(lang)
    setLanguageMenuOpen(false)
  }

  return {
    changeLanguage,
    languageMenOpenu,
    selectedLanguage,
    setLanguageMenuOpen,
    setSelectedLanguage
  }
}

export default useLanguage
