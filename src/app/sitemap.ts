import fs from 'node:fs'
import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

const validRoutes = ['page.tsx', 'route.tsx', 'route.ts']

const sitemap = (): MetadataRoute.Sitemap => {
  const appDirectoryPath = fs.realpathSync(`${process.cwd()}/src/app`)

  const allIndexibleRoutes = fs
    .readdirSync(appDirectoryPath, {
      recursive: true,
      withFileTypes: true
    })
    .filter(
      file =>
        validRoutes.includes(file.name) &&
        // exclude api routes and dynamic pages
        file.path.matchAll(/[\[\]\(\)]|\/api\//g).next().done
    )
    .map(file => file.path.replace(appDirectoryPath, '').replaceAll(/[\\\/]/g, ''))

  return allIndexibleRoutes.map(route => ({
    url: `${SITE_URL}/${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7
  }))
}

export default sitemap
