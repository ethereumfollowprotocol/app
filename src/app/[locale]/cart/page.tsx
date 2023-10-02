'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { useCurrentLocale } from '#/locales/client'

export default function CartPage() {
  const currentLocale = useCurrentLocale()
  const pathname = usePathname()

  return (
    <main className='mx-auto flex h-full w-full flex-col items-center text-center'>
      TODO <p>{pathname}</p>
      <p>{currentLocale}</p>
    </main>
  )
}
