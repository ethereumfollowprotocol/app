'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { track } from '@vercel/analytics/react'
import { useIsClient } from '@uidotdev/usehooks'

import i18n from '#/app/i18n'
import Mobile from './mobile.tsx'
import Desktop from './desktop.tsx'
import { LANGUAGES } from '#/lib/constants/languages.ts'

const Navigation = () => {
  const isClient = useIsClient()
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    if (resolvedTheme === 'halloween') setTheme('system')
    if (isClient) track(`Loaded with language ${LANGUAGES.find((lang) => lang.key === i18n.language)?.englishLanguage}`)
  }, [isClient])

  return (
    <header className='fixed top-0 left-0 z-50'>
      <Desktop />
      <Mobile />
    </header>
  )
}

export default Navigation
