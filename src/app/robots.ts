import type { MetadataRoute } from 'next'

export const runtime = 'edge'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api']
    },
    host: process.env.NEXT_PUBLIC_SITE_URL
  }
}
