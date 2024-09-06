import Image from 'next/image'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { HiOutlineDesktopComputer } from 'react-icons/hi'

import { cn } from '#/lib/utilities'
import GreenCheck from 'public/assets/icons/check-green.svg'

const themesWithIcons = [
  {
    theme: 'system',
    icon: <HiOutlineDesktopComputer />
  },
  {
    theme: 'light',
    icon: <MdLightMode />
  },
  {
    theme: 'dark',
    icon: <MdDarkMode />
  }
]

const themes = ['system', 'light', 'dark'] as const
type ThemeType = (typeof themes)[number]

interface ThemeSwitcherProps {
  connected?: boolean
  closeMenu?: () => void
  setExternalThemeMenuOpen?: (open: boolean) => void
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  connected,
  closeMenu,
  setExternalThemeMenuOpen
}) => {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const clickAwayThemeRef = useClickAway<HTMLDivElement>(() => {
    setThemeMenuOpen(false)
    setExternalThemeMenuOpen?.(false)
  })

  const { t } = useTranslation()
  const { setTheme, theme: selectedTheme } = useTheme()

  return (
    <div
      ref={clickAwayThemeRef}
      className={cn('cursor-pointer group relative', connected && 'w-full')}
    >
      <div
        onClick={() => {
          setThemeMenuOpen(!themeMenuOpen)
          setExternalThemeMenuOpen?.(!themeMenuOpen)
        }}
        className={cn(
          'flex justify-between items-center rounded-md transition-opacity cursor-pointer',
          connected && 'group-hover:bg-slate-100 p-3 dark:group-hover:bg-zinc-400/20 w-full'
        )}
      >
        {connected && <FiArrowLeft className='text-xl' />}
        <div className='flex items-center justify-end gap-2'>
          <p className={cn(connected ? 'text-2xl' : 'text-3xl')}>
            {themesWithIcons.find(({ theme }) => theme === selectedTheme)?.icon}
          </p>
          {connected && <p className='capitalize font-bold'>{t(selectedTheme || 'system')}</p>}
        </div>
      </div>
      <div
        className={cn(
          'absolute group-hover:block min-w-[190px] block z-50',
          connected
            ? '-right-[198px] sm:right-[97.2%] -top-[4px] sm:-top-[6px] sm:pr-5'
            : 'top-[100%] pt-3 -left-10',
          themeMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className='flex flex-col gap-2 w-full min-w-[190px] max-h-[75vh] sm:max-h-[80vh] overflow-scroll border-[3px] rounded-lg bg-white/90 dark:bg-darkGrey/90 border-zinc-200 dark:border-zinc-500 p-1  shadow-md'>
          <div
            onClick={() => {
              setThemeMenuOpen(false)
              setExternalThemeMenuOpen?.(false)
            }}
            className={cn(
              'flex sm:hidden justify-between items-center w-full group-hover:bg-slate-100 dark:group-hover:bg-zinc-400/20  dark:hover:bg-zinc-400/20 p-3 rounded-md transition-opacity cursor-pointer',
              connected ? 'flex sm:hidden' : 'hidden'
            )}
          >
            <FiArrowLeft className='text-xl' />
            <p className='font-bold'>Back</p>
          </div>
          {themesWithIcons.map(({ theme, icon }) => (
            <div
              className='flex items-center relative p-3 pl-8 w-full gap-2 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-400/20'
              key={theme}
              onClick={() => {
                setTheme(theme as ThemeType)
                setThemeMenuOpen(false)
                setExternalThemeMenuOpen?.(false)
                closeMenu?.()
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
              <p className={connected ? 'text-2xl' : 'text-3xl'}>{icon}</p>
              <p className='text-nowrap capitalize font-bold'>{t(theme)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ThemeSwitcher
