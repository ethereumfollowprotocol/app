'use client'

import { projectLinks } from '#/lib/constants.ts'

/**
 * TODO
 */

export function Footer() {
  return (
    <footer className='px-6 fixed bottom-1 hidden'>
      <div className='fixed bottom-2 left-0 w-full px-4 rounded-3xl space-x-3 capitalize'>
        {projectLinks.map((link, index) => (
          <a
            key={index}
            className='capitalize'
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
          >
            {link.text}
          </a>
        ))}
      </div>
    </footer>
  )
}
