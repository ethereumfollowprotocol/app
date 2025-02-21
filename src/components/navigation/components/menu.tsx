'use client'

import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
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
        open
          ? '-translate-y-mobile-menu flex sm:flex sm:translate-y-0 sm:opacity-100 starting:translate-y-0'
          : 'translate-y-12 sm:hidden sm:translate-y-0 sm:opacity-0',
        'top-screen fixed left-0 h-fit w-full overflow-hidden transition-all transition-discrete group-hover/hamburger:flex sm:absolute sm:-top-2 sm:left-full sm:z-50 sm:h-fit sm:w-fit sm:overflow-visible sm:pl-8 sm:opacity-0 sm:group-hover/hamburger:opacity-100 sm:starting:opacity-0 sm:starting:group-hover/hamburger:opacity-0'
      )}
    >
      <div
        className={cn(
          isExtraMenuOpen && '-translate-x-full sm:translate-x-0',
          'bg-neutral sm:shadow-medium flex h-fit w-full flex-col overflow-x-visible rounded-sm transition-all sm:h-auto sm:max-h-[80vh] sm:w-60'
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
            className='hover:bg-nav-item text-text block w-full rounded-sm p-4 font-bold capitalize transition-colors'
          >
            <p>{t(link.text)}</p>
          </Link>
        ))}
        <div className='flex w-full items-center justify-between p-4'>
          {socials.map((item) => (
            <a
              target='_blank'
              rel='noreferrer'
              key={item.text}
              href={item.href}
              className='text-3xl transition-transform hover:scale-125'
            >
              <Image src={item.icon} alt={item.text} width={36} height={36} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Menu
