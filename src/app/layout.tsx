import './i18n'
import './globals.css'
import 'ethereum-identity-kit/css'
import '@rainbow-me/rainbowkit/styles.css'

import Image from 'next/image'
import { Toaster } from 'sonner'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'

import Providers from './providers.tsx'
import { Production } from './production.tsx'
import { sharedMetadata } from '#/lib/metadata.ts'
import { THEMES } from '../lib/constants/index.ts'
import BackgroundImage from 'public/assets/art/background.png'

export const metadata: Metadata = sharedMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <HeadTag />
      <body className={inter.className}>
        <ThemeProvider attribute='class' enableSystem={true} themes={THEMES}>
          <Image
            src={BackgroundImage}
            priority={true}
            width={1920}
            height={1080}
            alt='background image'
            className='fixed top-0 left-0 -z-10 h-screen w-screen object-cover opacity-30'
          />
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
      <meta name='mobile-web-app-capable' content='yes' />

      {/* Preload fonts */}
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
