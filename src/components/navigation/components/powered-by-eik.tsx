import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import EIKLogoLight from 'public/assets/eik-light.svg?url'
import EIKLogoDark from 'public/assets/eik-dark.svg?url'
import { useTheme } from 'next-themes'

export default function PoweredByEIK() {
  const { resolvedTheme } = useTheme()

  return (
    <Link href='https://ethidentitykit.com' target='_blank' rel='noopener noreferrer'>
      <Image src={resolvedTheme === 'dark' ? EIKLogoDark : EIKLogoLight} alt='Ethereum Identity Kit' className='w-14' />
    </Link>
  )
}
