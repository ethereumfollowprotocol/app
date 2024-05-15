import { Flex, Text } from '@radix-ui/themes'
import type { Metadata } from 'next'
import Image from 'next/image'
import * as React from 'react'

export const metadata = {
  metadataBase: new URL('https://app.ethfollow.xyz'),
  openGraph: {
    images: [{ url: '/banner.png', alt: 'Ethereum Follow Protocol' }]
  },
  twitter: {
    images: [{ url: '/banner.png', alt: 'Ethereum Follow Protocol' }]
  }
} satisfies Metadata

export default async function HomePage() {
  return (
    <>
      <main className='mx-auto flex h-full min-h-full w-full flex-col items-center overflow-scroll px-4 pt-8 text-center font-sans'></main>
      {/* <React.Suspense>
        <Footer />
      </React.Suspense> */}
    </>
  )
}
