'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { track } from '@vercel/analytics/react'
import { useIsClient } from '@uidotdev/usehooks'

import i18n from '#/app/i18n'
import Mobile from './mobile.tsx'
import Desktop from './desktop.tsx'
import { LANGUAGES } from '#/lib/constants/languages.ts'
import { useSounds } from '#/contexts/sounds-context.tsx'

const Navigation = () => {
  const isClient = useIsClient()
  const { resolvedTheme, setTheme } = useTheme()
  const { backgroundMusicRef, backgroundSoundsMuted } = useSounds()

  useEffect(() => {
    if (resolvedTheme === 'halloween') setTheme('system')
    if (isClient) track(`Loaded with language ${LANGUAGES.find((lang) => lang.key === i18n.language)?.englishLanguage}`)
  }, [isClient])

  return (
    <>
      <header className='w-full fixed z-50 glass-card bg-white/50 dark:bg-black/75 halloween:bg-black/85 top-0 left-0 border-b-[3px] border-grey p-4 lg:px-6 xl:px-8'>
        {!backgroundSoundsMuted && (
          <audio
            ref={backgroundMusicRef}
            src={resolvedTheme === 'halloween' ? '/assets/background-music/halloween.mp3' : ''}
            autoPlay={true}
            loop={true}
          />
        )}
        <Desktop />
      </header>
      <Mobile />
    </>
  )
}

export default Navigation
