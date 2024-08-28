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
import ArrowDown from 'public/assets/icons/arrow-down.svg'
import ConnectButton from './components/connect-button.tsx'
import GreenCheck from 'public/assets/icons/check-green.svg'

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
      <nav className='my-auto flex w-full flex-row items-center gap-4 justify-between'>
        <div className='flex w-2/5 justify-start items-center gap-4 md:gap-6 xl:gap-8'>
          <Link href='/' className='select-none' aria-label='Ethereum Follow Protocol Logo link'>
            <Image
              src={FullLogo}
              priority={true}
              className='hidden sm:block sm:max-w-[130px] select-none hover:scale-110 transition-transform'
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
        <div className='flex gap-6 lg:gap-6 xl:gap-8 w-3/4 sm:w-1/2 lg:w-2/3 justify-end items-center'>
          <NavItems />
          <div className='flex items-center gap-3 md:gap-5'>
            {userAddress ? (
              <CartButton cartItemsCount={totalCartItems} />
            ) : (
              <div
                ref={clickAwayLanguageRef}
                className='z-40 lg:mr-2 cursor-pointer group relative'
              >
                <div
                  onClick={() => setLanguageMenuOpen(!languageMenOpenu)}
                  className='flex gap-1 sm:gap-2 items-center w-full'
                >
                  <div className='flex gap-2 hover:opacity-75 font-semibold text-darkGrey'>
                    <Image src={selectedLanguage?.icon} alt='Language icon' width={26} />
                    <p className='hidden lg:block'>{selectedLanguage?.language}</p>
                  </div>
                  <Image
                    src={ArrowDown}
                    alt='Show languages'
                    width={12}
                    height={12}
                    className='group-hover:opacity-80 transition-opacity'
                  />
                </div>
                <div
                  className={`absolute -left-10 top-4 ${
                    languageMenOpenu ? 'block' : 'hidden'
                  } group-hover:block pt-4`}
                >
                  <div className='flex flex-col glass-card bg-white/90 border-[3px] border-gray-100 p-1 rounded-lg shadow-md'>
                    {LANGUAGES.map(lang => (
                      <div
                        className=' text-darkGrey p-3 pl-8 relative font-semibold rounded-md hover:bg-slate-100 transition-all'
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
                        <div className='flex gap-2 pr-5'>
                          <Image src={lang.icon} alt='Language icon' width={26} />
                          <p>{lang.language}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={clickAwayRef} className='lg:hidden relative'>
              <div
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='flex hover:scale-110 cursor-pointer group relative transition-all items-center justify-center lg:hidden gap-[5px] flex-col h-12 w-12 glass-card border-[3px] rounded-full  hover:border-darkGrey border-gray-400'
              >
                <div className='w-5 h-[3px] bg-gray-400 group-hover:bg-darkGrey rounded-full'></div>
                <div className='w-5 h-[3px] bg-gray-400 group-hover:bg-darkGrey rounded-full'></div>
                <div className='w-5 h-[3px] bg-gray-400 group-hover:bg-darkGrey rounded-full'></div>
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
