import Image from 'next/image'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { HiOutlineDesktopComputer } from 'react-icons/hi'

import i18n from '#/app/i18n'
import { cn } from '#/lib/utilities'
import GreenCheck from 'public/assets/icons/ui/check-green.svg'

export const themesWithIcons = [
  {
    theme: 'system',
    icon: <HiOutlineDesktopComputer />,
    language: undefined,
  },
  {
    theme: 'light',
    icon: <MdLightMode />,
    language: undefined,
  },
  {
    theme: 'dark',
    icon: <MdDarkMode />,
    language: undefined,
  },
  // {
  //   theme: "halloween",
  //   icon: <GiPumpkinLantern />,
  //   language: "halloween",
  // },
]

const themes = ['system', 'light', 'dark'] as const
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

  const { t } = useTranslation()
  const { setTheme, theme: selectedTheme } = useTheme()

  return (
    <div ref={clickAwayThemeRef} className='group relative h-full w-full cursor-pointer'>
      <div
        onClick={() => {
          setThemeMenuOpen(!themeMenuOpen)
          setExternalThemeMenuOpen?.(!themeMenuOpen)
        }}
        className='group-hover:bg-navItem flex w-full cursor-pointer items-center justify-between rounded-md p-3 transition-opacity'
      >
        <FiArrowLeft className='text-xl' />
        <div className='flex items-center justify-end gap-2'>
          <p className='text-2xl'>{themesWithIcons.find(({ theme }) => theme === selectedTheme)?.icon}</p>
          <p className='font-bold capitalize'>{t(selectedTheme || 'system')}</p>
        </div>
      </div>
      <div
        className={cn(
          'absolute -top-[7px] -right-[251px] z-50 block h-[250px] min-w-[246px] group-hover:block lg:left-[97.2%] lg:h-[174px] lg:pr-5',
          themeMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className='bg-neutral border-grey flex h-full max-h-[80vh] w-full flex-col gap-2 rounded-sm border-[3px] p-1 shadow-md lg:max-h-[90vh]'>
          <div
            onClick={() => {
              setThemeMenuOpen(false)
              setExternalThemeMenuOpen?.(false)
            }}
            className='hover:bg-navItem flex w-full cursor-pointer items-center justify-between rounded-md p-3 transition-opacity lg:hidden'
          >
            <FiArrowLeft className='text-xl' />
            <p className='font-bold'>Back</p>
          </div>
          {themesWithIcons.map(({ theme, icon, language }) => (
            <div
              className='hover:bg-navItem relative flex w-full items-center gap-2 rounded-md p-3 pl-8'
              key={theme}
              onClick={() => {
                setTheme(theme as ThemeType)
                setThemeMenuOpen(false)
                setExternalThemeMenuOpen?.(false)
                if (language) {
                  i18n.changeLanguage(language)
                }
                closeMenu?.()
              }}
            >
              {selectedTheme === theme && (
                <Image src={GreenCheck} alt='List selected' width={16} className='absolute top-[19px] left-2' />
              )}
              <p className='text-2xl'>{icon}</p>
              <p className='font-bold text-nowrap capitalize'>{t(theme)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ThemeSwitcher
