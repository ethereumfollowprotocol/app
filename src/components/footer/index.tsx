import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import Pages from './components/pages'

export const socials = [
  {
    text: 'X',
    href: 'https://x.com/efp',
    icon: <FaXTwitter />,
  },
  {
    text: 'GitHub',
    href: 'https://github.com/ethereumfollowprotocol',
    icon: <FaGithub />,
  },
  /**
   * TODO: add Discord link once we have one
   */
  {
    text: 'Discord',
    href: 'https://discord.com/invite/ZUyG3mSXFD',
    icon: <FaDiscord />,
  },
]

const Footer = () => {
  return (
    <footer className='glass-card z-20 flex w-full items-center justify-center border-t-2 border-t-[#aaaaaa] py-8 md:py-16'>
      <div className='xxs:gap-6 flex h-full w-full items-center justify-center gap-4 sm:gap-28 md:gap-44'>
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
            <div className='flex w-52 items-center gap-8 sm:gap-10'>
              {socials.map((item) => (
                <a
                  target='_blank'
                  rel='noreferrer'
                  key={item.text}
                  href={item.href}
                  className='text-4xl transition-transform hover:scale-110'
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

export default Footer
