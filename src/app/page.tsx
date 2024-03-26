import * as React from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Flex, Text } from '@radix-ui/themes'

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
    <React.Fragment>
      <main className='mx-auto flex h-full min-h-full w-full flex-col items-center overflow-scroll px-4 pt-8 text-center font-sans'>
        <Text className='text-4xl font-bold text-white'>It's about who you know.</Text>
        <Flex direction={'column'}>
          <Text className='text-4xl font-bold text-white'>The social graph</Text>
          <Text className='text-4xl font-bold text-[#FEF305]'>for Ethereum.</Text>
        </Flex>

        <Image
          src='/assets/landing-graph.webp'
          width={500}
          height={500}
          alt='Landing graph'
          priority={true}
          placeholder='empty'
          className='select-none pointer-events-none'
        />
        <Flex direction={'column'}>
          <Text className='text-4xl font-bold text-white'>Follow your friends.</Text>
          <Text className='text-4xl font-bold text-[#FEF305]'>Ghost your enemies.</Text>
        </Flex>
        <Text className='text-4xl font-bold text-white'>A follower list you own</Text>
      </main>
      {/* <React.Suspense>
        <Footer />
      </React.Suspense> */}
    </React.Fragment>
  )
}
