import '#/app/globals.css'
import '@radix-ui/themes/styles.css'
import * as React from 'react'
import type { Metadata } from 'next'
import ClientLayout from '#/app/[locale]/client.tsx'

export const metadata = {
  title: 'EFP',
  description: 'Ethereum Follow Protocol',
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
      </head>
      <body className='items-center w-full min-w-full bg-gradient-to-b from-yellow-300 to-pink-400'>
        <ClientLayout
          {...{
            params: {
              locale: 'en',
            },
          }}
        >
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
