'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useTheme } from 'next-themes'
import { track } from '@vercel/analytics/react'
import { useIsClient } from '@uidotdev/usehooks'

import i18n from '#/app/i18n'
import { Search } from '../search'
import Logo from 'public/assets/logo.svg'
import NavItems from './components/nav-items.tsx'
import FullLogo from 'public/assets/logo-full.svg'
import WalletMenu from './components/wallet-menu.tsx'
import CartButton from './components/cart-button.tsx'
import { useCart } from '#/contexts/cart-context.tsx'
import Integrations from './components/integrations.tsx'
import { LANGUAGES } from '#/lib/constants/languages.ts'
import { useSounds } from '#/contexts/sounds-context.tsx'
import FullLogoDark from 'public/assets/logo-full-dark.svg'

const Navigation = () => {
  const isClient = useIsClient()
  const { totalCartItems } = useCart()
  const { address: userAddress } = useAccount()
  const { resolvedTheme, setTheme } = useTheme()
  const { backgroundMusicRef, backgroundSoundsMuted } = useSounds()

  useEffect(() => {
    if (resolvedTheme === 'halloween') setTheme('system')
    if (isClient)
      track(
        `Loaded with language ${
          LANGUAGES.find(lang => lang.key === i18n.language)?.englishLanguage
        }`
      )
  }, [isClient])

  return (
    <header className='w-full fixed z-50 glass-card bg-white/50 dark:bg-black/75 halloween:bg-black/85 top-0 left-0 border-b-[3px] border-grey p-4 lg:px-6 xl:px-8'>
      {!backgroundSoundsMuted && (
        <audio
          ref={backgroundMusicRef}
          src={resolvedTheme === 'halloween' ? '/assets/background-music/halloween.mp3' : ''}
          autoPlay={true}
          loop={true}
        />
      )}
      <nav className='my-auto flex w-full flex-row items-center justify-between'>
        <div className='flex w-fit lg:w-2/5 2xl:w-1/3 justify-start items-center gap-4 md:gap-6 xl:gap-6'>
          <Link href='/' className='select-none' aria-label='Ethereum Follow Protocol Logo link'>
            <Image
              src={FullLogo}
              priority={true}
              className='hidden light:sm:block sm:max-w-[120px] select-none hover:scale-110 transition-transform'
              alt={'Ethereum Follow Protocol Logo'}
            />
            <Image
              src={FullLogoDark}
              priority={true}
              className='hidden dark:sm:block sm:max-w-[120px] select-none hover:scale-110 transition-transform'
              alt={'Ethereum Follow Protocol Logo'}
            />
            {/* <Image
              src={FullLogoHalloween}
              priority={true}
              className="hidden halloween:sm:block sm:max-w-[120px] select-none hover:scale-110 transition-transform"
              alt={"Ethereum Follow Protocol Logo"}
            /> */}
            <Image
              src={Logo}
              priority={true}
              className='w-[56px] halloween:hidden sm:hidden select-none hover:scale-110 transition-transform'
              alt='Ethereum Follow Protocol Logo'
            />
            {/* <Image
              src={LogoHalloween}
              priority={true}
              className="w-[56px] hidden halloween:block halloween:sm:hidden select-none hover:scale-110 transition-transform"
              alt="Ethereum Follow Protocol Logo"
            /> */}
          </Link>
          <Search size='w-fit max-w-[200px] lg:w-5/6 xl:w-full xxs:max-w-[350px]' />
        </div>
        <div className='flex lg:gap-4 xl:gap-6 w-3/4 sm:w-full lg:w-3/4 justify-end items-center'>
          <div className='flex items-center gap-1.5'>
            <NavItems />
            {userAddress ? <CartButton cartItemsCount={totalCartItems} /> : null}
          </div>
          <Integrations />
          <WalletMenu />
        </div>
      </nav>
    </header>
  )
}

export default Navigation
