import Link from 'next/link'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { lazy, Suspense, useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'

import { Search } from '../search'
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

  const { totalCartItems } = useCart()
  const { address: userAddress } = useAccount()
  const clickAwayRef = useClickAway<HTMLDivElement>(_ => {
    setMobileMenuOpen(false)
  })

  const { changeLanguage, languageMenOpenu, selectedLanguage, setLanguageMenuOpen } = useLanguage()
  const clickAwayLanguageRef = useClickAway<HTMLDivElement>(_ => {
    setLanguageMenuOpen(false)
  })

  return (
    <header className='w-full fixed z-50 glass-card bg-white/50 dark:bg-black/75 top-0 left-0  border-b-[1px] border-zinc-300 dark:border-zinc-500 p-4 lg:px-6 md:py-6 xl:px-8'>
      <nav className='my-auto flex w-full flex-row items-center justify-between'>
        <div className='flex w-2/5 justify-start items-center gap-4 md:gap-6 xl:gap-8'>
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
        <div className='flex lg:gap-6 xl:gap-6 w-3/4 sm:w-1/2 lg:w-2/3 justify-end items-center'>
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
                        src={selectedLanguage?.icon}
                        alt='Language icon'
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>
                  <div
                    className={`absolute -left-[39px] top-[86%] ${
                      languageMenOpenu ? 'block' : 'hidden'
                    } group-hover:block pt-4`}
                  >
                    <div className='flex flex-col glass-card dark:bg-black/80 bg-white/90 border-[3px] border-zinc-200 dark:border-zinc-500 p-1 rounded-lg shadow-md'>
                      {LANGUAGES.map(lang => (
                        <div
                          className=' p-3 pl-8 relative font-bold rounded-md hover:bg-slate-100 dark:hover:bg-zinc-400/20 transition-all'
                          key={lang.language}
                          onClick={() => {
                            changeLanguage(lang)
                            setLanguageMenuOpen(false)
                          }}
                        >
                          {selectedLanguage && selectedLanguage.key === lang.key && (
                            <Image
                              src={GreenCheck}
                              alt='List selected'
                              width={16}
                              className='absolute left-2 top-[17px]'
                            />
                          )}
                          <div className='flex items-center gap-2 pr-5'>
                            <Image src={lang.icon} alt='Language icon' width={30} height={30} />
                            <p>{lang.language}</p>
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
