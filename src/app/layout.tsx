import '#app/globals.css'
import '@radix-ui/themes/styles.css'
import '@rainbow-me/rainbowkit/styles.css'

import clsx from 'clsx'
import * as React from 'react'
import dynamic from 'next/dynamic'
import { Providers } from './providers.tsx'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import { APP_NAME, APP_DESCRIPTION } from '#lib/constants.ts'

const WebVitals = dynamic(() => import('./web-vitals.ts'), { ssr: false })

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-inter'
})

const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ibm-plex-mono'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={clsx([inter.variable, ibm_plex_mono.variable, 'light'])}>
      <head>
        <title>{APP_NAME}</title>
        <meta name='description' content={APP_DESCRIPTION} />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='icon' href='/assets/favicon.ico' sizes='any' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='EFP' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#fde047' />
        <meta name='apple-mobile-web-app-status-bar-style' content='#fde047' />
        <meta name='msapplication-TileColor' content='#fde047' />
        <meta name='author' content='Ethereum Follow Protocol Team' />
        <meta name='twitter:creator' content='@ethfollowpr' />
        <meta name='twitter:site' content='@ethfollowpr' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='EFP' />
        <meta name='twitter:description' content={APP_DESCRIPTION} />
        <meta name='twitter:image' content='/banner.png' />
        <meta property='og:title' content='EFP' />
        <meta property='og:description' content={APP_DESCRIPTION} />
        <meta property='og:image' content='/banner.png' />
        <meta property='og:url' content='https://x.com/ethfollowpr' />
      </head>
      <body className='w-full min-w-full items-center font-serif'>
        <WebVitals />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
