import '#/app/globals.css'
import '@radix-ui/themes/styles.css'

import * as React from 'react'
import type { Metadata } from 'next'
import ClientLayout from './client.tsx'
import { APP_NAME, APP_DESCRIPTION } from '#/lib/constants.ts'

export const metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'EFP',
    capable: true,
    statusBarStyle: 'default',
  },
  applicationName: 'EFP',
  viewport: 'width=device-width, initial-scale=1',
  colorScheme: 'light',
  twitter: {
    creator: '@ethfollowpr',
    site: '@ethfollowpr',
    card: 'summary_large_image',
    title: 'EFP',
    description: APP_DESCRIPTION,
    images: 'https://github.com/ethereumfollowprotocol/app/raw/main/banner.png',
  },
  authors: {
    name: 'Ethereum Follow Protocol Team',
    url: 'https://x.com/ethfollowpr',
  },
} satisfies Metadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      className='m-auto h-full min-h-full scroll-smooth w-full overflow-x-hidden'
    >
      <head>
        <link
          rel='icon'
          href='/assets/favicon.ico'
          sizes='any'
        />
        <meta
          name='apple-mobile-web-app-capable'
          content='yes'
        />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='default'
        />
        <meta
          name='apple-mobile-web-app-title'
          content='EFP'
        />
        <meta
          name='mobile-web-app-capable'
          content='yes'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <meta
          name='theme-color'
          content='#fde047'
        />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='#fde047'
        />
        <meta
          name='msapplication-TileColor'
          content='#fde047'
        />
        <link
          rel='manifest'
          href='/site.webmanifest'
        />
      </head>
      <body className='items-center w-full min-w-full bg-gradient-to-b from-yellow-300 to-pink-400'>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
