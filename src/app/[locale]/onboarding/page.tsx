import * as React from 'react'
import { usePathname } from 'next/navigation'
import { getCurrentLocale } from '#/locales/server.ts'

export default async function ProfilePage() {
  const pathname = usePathname()
  const currentLocale = getCurrentLocale()

  return (
    <main className='mx-auto flex h-full w-full flex-col items-center text-center'>
      TODO <p>{pathname}</p>
      <p>{currentLocale}</p>
    </main>
  )
}
