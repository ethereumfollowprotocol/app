import type { Metadata } from 'next'

export const metadataBaseUrl = new URL('https://ethfollow.xyz')

// export const metadataTitle = 'Ethereum Follow Protocol'
export const metadataSiteName = 'App - Ethereum Follow Protocol'
export const metadataDescription = "It's about who you know. The social graph for Ethereum."

export const sharedMetadataIcons: Metadata['icons'] = [
  {
    rel: 'icon',
    url: 'https://ethfollow.xyz/assets/favicon.ico'
  }
]
export const sharedMetadataOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  // title: metadataTitle,
  description: metadataDescription,
  locale: 'en_US',
  // siteName: metadataSiteName,
  // url: 'https://ethfollow.xyz',
  emails: ['contact@ethfollow.xyz']
  // images: [
  //   {
  //     url: 'https://ethfollow.xyz/assets/banner.png'
  //   }
  // ]
}
export const sharedMetadataTwitter: Metadata['twitter'] = {
  card: 'summary_large_image',
  site: '@efp',
  creator: '@efp',
  description: metadataDescription
  // images: 'https://ethfollow.xyz/assets/banner.png'
}

export const sharedMetadata: Metadata = {
  // title: metadataTitle,
  description: metadataDescription,
  applicationName: metadataSiteName,
  keywords: ['efp', 'follow', 'protocol', 'social', 'eth', 'ethereum', 'blockchain'],
  icons: sharedMetadataIcons,
  openGraph: sharedMetadataOpenGraph,
  authors: {
    name: 'Ethereum Follow Protocol',
    url: 'https://ethfollow.xyz'
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
