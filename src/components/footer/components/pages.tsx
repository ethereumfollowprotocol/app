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
    text: 'support',
    href: 'https://discord.com/channels/1172042210024366090/1280308522613211237',
    target: '_blank'
  },
  {
    text: 'bug bounty',
    href: 'https://docs.ethfollow.xyz/bugbounty',
    target: '_blank'
  }
]

const Pages = () => {
  const { t } = useTranslation()

  return (
    <div className='flex flex-wrap w-52 gap-x-8 gap-y-4'>
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
