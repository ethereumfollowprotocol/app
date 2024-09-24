import './i18n'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import Script from 'next/script'
import { Production } from './production.tsx'
import { sharedMetadata } from '#/lib/metadata.ts'
import { APP_DESCRIPTION } from '../lib/constants/index.ts'

export const metadata: Metadata = sharedMetadata

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' suppressHydrationWarning={true} className='dark'>
      <HeadTag />
      <body
        style={{
          backgroundImage: `url(assets/art/waves-background.svg)`
        }}
      >
        <main className='h-screen w-full flex items-center justify-center px-4'>
          <div className='glass-card w-full max-w-[500px] flex items-center flex-col gap-4 px-6 py-10 xs:p-12 rounded-xl border-[3px] border-gray-400'>
            <h1 className='text-4xl font-bold'>Testing is over!</h1>
            <p className='text-lg font-semibold text-center'>
              Thanks for testing the Ethereum Follow Protocol. We are now in production and you can
              visit the live site.
            </p>
            <a
              href='https://ethfollow.xyz'
              className='text-2xl font-bold connect-button border-[3px] hover:scale-110 mt-4 transition-transform px-8 py-4'
            >
              Go to Production
            </a>
          </div>
        </main>
        {/* <VercelToolbar /> */}
        <Production>
          <Analytics />
          <SpeedInsights />
        </Production>
      </body>
    </html>
  )
}

const HeadTag = () => {
  return (
    <head>
      <Script src='/scripts/theme.js' strategy='beforeInteractive' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content={APP_DESCRIPTION} />
      <link rel='manifest' href='/site.webmanifest' crossOrigin='use-credentials' />
      <link rel='icon' href='/assets/favicon.ico' sizes='any' />
      <link rel='preload' href='/assets/art/waves-background.svg' as='image' />
      <link rel='preload' href='/assets/logo.svg' as='image' />
      <link rel='preload' href='/assets/icons/block-emoji.svg' as='image' />
      <link rel='preload' href='/assets/icons/mute-emoji.svg' as='image' />
      <link rel='preload' href='/assets/icons/unfollow-emoji.svg' as='image' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='EFP' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='theme-color' content='#FFE067' />
      <meta name='apple-mobile-web-app-status-bar-style' content='#FFE067' />
      <meta name='msapplication-TileColor' content='#FFE067' />
      <meta name='author' content='Ethereum Follow Protocol Team' />
      <meta name='twitter:creator' content='@efp' />
      <meta name='twitter:site' content='@efp' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content='EFP' />
      <meta name='twitter:description' content={APP_DESCRIPTION} />
      <meta property='og:title' content='EFP' />
      <meta property='og:description' content={APP_DESCRIPTION} />
      <meta property='og:url' content='https://x.com/efp' />
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      <link
        href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
        rel='stylesheet'
      />
    </head>
  )
}

export default RootLayout
