import '#/app/globals.css'
import '@radix-ui/themes/styles.css'
import '@rainbow-me/rainbowkit/styles.css'

import clsx from 'clsx'
import { Toaster } from 'sonner'
import { headers } from 'next/headers'
import { Providers } from './providers.tsx'
import { cookieToInitialState } from 'wagmi'
import { wagmiConfig } from '#/lib/wagmi.ts'
import { Analytics } from '@vercel/analytics/react'
import { Production } from 'src/app/production.tsx'
import { IBM_Plex_Mono, Inter } from 'next/font/google'
import { ColorSchemes } from '#/lib/constants/colors.ts'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { APP_DESCRIPTION, APP_NAME } from '#/lib/constants/index.ts'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initialState = cookieToInitialState(wagmiConfig, headers().get('cookie'))
  return (
    <html
      lang='en'
      suppressHydrationWarning={true}
      className={clsx([inteFont.variable, ibmPlexMonoFont.variable, 'dark'])}
    >
      <HeadTag />
      <body
        className={clsx([
          'w-full min-w-full items-center font-serif'
          // 'bg-gradient-to-t from-[#fff97f] to-[#ffbde3]'
        ])}
      >
        <Toaster />
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

function HeadTag() {
  return (
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no' />
      <title>{APP_NAME}</title>
      <meta name='description' content={APP_DESCRIPTION} />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='icon' type='image/png' href='/assets/logo-black-on-yellow.png' sizes='any' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='EFP' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='theme-color' content='#fef305' />
      <meta name='apple-mobile-web-app-status-bar-style' content='#fef305' />
      <meta name='msapplication-TileColor' content='#fef305' />
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
