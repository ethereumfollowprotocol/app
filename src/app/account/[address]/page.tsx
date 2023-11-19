'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'

export default function LeaderboardPage() {
  const pathname = usePathname()

  return (
    <main className='mx-auto flex h-full w-full flex-col items-center text-center'>
      TODO - {pathname}
      <p></p>
    </main>
  )
}
