import Image from 'next/image'
import X from 'public/assets/icons/socials/x.svg'
import Github from 'public/assets/icons/socials/github.svg'
import Discord from 'public/assets/icons/socials/discord.svg'
import Pages from './components/pages'

const socials = [
  {
    text: 'X',
    href: 'https://x.com/ethfollowpr',
    icon: X
  },
  {
    text: 'GitHub',
    href: 'https://github.com/ethereumfollowprotocol',
    icon: Github
  },
  /**
   * TODO: add Discord link once we have one
   */
  {
    text: 'Discord',
    href: 'https://discord.com/invite/hDTFKmxwwV',
    icon: Discord
  }
]

export function Footer() {
  return (
    <footer className='w-full font-sans z-20 flex justify-center border-t-2 border-t-pink bg-white py-8 md:py-16 items-center'>
      <div className='flex flex-row items-center justify-center h-full w-full gap-6 sm:gap-28 md:gap-44'>
        <section className='flex gap-5 align-middle'>
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
            <div className='flex items-center gap-10'>
              {socials.map(item => (
                <a target='_blank' rel='noreferrer' key={item.text} href={item.href}>
                  <Image src={item.icon} className='w-8' alt={item.text} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}
