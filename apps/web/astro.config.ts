import UnoCSS from 'unocss/astro'
import compress from 'astro-compress'
import Critters from 'astro-critters'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import prefetch from '@astrojs/prefetch'
import partytown from '@astrojs/partytown'
import webmanifest from 'astro-webmanifest'
import type { AstroIntegration } from 'astro'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig, squooshImageService } from 'astro/config'

const IS_PRODUCTION = import.meta.env['NODE_ENV'] === 'production'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  image: { service: squooshImageService() },

  integrations: [
    UnoCSS({ injectReset: true }),
    // has to be last
    ...productionAstroIntegrations(),
  ],
  compressHTML: IS_PRODUCTION,
  experimental: {
    optimizeHoistedScript: true,
  },
})

function productionAstroIntegrations(): Array<AstroIntegration> {
  if (!IS_PRODUCTION) return []
  return [
    sitemap(),
    prefetch(),
    Critters(),
    compress(),
    partytown(),
    robotsTxt(),
    webmanifest({
      name: 'EFP',
      start_url: '/',
      display: 'standalone',
      icon: '/assets/favicon.svg',
      short_name: 'Ethereum Follow Protocol',
      description: 'Ethereum Follow Protocol',
      /**
       * TODO: fill out the rest of the manifest and remove relevant items from Layout.astro
       * @see https://github.com/alextim/astro-lib/tree/main/packages/astro-webmanifest#readme
       */
    }),
  ]
}
