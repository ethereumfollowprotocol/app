import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import Pages from './components/pages'

const socials = [
  {
    text: 'X',
    href: 'https://x.com/efp',
    icon: <FaXTwitter />
  },
  {
    text: 'GitHub',
    href: 'https://github.com/ethereumfollowprotocol',
    icon: <FaGithub />
  },
  /**
   * TODO: add Discord link once we have one
   */
  {
    text: 'Discord',
    href: 'https://discord.com/invite/ZUyG3mSXFD',
    icon: <FaDiscord />
  }
]

export function Footer() {
  return (
    <footer className='w-full  z-20 flex justify-center border-t-2 border-t-pink glass-card py-8 md:py-16 items-center'>
      <div className='flex items-center justify-center h-full w-full gap-4 xxs:gap-6 sm:gap-28 md:gap-44'>
        <section className='flex gap-4 align-middle'>
          <Image
            src='/assets/logo.png'
            width={180}
            height={180}
            alt='Ethereum Follow Protocol'
            className='w-[120px] sm:w-[180px]'
          />
        </section>
        <section className='my-auto flex align-middle'>
          <div className='my-auto flex flex-col justify-center gap-4 sm:gap-6'>
            <Pages />
            <div className='flex items-center w-52 gap-8 sm:gap-10'>
              {socials.map(item => (
                <a
                  target='_blank'
                  rel='noreferrer'
                  key={item.text}
                  href={item.href}
                  className='hover:scale-110 text-4xl transition-transform'
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}
