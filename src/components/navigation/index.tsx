import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAccount } from 'wagmi'
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
import ConnectButton from './components/connect-button.tsx'
import ArrowDown from 'public/assets/icons/arrow-down.svg'

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
    <header className='w-full fixed z-50 glass-card bg-white/50 top-0 left-0 font-sans border-b-[1px] border-gray-200 p-4 lg:px-6 md:py-6 xl:px-8'>
      <nav className='my-auto flex w-full flex-row items-center justify-between'>
        <div className='flex w-fit sm:w-full justify-start items-center gap-4 md:gap-6 xl:gap-8'>
          <Link href='/' className='select-none' aria-label='Ethereum Follow Protocol Logo link'>
            <Image
              src={FullLogo}
              className='hidden sm:block sm:w-[186px] select-none'
              alt='Ethereum Follow Protocol Logo'
            />
            <Image
              src={Logo}
              className='w-12 sm:hidden select-none'
              alt='Ethereum Follow Protocol Logo'
            />
          </Link>
          <div className='sm:w-3/5 md:w-full'>
            <Search size='md:w-4/5 xl:w-full max-w-[400px]' />
          </div>
        </div>
        <div className='flex lg:gap-6 xl:gap-8 items-center'>
          <NavItems />
          <div className='flex items-center gap-2 md:gap-4 xl:gap-6'>
            {userAddress ? (
              <CartButton cartItemsCount={totalCartItems} />
            ) : (
              <div
                ref={clickAwayLanguageRef}
                className='w-8 z-50 sm:w-10 mr-2 lg:mr-4 cursor-pointer group relative'
              >
                <div
                  onClick={() => setLanguageMenuOpen(!languageMenOpenu)}
                  className='flex gap-1 sm:gap-2 items-center w-full'
                >
                  <p className='group-hover:opacity-80 uppercase transition-opacity font-semibold'>
                    {selectedLanguage?.key}
                  </p>
                  <Image
                    src={ArrowDown}
                    alt='Show languages'
                    width={12}
                    className='group-hover:opacity-80 transition-opacity'
                  />
                </div>
                <div
                  className={`absolute -left-4 top-4 ${
                    languageMenOpenu ? 'block' : 'hidden'
                  } group-hover:block pt-4`}
                >
                  <div className='flex flex-col gap-2 glass-card bg-white/90 border-2 border-gray-200 px-4 py-2 rounded-lg shadow-md'>
                    {LANGUAGES.map(lang => (
                      <p
                        className=' text-darkGrey font-semibold hover:text-gray-500 transition-colors'
                        key={lang.language}
                        onClick={() => changeLanguage(lang)}
                      >
                        {lang.language}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={clickAwayRef} className='lg:hidden relative'>
              <div
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='flex cursor-pointer hover:opacity-75 relative transition-opacity lg:hidden gap-[5px] flex-col p-[10px] glass-card border-2 rounded-md border-gray-200'
              >
                <div className='w-5 h-[3px] bg-darkGrey rounded-full'></div>
                <div className='w-5 h-[3px] bg-darkGrey rounded-full'></div>
                <div className='w-5 h-[3px] bg-darkGrey rounded-full'></div>
              </div>
              <MobileMenu open={mobileMenuOpen} />
            </div>
            <ConnectButton />
            {/* <Menu /> */}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navigation
