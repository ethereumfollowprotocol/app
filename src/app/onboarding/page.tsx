import * as React from 'react'
import { CreateNewListForm } from '#/app/onboarding/new-list.tsx'

export default async function OnboardingPage() {
  return (
    <main className='mx-auto flex h-full min-h-screen w-full flex-col items-center text-center mt-6'>
      <CreateNewListForm />
    </main>
  )
}
