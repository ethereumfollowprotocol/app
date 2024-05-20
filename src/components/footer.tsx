import Image from 'next/image'

const footerLinks = [
  {
    text: 'Docs',
    href: 'https://docs.ethfollow.xyz'
  },
  /**
   * TODO: update with proper link
   */
  {
    text: 'Team',
    href: 'https://github.com/orgs/ethereumfollowprotocol/people'
  },
  {
    text: 'GitHub',
    href: 'https://github.com/ethereumfollowprotocol'
  },
  {
    text: 'X',
    href: 'https://x.com/ethfollowpr'
  },
  /**
   * TODO: add Discord link once we have one
   */
  {
    text: 'Discord',
    href: 'https://x.com/ethfollowpr'
  }
]

export function Footer() {
  return (
    <footer className='bottom-0 mx-auto mt-4 w-full font-sans'>
      <div className='flex flex-row items-center justify-center h-full w-full space-x-28 bg-[#FFE067]'>
        <section className='flex space-x-5 align-middle'>
          <div className='my-auto'>
            <div className='table-caption max-w-md text-4xl font-extrabold text-pink-400'>
              Ethereum Follow Protocol
            </div>
          </div>
          <Image src='/assets/logo.png' width={160} height={160} alt='Ethereum Follow Protocol' />
        </section>
        <section className='my-auto flex align-middle'>
          <ul className='my-auto flex flex-col space-y-1 text-center'>
            {footerLinks.map((route, index) => (
              <li className='inline font-extrabold' key={`route-${route.href}`}>
                <a href={route.href} className={`text-pink-400`}>
                  <span>{route.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </footer>
  )
}
