'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAccount } from 'wagmi'

import { Search } from '../search'
import Logo from 'public/assets/logo.svg'
import NavItems from './components/nav-items.tsx'
import FullLogo from 'public/assets/logo-full.svg'
import WalletMenu from './components/wallet-menu.tsx'
import CartButton from './components/cart-button.tsx'
import Integrations from './components/integrations.tsx'
import FullLogoDark from 'public/assets/logo-full-dark.svg'

const Desktop: React.FC = () => {
  const { address: userAddress } = useAccount()

  return (
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
      <div className='flex gap-4 xl:gap-6 w-3/4 sm:w-full lg:w-3/4 justify-end items-center'>
        <div className='items-center gap-1.5 hidden lg:flex'>
          <NavItems />
          {userAddress && <CartButton />}
        </div>
        <Integrations />
        <WalletMenu />
      </div>
    </nav>
  )
}

export default Desktop
