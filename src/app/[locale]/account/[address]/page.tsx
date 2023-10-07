'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { useCurrentLocale } from '#locales/client'

export default function LeaderboardPage() {
  const pathname = usePathname()
  const currentLocale = useCurrentLocale()

  return (
    <main className='mx-auto flex h-full w-full flex-col items-center text-center'>
      TODO - {pathname}
      <p></p>
      <p>{currentLocale}</p>
    </main>
  )
}
