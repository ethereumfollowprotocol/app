import { Footer } from '#/components/footer'
import Summary from '#/components/home/summary'
import Landing from '#/components/home/landing'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ethereum Follow Protocol'
}

const HomePage = () => {
  return (
    <>
      <main className='mx-auto bg-transparent flex min-h-screen w-full flex-col items-center font-sans'>
        <Summary />
        <Landing />
      </main>
      <Footer />
    </>
  )
}

export default HomePage
