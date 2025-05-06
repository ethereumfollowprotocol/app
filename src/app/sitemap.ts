import fs from 'node:fs'
import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
const validRoutes = ['page.tsx', 'route.tsx', 'route.ts']

type Account = {
  address: string | undefined
  name: string | null | undefined
  avatar: string | null | undefined
  header: string | null | undefined
}

const getAccounts = async (): Promise<Account[]> => {
  try {
    const file = fs.readFileSync(`${process.cwd()}/src/data/accounts.csv`, 'utf8')
    const accounts = file.split('\n').map((account) => account.split(','))

    const formattedAccounts = accounts.map((account) => ({
      address: account[0]?.replaceAll('"', ''),
      name: account[1] === 'NULL' ? null : account[1],
      avatar: account[2] === 'NULL' ? null : account[2],
      header: account[3] === 'NULL' ? null : account[3],
    }))

    return formattedAccounts
  } catch (error) {
    console.error('Error fetching user routes:', error)
    return []
  }
}

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const lastModified = new Date()
  const appDirectoryPath = fs.realpathSync(`${process.cwd()}/src/app`)

  const staticRoutes = fs
    .readdirSync(appDirectoryPath, {
      recursive: true,
      withFileTypes: true,
    })
    .filter(
      (file) =>
        validRoutes.includes(file.name) &&
        // exclude api routes and dynamic pages
        file.path.matchAll(/[\[\]\(\)]|\/api\//g).next().done
    )
    .map((file) => file.path.replace(appDirectoryPath, '').replaceAll(/[\\\/]/g, ''))

  const transformedStaticRoutes = staticRoutes.map((route) => ({
    url: `${SITE_URL}/${route}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.6,
  }))

  const accounts = await getAccounts()
  const accountRoutes = accounts.map((account) => ({
    url: `${SITE_URL}/${account.address}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.5,
    images: [account.avatar, account.header].filter(Boolean) as string[],
  }))

  const allRoutes = [...transformedStaticRoutes, ...accountRoutes]
  return allRoutes
}

export default sitemap
