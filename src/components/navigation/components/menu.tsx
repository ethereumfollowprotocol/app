'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useState, type Dispatch, type SetStateAction } from 'react'

import { cn } from '#/lib/utilities'
import { socials } from '#/components/footer'
import { EXTERNAL_LINKS } from '#/lib/constants'
import VolumeSwitcher from '../../volume-switcher'
import LanguageSelector from '../../language-selector'
import ThemeSwitcher from '#/components/theme-switcher'

interface MenuProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Menu: React.FC<MenuProps> = ({ open, setOpen }) => {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const [volumeMenuOpen, setVolumeMenuOpen] = useState(false)
  const [languageMenOpenu, setLanguageMenuOpen] = useState(false)

  const { t } = useTranslation()
  const isExtraMenuOpen = languageMenOpenu || themeMenuOpen || volumeMenuOpen

  return (
    <div
      className={clsx(
        open ? 'flex' : 'hidden',
        'absolute -top-full left-full z-50 overflow-hidden pt-1 pl-4 group-hover/hamburger:flex sm:overflow-visible'
      )}
    >
      <div
        className={cn(
          isExtraMenuOpen && '-translate-x-[244px] lg:translate-x-0',
          'bg-neutral flex max-h-[80vh] w-full flex-col overflow-x-visible p-1 shadow-xl transition-all lg:h-auto'
        )}
      >
        <ThemeSwitcher
          setExternalThemeMenuOpen={setThemeMenuOpen}
          closeMenu={() => {
            setOpen(false)
            setThemeMenuOpen(false)
            setOpen(false)
          }}
        />
        <LanguageSelector setExternalLanguageMenuOpen={setLanguageMenuOpen} setParentOpen={setOpen} />
        <VolumeSwitcher
          setExternalVolumeMenuOpen={setVolumeMenuOpen}
          closeMenu={() => {
            setOpen(false)
            setVolumeMenuOpen(false)
          }}
        />
        {EXTERNAL_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.target}
            onClick={() => setOpen(false)}
            className='hover:bg-navItem text-text block w-full rounded-md p-3 font-bold capitalize transition-colors'
          >
            <p className='text-end'>{t(link.text)}</p>
          </Link>
        ))}
        <div className='flex w-full items-center justify-between p-3'>
          {socials.map((item) => (
            <a
              target='_blank'
              rel='noreferrer'
              key={item.text}
              href={item.href}
              className='text-3xl transition-transform hover:scale-125'
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
