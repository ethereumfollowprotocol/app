import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useClickAway } from '@uidotdev/usehooks'

import { Search } from '../search'
import { cn } from '#/lib/utilities.ts'
import Logo from 'public/assets/logo.svg'
import NavItems from './components/nav-items.tsx'
import FullLogo from 'public/assets/logo-full.svg'
import MobileMenu from './components/menu.tsx'
import CartButton from './components/cart-button.tsx'
import { useCart } from '#/contexts/cart-context.tsx'
import FullLogoDark from 'public/assets/logo-full-dark.svg'
import ConnectButton from './components/connect-button.tsx'
import LogoHalloween from 'public/assets/logo-halloween.svg'
import FullLogoHalloween from 'public/assets/logo-full-halloween.svg'

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { address: userAddress } = useAccount()
  const { totalCartItems } = useCart()

  const clickAwayRef = useClickAway<HTMLDivElement>(_ => {
    setMobileMenuOpen(false)
  })

  return (
    <header className='w-full fixed z-50 glass-card bg-white/50 dark:bg-black/75 halloween:bg-black/85 top-0 left-0 border-b-[3px] border-grey p-4 lg:px-6 md:py-6 xl:px-8'>
      <nav className='my-auto flex w-full flex-row items-center justify-between'>
        <div className='flex w-fit lg:w-1/4 2xl:w-1/3 justify-start items-center gap-4 md:gap-6 xl:gap-8'>
          <Link href='/' className='select-none' aria-label='Ethereum Follow Protocol Logo link'>
            <Image
              src={FullLogo}
              priority={true}
              className='hidden light:sm:block sm:max-w-[130px] select-none hover:scale-110 transition-transform'
              alt={'Ethereum Follow Protocol Logo'}
            />
            <Image
              src={FullLogoDark}
              priority={true}
              className='hidden dark:sm:block sm:max-w-[130px] select-none hover:scale-110 transition-transform'
              alt={'Ethereum Follow Protocol Logo'}
            />
            <Image
              src={FullLogoHalloween}
              priority={true}
              className='hidden halloween:sm:block sm:max-w-[130px] select-none hover:scale-110 transition-transform'
              alt={'Ethereum Follow Protocol Logo'}
            />
            <Image
              src={Logo}
              priority={true}
              className='w-[56px] halloween:hidden sm:hidden select-none hover:scale-110 transition-transform'
              alt='Ethereum Follow Protocol Logo'
            />
            <Image
              src={LogoHalloween}
              priority={true}
              className='w-[56px] hidden halloween:block halloween:sm:hidden select-none hover:scale-110 transition-transform'
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
            ) : null}
            <div ref={clickAwayRef} className='relative'>
              <div
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn('flex hover:scale-110 cursor-pointer group relative transition-all items-center justify-center gap-[5px] flex-col h-12 w-12 glass-card border-[3px] rounded-full hover:border-text border-zinc-400',
                  mobileMenuOpen ? 'border-text' : 'border-zinc-400 group-hover:border-text'
                )}
              >
                <div className={cn('w-5 h-[3px] rounded-full transition-all', mobileMenuOpen ? 'bg-text' : 'bg-zinc-400 group-hover:bg-text')}></div>
                <div className={cn('w-5 h-[3px] rounded-full transition-all', mobileMenuOpen ? 'bg-text' : 'bg-zinc-400 group-hover:bg-text')}></div>
                <div className={cn('w-5 h-[3px] rounded-full transition-all', mobileMenuOpen ? 'bg-text' : 'bg-zinc-400 group-hover:bg-text')}></div>
              </div>
              {mobileMenuOpen && <MobileMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />}
            </div>

            <ConnectButton />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navigation
