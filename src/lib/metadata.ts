import type { Metadata } from 'next'

export const metadataBaseUrl = new URL('https://efp.app')

export const metadataTitle = 'Ethereum Follow Protocol'
export const metadataSiteName = 'Ethereum Follow Protocol'
export const metadataDescription =
  'EFP – Ethereum Follow Protocol – The onchain social graph for Ethereum. A composable identity protocol for crypto apps. Built to complement ENS and SIWE.'

export const sharedMetadataIcons: Metadata['icons'] = [
  {
    rel: 'icon',
    url: 'https://efp.app/assets/favicon.ico',
  },
]

export const sharedMetadataOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  title: metadataTitle,
  description: metadataDescription,
  locale: 'en_US',
  siteName: metadataSiteName,
  url: 'https://efp.app',
  emails: ['contact@ethfollow.xyz'],
}

export const sharedMetadataTwitter: Metadata['twitter'] = {
  card: 'summary_large_image',
  site: '@efp',
  creator: '@efp',
  description: metadataDescription,
}

export const sharedMetadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  applicationName: metadataSiteName,
  keywords: ['efp', 'ethereum follow protocol', 'follow', 'protocol', 'social graph', 'ethereum'],
  icons: sharedMetadataIcons,
  openGraph: sharedMetadataOpenGraph,
  authors: {
    name: 'Ethereum Follow Protocol',
    url: 'https://efp.app',
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    notranslate: false,
  },
  metadataBase: metadataBaseUrl,
}
