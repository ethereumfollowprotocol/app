import type { Metadata } from 'next'

import Guide from './components/guide'
import LiveIntegrations from './components/live-intergrations'

export const metadata: Metadata = {
  title: 'Integrations | EFP',
  openGraph: {
    title: 'Integrations | EFP',
    siteName: 'Integrations - Ethereum Follow Protocol',
    description: 'Integrate Ethereum Follow Protocol with your favorite apps',
    url: 'https://ethfollow.xyz/integrations',
    images: [
      {
        url: 'https://ethfollow.xyz/assets/banners/integrations.png',
      },
    ],
  },
  twitter: {
    images: 'https://ethfollow.xyz/assets/banners/integrations.png',
  },
}

const Integrations = () => {
  return (
    <main className='flex flex-row pb-28 lg:pb-10 gap-4 px-4 md:px-8 w-full justify-center flex-wrap relative pt-[6.75rem] sm:pt-[7.75rem]'>
      <Guide />
      <LiveIntegrations />
    </main>
  )
}

export default Integrations
