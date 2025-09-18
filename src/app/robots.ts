import type { MetadataRoute } from 'next'

export const runtime = 'edge'

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
  },
  host: process.env.NEXT_PUBLIC_SITE_URL,
  sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
})

export default robots
