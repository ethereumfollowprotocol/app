import { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { HiOutlineDesktopComputer } from 'react-icons/hi'

import GreenCheck from 'public/assets/icons/check-green.svg'
import Image from 'next/image'

const themesWithIcons = [
  {
    theme: 'light',
    icon: <MdLightMode />
  },
  {
    theme: 'dark',
    icon: <MdDarkMode />
  },
  {
    theme: 'auto',
    icon: <HiOutlineDesktopComputer />
  }
]

const themes = ['light', 'dark', 'auto'] as const
type ThemeType = (typeof themes)[number]

interface ThemeSwitcherProps {
  connected?: boolean
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ connected }) => {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const clickAwayThemeRef = useClickAway<HTMLDivElement>(() => {
    setThemeMenuOpen(false)
  })

  const { t } = useTranslation()

  const [selectedTheme, setSelectedTheme] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme')
      if (storedTheme) {
        return storedTheme as ThemeType
      }
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
      if (userMedia.matches) {
        return 'auto'
      }
    }
    return 'light'
  })

  useEffect(() => {
    if (selectedTheme === 'auto') {
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)')

      if (userMedia.matches) {
        document.documentElement.classList.add('dark')
        localStorage.removeItem('theme')
        return
      }
    }

    if (selectedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', selectedTheme)
  }, [selectedTheme])

  const toggleTheme = () => {
    setSelectedTheme({ light: 'dark', dark: 'auto', auto: 'light' }[selectedTheme] as ThemeType)
    window.localStorage.setItem('theme', selectedTheme)
  }

  return connected ? (
    <div ref={clickAwayThemeRef} className='w-full cursor-pointer group relative'>
      <div
        onClick={() => setThemeMenuOpen(!themeMenuOpen)}
        className='flex justify-between items-center w-full group-hover:bg-slate-100 dark:group-hover:bg-zinc-400/20 p-3 rounded-md transition-opacity cursor-pointer'
      >
        <FiArrowLeft className='text-xl' />
        <div className='flex items-center justify-end gap-2'>
          <p className='text-2xl'>
            {themesWithIcons.find(({ theme }) => theme === selectedTheme)?.icon}
          </p>
          <p className='capitalize font-semibold'>{t(selectedTheme)}</p>
        </div>
      </div>
      <div
        className={`absolute -right-[14.6%] sm:right-[97.2%] group-hover:block min-w-[190px] block z-50 -top-[6px] ${
          themeMenuOpen ? 'block' : 'hidden'
        } pr-5`}
      >
        <div className='flex flex-col gap-2 w-full min-w-[190px] max-h-[75vh] sm:max-h-[80vh] overflow-scroll border-[3px] rounded-lg bg-white/90 dark:bg-darkGrey/90 border-zinc-100 dark:border-zinc-500 p-1  shadow-md'>
          <div
            onClick={() => setThemeMenuOpen(false)}
            className='flex sm:hidden  justify-between items-center w-full group-hover:bg-slate-100 dark:group-hover:bg-zinc-400/20  dark:hover:bg-zinc-400/20 p-3 rounded-md transition-opacity cursor-pointer'
          >
            <FiArrowLeft className='text-xl' />
            <p className='font-semibold'>Back</p>
          </div>
          {themesWithIcons.map(({ theme, icon }) => (
            <div
              className='flex items-center relative p-3 pl-8 w-full gap-2 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-400/20'
              key={theme}
              onClick={() => {
                setSelectedTheme(theme as ThemeType)
                setThemeMenuOpen(false)
              }}
            >
              {selectedTheme === theme && (
                <Image
                  src={GreenCheck}
                  alt='List selected'
                  width={16}
                  className='absolute left-2 top-[17px]'
                />
              )}
              <p className='text-2xl'>{icon}</p>
              <p className='text-nowrap capitalize font-semibold'>{t(theme)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <button
      onClick={toggleTheme}
      className='text-3xl hover:scale-110 transition-transform rounded-full'
    >
      {themesWithIcons.find(({ theme }) => theme === selectedTheme)?.icon}
    </button>
  )
}

export default ThemeSwitcher
