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
    href: 'https://docs.ethfollow.xyz',
    target: '_blank'
  }
]

const Pages = () => {
  const { t } = useTranslation()

  return (
    <>
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
    </>
  )
}

export default Pages
