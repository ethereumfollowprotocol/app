import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useClickAway } from '@uidotdev/usehooks'

import Logo from 'public/assets/logo.svg'
import FullLogo from 'public/assets/logo-full.svg'
import { Search } from '../../components/search.tsx'
import { useCart } from '../../contexts/cart-context'
import CartButton from './components/cart-button.tsx'
import ConnectButton from './components/connect-button.tsx'
import MobileMenu from './components/mobile-menu.tsx'
import NavItems from './components/nav-items.tsx'

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { totalCartItems } = useCart()
  const { address: userAddress } = useAccount()
  const clickAwayRef = useClickAway<HTMLDivElement>(_ => {
    setMobileMenuOpen(false)
  })

  return (
    <header className='w-full fixed z-50 glass-card bg-white/50 top-0 left-0 font-sans border-b-[1px] border-gray-200 p-4 lg:px-6 md:py-6 xl:px-8'>
      <nav className='my-auto flex w-full flex-row items-center justify-between'>
        <div className='flex sm:w-full justify-start items-center gap-6 xl:gap-8'>
          <Link href='/' className='select-none' aria-label='Ethereum Follow Protocol Logo link'>
            <Image
              src={FullLogo}
              className='hidden sm:block sm:w-36 select-none'
              alt='Ethereum Follow Protocol Logo'
            />
            <Image
              src={Logo}
              className='w-12 sm:hidden select-none'
              alt='Ethereum Follow Protocol Logo'
            />
          </Link>
          <div className='hidden md:block w-full'>
            <Search size='md:w-4/5 xl:w-full max-w-[400px]' />
          </div>
        </div>
        <div className='flex lg:gap-6 xl:gap-12 items-center'>
          <NavItems />
          <div className='flex items-center gap-2 md:gap-4 xl:gap-6'>
            {userAddress && <CartButton cartItemsCount={totalCartItems} />}
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
