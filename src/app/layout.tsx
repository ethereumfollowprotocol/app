import './i18n'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import clsx from 'clsx'
import { Toaster } from 'sonner'
import { headers } from 'next/headers'
import Providers from './providers.tsx'
import { cookieToInitialState } from 'wagmi'
import { Analytics } from '@vercel/analytics/react'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'

import wagmiConfig from '../lib/wagmi.ts'
import { Production } from './production.tsx'
import { APP_NAME, APP_DESCRIPTION } from '../lib/constants/index.ts'

const inteFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-inter'
})

const ibmPlexMonoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ibm-plex-mono'
})

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const initialState = cookieToInitialState(wagmiConfig, headers().get('cookie'))

  return (
    <html lang='en' className={clsx([inteFont.variable, ibmPlexMonoFont.variable, 'light'])}>
      <HeadTag />
      <body
        style={{
          backgroundImage: `url(assets/art/waves-background.svg)`
        }}
      >
        <Toaster richColors={true} />
        <Providers initialState={initialState}>{children}</Providers>
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
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>{APP_NAME}</title>
      <meta name='description' content={APP_DESCRIPTION} />
      <link rel='manifest' href='/site.webmanifest' crossOrigin='use-credentials' />
      <link rel='icon' href='/assets/favicon.ico' sizes='any' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='EFP' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='theme-color' content='#FFE067' />
      <meta name='apple-mobile-web-app-status-bar-style' content='#FFE067' />
      <meta name='msapplication-TileColor' content='#FFE067' />
      <meta name='author' content='Ethereum Follow Protocol Team' />
      <meta name='twitter:creator' content='@ethfollowpr' />
      <meta name='twitter:site' content='@ethfollowpr' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content='EFP' />
      <meta name='twitter:description' content={APP_DESCRIPTION} />
      <meta property='og:title' content='EFP' />
      <meta property='og:description' content={APP_DESCRIPTION} />
      <meta property='og:url' content='https://x.com/ethfollowpr' />
    </head>
  )
}

export default RootLayout
