import * as React from 'react'
import { usePathname } from 'next/navigation'
import { getCurrentLocale } from '#/locales/server.ts'

export default async function ProfilePage() {
  const pathname = usePathname()
  const currentLocale = getCurrentLocale()

  return (
    <main className='flex flex-col items-center text-center mx-auto w-full h-full'>
      TODO <p>{pathname}</p>
      <p>{currentLocale}</p>
    </main>
  )
}
