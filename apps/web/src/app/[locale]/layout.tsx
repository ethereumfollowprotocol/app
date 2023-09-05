import '#/app/globals.css'
import type { Metadata } from 'next'

export const metadata = {
  title: 'EFP',
  description: 'Ethereum Follow Protocol',
} satisfies Metadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
