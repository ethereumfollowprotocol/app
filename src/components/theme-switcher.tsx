'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { useClickAway, useIsClient } from '@uidotdev/usehooks'

import i18n from '#/app/i18n'
import { cn } from '#/lib/utilities'
import { useGlassTheme } from '#/hooks/use-glass-theme'
import Check from 'public/assets/icons/ui/check.svg'
import Computer from 'public/assets/icons/ui/computer.svg'
import LightMode from 'public/assets/icons/ui/light-mode.svg'
import DarkMode from 'public/assets/icons/ui/dark-mode.svg'
import ArrowLeft from 'public/assets/icons/ui/arrow-left.svg'
import ArrowRight from 'public/assets/icons/ui/arrow-right.svg'

export const themesWithIcons = [
  {
    theme: 'system',
    icon: Computer,
    language: undefined,
  },
  {
    theme: 'light',
    icon: LightMode,
    language: undefined,
  },
  {
    theme: 'dark',
    icon: DarkMode,
    language: undefined,
  },
  {
    theme: 'glass-light',
    icon: LightMode,
    language: undefined,
  },
  {
    theme: 'glass-dark',
    icon: DarkMode,
    language: undefined,
  },
]

const themes = ['system', 'light', 'dark', 'glass-light', 'glass-dark'] as const
type ThemeType = (typeof themes)[number]

interface ThemeSwitcherProps {
  closeMenu?: () => void
  setExternalThemeMenuOpen?: (open: boolean) => void
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ closeMenu, setExternalThemeMenuOpen }) => {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)

  const clickAwayThemeRef = useClickAway<HTMLDivElement>(() => {
    setThemeMenuOpen(false)
    setExternalThemeMenuOpen?.(false)
  })

  const isClient = useIsClient()
  const { t } = useTranslation()
  const { setTheme, theme: selectedTheme } = useTheme()
  const { getDropdownClass, getItemClass } = useGlassTheme()
  const selectedThemeIcon = isClient ? themesWithIcons.find(({ theme }) => theme === selectedTheme) : { icon: Computer }

  return (
    <div
      ref={clickAwayThemeRef}
      onMouseEnter={() => {
        setThemeMenuOpen(true)
        setExternalThemeMenuOpen?.(true)
      }}
      onMouseLeave={() => {
        setThemeMenuOpen(false)
        setExternalThemeMenuOpen?.(false)
      }}
      className='group relative h-full w-full cursor-pointer'
    >
      <div
        onClick={() => {
          setThemeMenuOpen(!themeMenuOpen)
          setExternalThemeMenuOpen?.(!themeMenuOpen)
        }}
        className={`${getItemClass()} flex w-full cursor-pointer items-center justify-between rounded-sm p-4 transition-opacity`}
      >
        <div className='flex items-center justify-end gap-2'>
          {selectedThemeIcon && <selectedThemeIcon.icon className='h-6 w-6' />}
          <p className='font-bold capitalize'>{t(isClient ? selectedTheme || 'system' : 'system')}</p>
        </div>
        <ArrowRight />
      </div>
      <div
        className={cn(
          'absolute top-0 -right-full z-50 block h-full w-full transition-all transition-discrete group-hover:block sm:left-full sm:w-fit sm:pl-2 sm:transition-normal',
          themeMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div
          className={`${getDropdownClass()} flex h-screen max-h-[80vh] w-full flex-col gap-2 rounded-sm sm:h-auto sm:max-h-[50vh] sm:w-56`}
        >
          <div
            onClick={() => {
              setThemeMenuOpen(false)
              setExternalThemeMenuOpen?.(false)
            }}
            className={`${getItemClass()} flex w-full cursor-pointer items-center justify-between rounded-sm p-4 transition-opacity sm:hidden`}
          >
            <ArrowLeft className='text-xl' />
            <p className='font-bold'>{t('back')}</p>
          </div>
          {themesWithIcons.map((theme) => (
            <div
              className={`${getItemClass()} relative flex w-full items-center gap-2 rounded-sm p-4 pl-8`}
              key={theme.theme}
              onClick={() => {
                setTheme(theme.theme as ThemeType)
                setThemeMenuOpen(false)
                setExternalThemeMenuOpen?.(false)
                if (theme.language) {
                  i18n.changeLanguage(theme.language)
                }
                closeMenu?.()
              }}
            >
              {isClient && (selectedTheme || 'system') === theme.theme && (
                <Check className='absolute top-5 left-2.5 h-4 w-4 text-green-500' />
              )}
              <theme.icon className='h-6 w-6' suppressHydrationWarning />
              <p className='font-bold text-nowrap capitalize'>{t(theme.theme)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ThemeSwitcher
