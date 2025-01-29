import './i18n'
import './globals.css'
import 'ethereum-identity-kit/css'
import '@rainbow-me/rainbowkit/styles.css'

import Image from 'next/image'
import { Toaster } from 'sonner'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { ThemeProvider } from 'next-themes'
import { cookieToInitialState } from 'wagmi'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'

import Providers from './providers.tsx'
import wagmiConfig from '../lib/wagmi.ts'
import { Production } from './production.tsx'
import { sharedMetadata } from '#/lib/metadata.ts'
import { THEMES } from '../lib/constants/index.ts'
import BackgroundImage from 'public/assets/art/waves-background.svg'
import HalloweenBackground from 'public/assets/art/halloween-background.jpeg'

export const metadata: Metadata = sharedMetadata

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const initialState = cookieToInitialState(wagmiConfig, headers().get('cookie'))

  return (
    <html lang='en' suppressHydrationWarning={true} className='dark'>
      <HeadTag />
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem={true} themes={THEMES}>
          <Image
            src={BackgroundImage}
            alt='background waves'
            className='background -z-10 halloween:hidden'
          />
          <Image
            src={HalloweenBackground}
            alt='halloween background'
            className='hidden fixed top-0 -z-10 left-0 h-screen opacity-50 w-screen halloween:block object-cover'
          />
          <Toaster richColors={true} />
          <Providers initialState={initialState}>{children}</Providers>
          {/* <VercelToolbar /> */}
        </ThemeProvider>
        <Production>
          <Analytics />
          <SpeedInsights />
        </Production>
      </body>
      <GoogleAnalytics gaId='G-4YT2CMF6F2' />
    </html>
  )
}

const HeadTag = () => {
  return (
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='manifest' href='/site.webmanifest' crossOrigin='use-credentials' />
      <link rel='icon' href='/assets/favicon.ico' sizes='any' />

      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='EFP' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='theme-color' content='#FFE066' />
      <meta name='apple-mobile-web-app-status-bar-style' content='#FFE066' />
      <meta name='msapplication-TileColor' content='#FFE066' />
      <meta name='author' content='Ethereum Follow Protocol Team' />

      {/* Preload fonts */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      <link
        href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
        rel='stylesheet'
      />

      {/* Preload crucial assets */}
      <link rel='preload' href='/assets/art/waves-background.svg' as='image' />
      <link rel='preload' href='/assets/logo.svg' as='image' />
      <link rel='preload' href='/assets/icons/block-emoji.svg' as='image' />
      <link rel='preload' href='/assets/icons/mute-emoji.svg' as='image' />
      <link rel='preload' href='/assets/icons/unfollow-emoji.svg' as='image' />
      <link rel='preload' href='/assets/icons/halloween-emoji.svg' as='image' />
      <link rel='preload' href='/assets/icons/ghost-emoji.png' as='image' />
      <link rel='preload' href='/assets/icons/spider-web-emoji.png' as='image' />
    </head>
  )
}

export default RootLayout
