'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { cn } from '#/lib/utilities'
import { EXTERNAL_LINKS, LANGUAGES, NAV_ITEMS } from '#/lib/constants'
import { usePathname } from 'next/navigation'
import LanguageSelector from './language-selector'
import ThemeSwitcher from '#/components/theme-switcher'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { FiExternalLink } from 'react-icons/fi'
import { socials } from '#/components/footer'

interface MenuProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Menu: React.FC<MenuProps> = ({ open, setOpen }) => {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const [languageMenOpenu, setLanguageMenuOpen] = useState(false)

  const pathname = usePathname()
  const { t } = useTranslation()
  const { openConnectModal } = useConnectModal()
  const { address: userAddress } = useAccount()
  const { selectedList, lists } = useEFPProfile()
  const itemUrl =
    pathname?.toLowerCase() === `/${userAddress?.toLowerCase()}` &&
      selectedList === Number(lists?.primary_list)
      ? userAddress?.toLowerCase()
      : selectedList?.toString() ?? userAddress?.toLowerCase()

  if (!open) return null

  return (
    <div className={cn('bg-neutral w-fit min-w-[220px] z-50 overflow-x-hidden sm:overflow-visible shadow-md border-[3px] transition-transform rounded-md border-grey absolute top-[120%] flex flex-col items-end -left-[90px]',
    )}>
      <div
        className={cn(
          'flex flex-col w-full transition-all overflow-x-visible max-h-[75vh] sm:h-auto p-1',
          languageMenOpenu || themeMenuOpen
            ? '-translate-x-[216px] sm:translate-x-0'
            : '',
          languageMenOpenu
            ? `h-[${(LANGUAGES.length || 0) * 56 + 111}px]`
            : themeMenuOpen
              ? 'h-[223px]'
              : 'h-auto'
        )}
        style={{
          height: languageMenOpenu
            ? `${(lists?.lists?.length || 0) * 56 + 111}px`
            : themeMenuOpen
              ? '223px'
              : 'auto'
        }}
      >
        {NAV_ITEMS.map(item => (
          <div className='font-bold w-full lg:hidden' key={`${item.name}`}>
            <Link
              prefetch={true}
              href={item.href(itemUrl)}
              className='capitalize block lg:text-lg transition-colors p-3 w-full rounded-md hover:bg-navItem text-text'
              onClick={e => {
                if (item.name === 'profile' && !userAddress && openConnectModal) {
                  e.preventDefault()
                  openConnectModal()
                } else setOpen(false)
              }}
            >
              <span className='block text-nowrap text-end'>{t(`${item.name}`)}</span>
            </Link>
          </div>
        ))}
        <div className='font-bold w-full' key='team'>
          <Link
            prefetch={true}
            href={'/team'}
            className='capitalize block lg:text-lg transition-colors p-3 w-full rounded-md hover:bg-navItem text-text'
          >
            <span className='block text-nowrap text-end'>{t('team')}</span>
          </Link>
        </div>
        <div className='font-bold w-full' key='about'>
          <Link
            prefetch={true}
            href={'/about'}
            className='capitalize  block lg:text-lg transition-colors p-3 w-full rounded-md hover:bg-navItem text-text'
          >
            <span className='block text-nowrap text-end'>{t('about')}</span>
          </Link>
        </div>
        <ThemeSwitcher connected={true} setExternalThemeMenuOpen={setThemeMenuOpen} closeMenu={() => {
          setOpen(false)
          setThemeMenuOpen(false)
        }}
        />
        <LanguageSelector setExternalLanguageMenuOpen={setLanguageMenuOpen} />
        {EXTERNAL_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            target={link.target}
            className='capitalize block transition-colors p-3 w-full rounded-md hover:bg-navItem text-text font-bold'
          >
            <div className='w-full flex items-center justify-between'>
              <FiExternalLink className='text-xl' />
              <p className='block text-nowrap text-end'>{link.text}</p></div>
          </Link>
        ))}
        <div className='flex items-center w-full justify-between p-3'>
          {socials.map(item => (
            <a
              target='_blank'
              rel='noreferrer'
              key={item.text}
              href={item.href}
              className='hover:scale-110 text-3xl transition-transform'
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div >
  )
}

export default Menu
