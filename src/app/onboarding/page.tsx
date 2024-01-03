import * as React from 'react'
import { Mint } from './mint.tsx'
import { OnboardingForm } from './form.tsx'

export default async function OnboardingPage() {
  return (
    <main className='mx-auto flex h-full w-full flex-col items-center text-center mt-6'>
      <Mint />
    </main>
  )
}
