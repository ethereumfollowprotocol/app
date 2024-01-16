import * as React from 'react'
import { CreateNewListForm } from '#/app/onboarding/new-list.tsx'

export default async function OnboardingPage() {
  return (
    <main className='mx-auto flex h-full w-full flex-col items-center text-center mt-10'>
      <CreateNewListForm />
    </main>
  )
}
