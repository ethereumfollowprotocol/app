'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { useCurrentLocale } from '#/locales/client'
import { useAccount } from 'wagmi'

export default function ProfilePage() {
  const currentLocale = useCurrentLocale()
  const pathname = usePathname()

  const { address } = useAccount()

  return (
    <main className='flex flex-col items-center text-center mx-auto w-full h-full'>
      TODO <p>{pathname}</p>
      <p>{currentLocale}</p>
    </main>
  )
}
