'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useIsClient } from '@uidotdev/usehooks'

import EIKLogoDark from 'public/assets/eik-dark.svg?url'
import EIKLogoLight from 'public/assets/eik-light.svg?url'

export default function PoweredByEIK() {
  const isClient = useIsClient()
  const { resolvedTheme } = useTheme()

  return (
    <Link
      href='https://ethidentitykit.com'
      target='_blank'
      rel='noopener noreferrer'
      className='group/powered-by-eik relative'
    >
      <Image
        src={isClient && resolvedTheme === 'dark' ? EIKLogoDark : EIKLogoLight}
        alt='Ethereum Identity Kit'
        className='w-12 transition-all group-hover/powered-by-eik:scale-110 2xl:w-14'
      />
      <div className='absolute top-1 left-full hidden w-fit pl-6 opacity-0 transition-all transition-discrete group-hover/powered-by-eik:hidden group-hover/powered-by-eik:opacity-100 sm:group-hover/powered-by-eik:block starting:opacity-0'>
        <p className='bg-neutral shadow-small text-text rounded-sm px-4 py-2 text-lg font-semibold text-nowrap capitalize'>
          Ethereum Identity Kit
        </p>
      </div>
    </Link>
  )
}
