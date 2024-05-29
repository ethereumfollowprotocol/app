'use client'

import { useTranslation } from 'react-i18next'

const footerPages = [
  {
    text: 'team',
    href: 'https://github.com/orgs/ethereumfollowprotocol/people'
  },
  {
    text: 'docs',
    href: 'https://docs.ethfollow.xyz'
  }
]

const Pages = () => {
  const { t } = useTranslation()

  return (
    <>
      {footerPages.map((route, index) => (
        <div className='inline font-bold' key={`route-${route.href}`}>
          <a href={route.href} className={`text-lg text-pink-400`} target='_blank' rel='noreferrer'>
            <span>{t(`footer.${route.text}`)}</span>
          </a>
        </div>
      ))}
    </>
  )
}

export default Pages
