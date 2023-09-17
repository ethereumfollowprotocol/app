import { OnboardingForm } from '#/components/onboarding-form'

export default async function Home() {
  return (
    <main className='flex flex-col items-center text-center mx-auto w-full h-full pt-8 px-4'>
      <OnboardingForm />
    </main>
  )
}
