
import UnoCSS from 'unocss/astro'
import compress from 'astro-compress'
import Critters from 'astro-critters'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import prefetch from '@astrojs/prefetch'
import partytown from '@astrojs/partytown'
import type { AstroIntegration } from 'astro'
import basicSsl from '@vitejs/plugin-basic-ssl'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig, squooshImageService } from 'astro/config'

const SITE_URL =
  process.env['NODE_ENV'] === 'development' ? 'http://localhost:4321' : ''

const productionAstroIntegrations = [
  partytown(),
  sitemap(),
  robotsTxt(),
  Critters(),
  compress(),
] satisfies AstroIntegration[]

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  compressHTML: true,
  output: 'server',
  adapter: vercel({
    analytics: true,
  }),
  image: {
    service: squooshImageService(),
  },
  integrations: [
    prefetch(),
    UnoCSS({
      injectReset: true,
    }),
    // has to be last
    ...(process.env['NODE_ENV'] === 'production' ? productionAstroIntegrations : []),
  ],
  vite: {
    plugins: [...(process.env['NODE_ENV'] === 'production' ? [basicSsl()] : [])],
  },
})
