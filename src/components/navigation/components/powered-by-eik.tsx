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
    <Link href='https://ethidentitykit.com' target='_blank' rel='noopener noreferrer'>
      <Image
        src={isClient && resolvedTheme === 'dark' ? EIKLogoDark : EIKLogoLight}
        alt='Ethereum Identity Kit'
        className='w-14'
      />
    </Link>
  )
}
