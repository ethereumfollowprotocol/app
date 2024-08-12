import type { Metadata } from 'next'

export const metadataBaseUrl = new URL('https://testing.ethfollow.xyz')

export const metadataTitle = 'Ethereum Follow Protocol'
export const metadataSiteName = 'App - Ethereum Follow Protocol'
export const metadataDescription = 'Social graph for Ethereum'

export const sharedMetadataIcons: Metadata['icons'] = [
  {
    rel: 'icon',
    url: 'https://testing.ethfollow.xyz/assets/favicon.ico'
  }
]
export const sharedMetadataOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  title: metadataTitle,
  description: metadataDescription,
  locale: 'en_US',
  siteName: metadataSiteName,
  url: 'https://testing.ethfollow.xyz',
  emails: ['contact@kodex.io'],
  images: [
    {
      url: 'https://testing.ethfollow.xyz/assets/banner.png'
    }
  ]
}
export const sharedMetadataTwitter: Metadata['twitter'] = {
  card: 'summary_large_image',
  site: '@ethfollowpr',
  creator: '@ethfollowpr',
  images: 'https://testing.ethfollow.xyz/assets/banner.png'
}

export const sharedMetadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  applicationName: metadataSiteName,
  keywords: ['efp', 'follow', 'protocol', 'social', 'eth', 'ethereum', 'blockchain'],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: sharedMetadataIcons,
  openGraph: sharedMetadataOpenGraph,
  authors: {
    name: 'Ethereum Follow Protocol',
    url: 'https://testing.ethfollow.xyz'
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    notranslate: false
  },
  metadataBase: metadataBaseUrl
}
