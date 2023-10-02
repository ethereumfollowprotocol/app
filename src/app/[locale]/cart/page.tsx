'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { useCurrentLocale } from '#/locales/client'

export default function CartPage() {
  const currentLocale = useCurrentLocale()
  const pathname = usePathname()

  return (
    <main className='flex flex-col items-center text-center mx-auto w-full h-full'>
      TODO <p>{pathname}</p>
      <p>{currentLocale}</p>
    </main>
  )
}
