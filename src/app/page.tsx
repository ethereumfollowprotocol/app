import { Footer } from '#/components/footer'
import Summary from '#/components/home/summary'
import Landing from '#/components/home/landing'

// export const metadata = {
//   metadataBase: new URL('https://app.ethfollow.xyz'),
//   openGraph: {
//     images: [{ url: '/assets/banner.png', alt: 'Ethereum Follow Protocol' }]
//   },
//   twitter: {
//     images: [{ url: '/assets/banner.png', alt: 'Ethereum Follow Protocol' }]
//   }
// } satisfies Metadata

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
