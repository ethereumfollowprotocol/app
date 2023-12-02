'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { useAccount } from 'wagmi'
import { Text } from '@radix-ui/themes'

export default function ProfilePage() {
  const pathname = usePathname()
  const account = useAccount()

  if (!account.isConnected)
    return (
      <Text size='6' as='p'>
        Connect your wallet to see your EFP profile
      </Text>
    )

  return (
    <main className='mx-auto flex min-h-full h-full w-full flex-col items-center text-center'>
      TODO <p>{pathname}</p>
    </main>
  )
}
