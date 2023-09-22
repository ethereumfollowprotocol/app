import colors from 'tailwindcss/colors'
import type { Config } from 'tailwindcss'
import starlightPlugin from '@astrojs/starlight-tailwind'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent: {
          '50': '#fdf2f8',
          '100': '#fce7f3',
          '200': '#fbcfe8',
          '300': '#f9a8d4',
          '400': '#f472b6',
          '500': '#ec4899',
          '600': '#ff63c1',
        },
        gray: colors.zinc,
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"'],
        serif: ['"IBM Plex Mono"'],
        sans: ['"IBM Plex Mono"'],
      },
    },
  },
  plugins: [starlightPlugin()],
} satisfies Config
