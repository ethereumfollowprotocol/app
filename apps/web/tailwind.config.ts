import plugin from 'tailwindcss/plugin'
import animate from 'tailwindcss-animate'
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
// import { radixThemePreset } from 'radix-themes-tw'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,ts,jsx,tsx,mdx}',
  ],
  important: true,
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        display: ['var(--font-sf)', 'system-ui', 'sans-serif'],
        default: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [
    animate,
    typography,
    plugin(({ addVariant }) => {
      addVariant('radix-side-top', '&[data-side="top"]')
      addVariant('radix-side-bottom', '&[data-side="bottom"]')
    }),
  ],
} satisfies Config
