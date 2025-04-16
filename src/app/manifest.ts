import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ethereum Follow Protocol',
    short_name: 'Ethereum Follow Protocol',
    description:
      'EFP – Ethereum Follow Protocol – The onchain social graph for Ethereum. A composable identity protocol for crypto apps. Built to complement ENS and SIWE.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#333',
    icons: [
      {
        src: '/assets/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/android-chrome-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/assets/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
