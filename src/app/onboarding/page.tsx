import * as React from 'react'
import { Mint } from './mint.tsx'
import { OnboardingForm } from './form.tsx'
import { Flex } from '@radix-ui/themes'

export default async function OnboardingPage() {
  return (
    <main className='mx-auto flex h-full w-full flex-col items-center text-center mt-6'>
      {/* <Flex className='max-w-80'>
        <Mint />
      </Flex> */}
      <OnboardingForm />
    </main>
  )
}
