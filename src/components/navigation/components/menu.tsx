'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useState, type Dispatch, type SetStateAction } from 'react'

import { cn } from '#/lib/utilities'
import { socials } from '#/components/footer'
import { EXTERNAL_LINKS } from '#/lib/constants'
import LanguageSelector from '../../language-selector'
import VolumeSwitcher, { volumeOptions } from '../../volume-switcher'
import ThemeSwitcher, { themesWithIcons } from '#/components/theme-switcher'

interface MenuProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Menu: React.FC<MenuProps> = ({ open, setOpen }) => {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const [volumeMenuOpen, setVolumeMenuOpen] = useState(false)
  const [languageMenOpenu, setLanguageMenuOpen] = useState(false)

  const { t } = useTranslation()

  if (!open) return null

  return (
    <div className='bg-neutral w-[244px] h-fit nav-menu -z-20 overflow-x-hidden lg:overflow-visible shadow-md border-[3px] transition-all rounded-xl lg:rounded-md border-grey pb-6 lg:pb-0 lg:pt-8 absolute bottom-6 lg:top-5 flex flex-col items-end right-0'>
      <div
        className={cn(
          'flex flex-col w-full transition-all overflow-x-visible max-h-[80vh] lg:h-auto p-1',
          languageMenOpenu || themeMenuOpen || volumeMenuOpen
            ? '-translate-x-[244px] lg:translate-x-0'
            : ''
        )}
        style={{
          height: languageMenOpenu
            ? // ? `${(LANGUAGES.length || 0) * 56 + 111}px`
              'auto'
            : themeMenuOpen
              ? `${(themesWithIcons.length || 0) * 56 + 56}px`
              : volumeMenuOpen
                ? `${(volumeOptions.length || 0) * 56 + 56}px`
                : 'auto'
        }}
      >
        <ThemeSwitcher
          setExternalThemeMenuOpen={setThemeMenuOpen}
          closeMenu={() => {
            setOpen(false)
            setThemeMenuOpen(false)
            setOpen(false)
          }}
        />
        <LanguageSelector
          setExternalLanguageMenuOpen={setLanguageMenuOpen}
          setParentOpen={setOpen}
        />
        <VolumeSwitcher
          setExternalVolumeMenuOpen={setVolumeMenuOpen}
          closeMenu={() => {
            setOpen(false)
            setVolumeMenuOpen(false)
          }}
        />
        {EXTERNAL_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            target={link.target}
            onClick={() => setOpen(false)}
            className='capitalize block transition-colors p-3 w-full rounded-md hover:bg-navItem text-text font-bold'
          >
            <p className='text-end'>{t(link.text)}</p>
          </Link>
        ))}
        <div className='flex items-center w-full justify-between p-3'>
          {socials.map(item => (
            <a
              target='_blank'
              rel='noreferrer'
              key={item.text}
              href={item.href}
              className='hover:scale-125 text-3xl transition-transform'
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Menu
