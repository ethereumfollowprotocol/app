import './i18n'
import './globals.css'
import 'ethereum-identity-kit/css'
import '@rainbow-me/rainbowkit/styles.css'

import Image from 'next/image'
import { Toaster } from 'sonner'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'

import Providers from './providers.tsx'
import { Production } from './production.tsx'
import { sharedMetadata } from '#/lib/metadata.ts'
import { THEMES } from '../lib/constants/index.ts'
import BackgroundImage from 'public/assets/art/background.png'

export const metadata: Metadata = sharedMetadata

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <HeadTag />
      <body>
        <ThemeProvider attribute='class' enableSystem={true} themes={THEMES}>
          <Image src={BackgroundImage} priority={true} alt='background image' fill className='background -z-10' />
          <Toaster richColors={true} />
          <Providers>{children}</Providers>
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
      <link rel='preload' href='/assets/logo.svg' as='image' />
      <link rel='preload' href='/assets/icons/emojis/unfollow-emoji.svg' as='image' />
    </head>
  )
}

export default RootLayout
