'use client'

import * as React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useCurrentLocale } from '#/locales/client'
import { useAccount, useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi'
import { getAddress, isAddress } from 'viem'

export default function LeaderboardPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [, id] = pathname.split('/')
  const currentLocale = useCurrentLocale()

  React.useEffect(() => {
    // if (!id || isAddress(id) || !id.endsWith('.eth')) router.push('/error')
  }, [id])

  const {
    data: ensNameData,
    error,
    status,
  } = useEnsName({
    address: getAddress(`${id}`),
    enabled: !!id && isAddress(id),
  })

  const { data: ensAddressData } = useEnsAddress({
    name: `${id}`,
    enabled: !!id && id.endsWith('.eth'),
  })

  const [name, address] = id?.endsWith('.eth') ? [id, ensAddressData] : [ensNameData, id]

  return (
    <main className='flex flex-col items-center text-center mx-auto w-full h-full'>
      TODO
      <p>
        {name} - {address}
      </p>
      <p>{currentLocale}</p>
    </main>
  )
}
