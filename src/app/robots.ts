import type { MetadataRoute } from 'next'

export const runtime = 'edge'

const robots = (): MetadataRoute.Robots => ({
<<<<<<< HEAD
  rules: [
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/'],
    },
    {
      userAgent: 'GPTBot',
      disallow: ['/'],
    },
  ],
=======
  rules: {
    userAgent: '*',
    allow: '/',
  },
>>>>>>> 8d529aacae8cc5902c7152194f6b1b7e33a23d71
  host: process.env.NEXT_PUBLIC_SITE_URL,
  sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
})

export default robots
