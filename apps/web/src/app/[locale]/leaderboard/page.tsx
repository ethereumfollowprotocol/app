'use client'
import * as React from 'react'
import { useCurrentLocale } from '#/locales/client'
import { usePathname } from 'next/navigation'

export default function LeaderboardPage() {
  const currentLocale = useCurrentLocale()
  const pathname = usePathname()

  return (
    <main className='flex flex-col items-center text-center mx-auto w-full h-full'>
      TODO <p>{pathname}</p>
      <p>{currentLocale}</p>
    </main>
  )
}
