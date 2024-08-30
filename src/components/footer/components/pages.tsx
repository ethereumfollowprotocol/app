'use client'

import { useTranslation } from 'react-i18next'

const footerPages = [
  {
    text: 'team',
    href: '/team',
    target: ''
  },
  {
    text: 'docs',
    href: 'https://docs.ethfollow.xyz/intro',
    target: '_blank'
  },
  {
    text: 'Bug Bounty',
    href: 'https://docs.ethfollow.xyz/bugbounty',
    target: '_blank'
  }
]

const Pages = () => {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col gap-2'>
      {footerPages.map((route, index) => (
        <div
          className='font-bold hover:scale-110 w-fit transition-transform'
          key={`route-${route.href}`}
        >
          <a
            href={route.href}
            className={`text-lg text-pink-400`}
            target={route.target}
            rel='noreferrer'
          >
            <span>{t(route.text)}</span>
          </a>
        </div>
      ))}
    </div>
  )
}

export default Pages
