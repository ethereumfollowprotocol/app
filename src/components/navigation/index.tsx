import Link from 'next/link'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { lazy, Suspense, useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'

import { Search } from '../search'
import { cn } from '#/lib/utilities.ts'
import Logo from 'public/assets/logo.svg'
import useLanguage from './hooks/useLanguage.ts'
import NavItems from './components/nav-items.tsx'
import FullLogo from 'public/assets/logo-full.svg'
import { LANGUAGES } from '#/lib/constants/index.ts'
import MobileMenu from './components/mobile-menu.tsx'
import { useCart } from '../../contexts/cart-context'
import CartButton from './components/cart-button.tsx'
import FullLogoDark from 'public/assets/logo-full-dark.svg'
import ConnectButton from './components/connect-button.tsx'
import GreenCheck from 'public/assets/icons/check-green.svg'

const ThemeSwitcher = lazy(() => import('../theme-switcher'))

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageMenuSearch, setLanguageMenuSearch] = useState('')

  const { t } = useTranslation()
  const { totalCartItems } = useCart()
  const { address: userAddress } = useAccount()
  const clickAwayRef = useClickAway<HTMLDivElement>(_ => {
    setMobileMenuOpen(false)
  })

  const {
    changeLanguage,
    languageMenOpenu,
    selectedLanguage,
    setLanguageMenuOpen,
    setSelectedLanguage
  } = useLanguage()
  const clickAwayLanguageRef = useClickAway<HTMLDivElement>(_ => {
    setLanguageMenuOpen(false)
    setLanguageMenuSearch('')
  })

  const regularLanguages = LANGUAGES.filter(lang => !lang.special).filter(lang =>
    languageMenuSearch
      ? lang.language.toLowerCase().includes(languageMenuSearch.toLowerCase()) ||
        lang.englishLanguage.toLowerCase().includes(languageMenuSearch.toLowerCase())
      : true
  )
  const specialLanguages = LANGUAGES.filter(lang => !!lang.special).filter(lang =>
    languageMenuSearch
      ? lang.language.toLowerCase().includes(languageMenuSearch.toLowerCase()) ||
        lang.englishLanguage.toLowerCase().includes(languageMenuSearch.toLowerCase())
      : true
  )

  return (
    <header className='w-full fixed z-50 glass-card bg-white/50 dark:bg-black/75 top-0 left-0 border-b-[3px] border-zinc-200 dark:border-zinc-500 p-4 lg:px-6 md:py-6 xl:px-8'>
      <nav className='my-auto flex w-full flex-row items-center justify-between'>
        <div className='flex w-fit lg:w-1/4 2xl:w-1/3 justify-start items-center gap-4 md:gap-6 xl:gap-8'>
          <Link href='/' className='select-none' aria-label='Ethereum Follow Protocol Logo link'>
            <Image
              src={FullLogo}
              priority={true}
              className='hidden sm:block sm:max-w-[130px] dark:hidden select-none hover:scale-110 transition-transform'
              alt='Ethereum Follow Protocol Logo'
            />
            <Image
              src={FullLogoDark}
              priority={true}
              className='hidden dark:sm:block dark:sm:max-w-[130px] select-none hover:scale-110 transition-transform'
              alt='Ethereum Follow Protocol Logo'
            />
            <Image
              src={Logo}
              priority={true}
              className='w-[56px] sm:hidden select-none hover:scale-110 transition-transform'
              alt='Ethereum Follow Protocol Logo'
            />
          </Link>
          <Search size='w-fit max-w-[200px] lg:w-5/6 xl:w-full xxs:max-w-[350px]' />
        </div>
        <div className='flex lg:gap-4 xl:gap-6 w-3/4 sm:w-full lg:w-3/4 justify-end items-center'>
          <NavItems />
          <div className='flex items-center gap-3 md:gap-5'>
            {userAddress ? (
              <CartButton cartItemsCount={totalCartItems} />
            ) : (
              <>
                <Suspense fallback={<div>Auto</div>}>
                  <ThemeSwitcher />
                </Suspense>
                <div ref={clickAwayLanguageRef} className='z-40 cursor-pointer group relative'>
                  <div
                    onClick={() => setLanguageMenuOpen(!languageMenOpenu)}
                    className='flex gap-1 sm:gap-2 items-center w-full'
                  >
                    <div className='flex gap-2 hover:opacity-75 h-8 w-8 font-bold'>
                      <Image
                        key={selectedLanguage?.key}
                        src={selectedLanguage?.icon}
                        alt='Language icon'
                        width={30}
                        height={30}
                        className='rounded-md'
                      />
                    </div>
                  </div>
                  <div
                    className={cn(
                      'group-hover:grid absolute -right-36 rounded-lg top-6 pt-[19px]',
                      languageMenOpenu ? 'grid' : 'hidden'
                    )}
                  >
                    <div
                      className={cn(
                        'grid w-56 xs:w-[450px] grid-cols-1 xs:grid-cols-2 max-h-[75vh] overflow-scroll gap-x-px dark:bg-darkGrey bg-white border-[3px] border-zinc-200 dark:border-zinc-500 p-1 rounded-lg shadow-md'
                      )}
                    >
                      <div className='sm:col-span-2 p-3 flex flex-col gap-3 items-center'>
                        <input
                          type='text'
                          placeholder='Search'
                          value={languageMenuSearch}
                          onChange={e => setLanguageMenuSearch(e.target.value)}
                          className='w-full px-4 py-2 border-[3px] border-zinc-200 transition-colors dark:border-zinc-500 dark:focus:border-zinc-300 rounded-md focus:border-darkGrey/80'
                        />
                        {LANGUAGES.filter(lang =>
                          languageMenuSearch
                            ? lang.language
                                .toLowerCase()
                                .includes(languageMenuSearch.toLowerCase()) ||
                              lang.englishLanguage
                                .toLowerCase()
                                .includes(languageMenuSearch.toLowerCase())
                            : true
                        ).length === 0 && (
                          <div className='p-3'>
                            <p className='font-bold'>{t('search no results')}</p>
                          </div>
                        )}
                      </div>
                      {regularLanguages.map(lang => (
                        <div
                          className='p-3 pl-8 relative font-bold rounded-md hover:bg-slate-100 dark:hover:bg-zinc-400/20 transition-all'
                          key={lang.language}
                          onClick={() => {
                            changeLanguage(lang)
                            setSelectedLanguage(lang)
                            setLanguageMenuSearch('')
                            setLanguageMenuOpen(false)
                          }}
                        >
                          {selectedLanguage && selectedLanguage.key === lang.key && (
                            <Image
                              src={GreenCheck}
                              alt='List selected'
                              width={16}
                              className='absolute left-2 top-5'
                            />
                          )}
                          <div className='flex items-center gap-2'>
                            <Image
                              src={lang.icon}
                              alt='Language icon'
                              width={30}
                              height={30}
                              className='rounded-md'
                            />
                            <p className='text-nowrap w-fit'>{lang.language}</p>
                          </div>
                        </div>
                      ))}
                      {specialLanguages.length > 0 && regularLanguages.length > 0 && (
                        <div className='sm:col-span-2 p-3 flex flex-col gap-3 items-center'>
                          <hr className='border-[1px] rounded-full border-zinc-300 dark:border-zinc-500 w-full' />
                        </div>
                      )}
                      {specialLanguages.map(lang => (
                        <div
                          className='p-3 pl-8 relative font-bold rounded-md hover:bg-slate-100 dark:hover:bg-zinc-400/20 transition-all'
                          key={lang.language}
                          onClick={() => {
                            changeLanguage(lang)
                            setSelectedLanguage(lang)
                            setLanguageMenuSearch('')
                            setLanguageMenuOpen(false)
                          }}
                        >
                          {selectedLanguage && selectedLanguage.key === lang.key && (
                            <Image
                              src={GreenCheck}
                              alt='List selected'
                              width={16}
                              className='absolute left-2 top-5'
                            />
                          )}
                          <div className='flex items-center gap-2'>
                            <Image
                              src={lang.icon}
                              alt='Language icon'
                              width={30}
                              height={30}
                              className='rounded-md'
                            />
                            <p className='text-nowrap w-fit'>{lang.language}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div ref={clickAwayRef} className='lg:hidden relative'>
              <div
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='flex hover:scale-110 cursor-pointer group relative transition-all items-center justify-center lg:hidden gap-[5px] flex-col h-12 w-12 glass-card border-[3px] rounded-full  hover:border-darkGrey dark:hover:border-white border-zinc-400'
              >
                <div className='w-5 h-[3px] bg-zinc-400 group-hover:bg-darkGrey dark:group-hover:bg-white rounded-full'></div>
                <div className='w-5 h-[3px] bg-zinc-400 group-hover:bg-darkGrey dark:group-hover:bg-white rounded-full'></div>
                <div className='w-5 h-[3px] bg-zinc-400 group-hover:bg-darkGrey dark:group-hover:bg-white rounded-full'></div>
              </div>
              <MobileMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
            </div>
            <ConnectButton />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navigation
