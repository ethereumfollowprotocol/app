import type { MetadataRoute } from 'next'

export const runtime = 'edge'

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/api']
  },
  host: process.env.NEXT_PUBLIC_SITE_URL
})

export default robots
