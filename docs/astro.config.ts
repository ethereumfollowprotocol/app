import { defineConfig, passthroughImageService } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    starlight({
      title: 'EFP',
      description: 'Ethereum Follow Protocol',
      favicon: '/favicon.ico',
      defaultLocale: 'en',
      lastUpdated: true,
      logo: {
        src: './src/assets/logo.png',
      },
      social: {
        github: 'https://github.com/ethereumfollowprotocol',
        twitter: 'https://twitter.com/ethfollowpr',
      },
      sidebar: [
        {
          label: 'Design Specification',
          link: '/spec',
        },
      ],
      customCss: [
        './src/styles/custom.css',
        // Fontsource files for to regular and semi-bold font weights.
        '@fontsource/inter/400.css',
        '@fontsource/inter/700.css',
        '@fontsource/ibm-plex-serif/400.css',
        '@fontsource/ibm-plex-serif/600.css',
      ],
    }),
  ],
})
