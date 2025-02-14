import type { Metadata } from 'next'

import Guide from './components/guide'
import LiveIntegrations from './components/live-intergrations'

export const metadata: Metadata = {
  title: 'Integrations | EFP',
  openGraph: {
    title: 'Integrations | EFP',
    siteName: 'Integrations - Ethereum Follow Protocol',
    description: 'Integrate Ethereum Follow Protocol with your favorite apps',
    url: 'https://efp.app/integrations',
    images: [
      {
        url: 'https://efp.app/assets/banners/integrations.png',
      },
    ],
  },
  twitter: {
    images: 'https://efp.app/assets/banners/integrations.png',
  },
}

const Integrations = () => {
  return (
    <main className='relative flex w-full flex-row flex-wrap justify-center gap-4 px-4 pt-[6.75rem] pb-28 sm:pt-[7.75rem] md:px-8 lg:pb-10'>
      <Guide />
      <LiveIntegrations />
    </main>
  )
}

export default Integrations
