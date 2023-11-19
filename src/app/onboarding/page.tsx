import * as React from 'react'
import { usePathname } from 'next/navigation'

export default function ProfilePage() {
  const pathname = usePathname()

  return (
    <main className='mx-auto flex h-full w-full flex-col items-center text-center'>
      TODO <p>{pathname}</p>
    </main>
  )
}
