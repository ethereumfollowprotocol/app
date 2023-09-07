import plugin from 'tailwindcss/plugin'
import animate from 'tailwindcss-animate'
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

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
      /**
       * @see https://uicolors.app/create
       */
      colors: {
        lime: {
          '50': 'hsl(98, 100%, 95%)',
          '100': 'hsl(99, 100%, 88%)',
          '200': 'hsl(100, 100%, 78%)',
          '300': 'hsl(102, 100%, 66%)',
          '400': 'hsl(104, 100%, 61%)',
          '500': 'hsl(106, 100%, 45%)',
          '600': 'hsl(107, 100%, 36%)',
          '700': 'hsl(107, 100%, 27%)',
          '800': 'hsl(108, 88%, 23%)',
          '900': 'hsl(109, 79%, 20%)',
          '950': 'hsl(112, 100%, 10%)',
        },
        salmon: {
          '50': 'hsl(0, 100%, 97%)',
          '100': 'hsl(0, 100%, 94%)',
          '200': 'hsl(0, 100%, 89%)',
          '300': 'hsl(0, 100%, 81%)',
          '400': 'hsl(0, 100%, 74%)',
          '500': 'hsl(0, 93%, 60%)',
          '600': 'hsl(0, 79%, 51%)',
          '700': 'hsl(0, 81%, 42%)',
          '800': 'hsl(0, 78%, 35%)',
          '900': 'hsl(0, 69%, 31%)',
          '950': 'hsl(0, 82%, 15%)',
        },
        kournikova: {
          '50': 'hsl(52, 92%, 95%)',
          '100': 'hsl(52, 100%, 88%)',
          '200': 'hsl(50, 100%, 77%)',
          '300': 'hsl(48, 100%, 70%)',
          '400': 'hsl(45, 98%, 53%)',
          '500': 'hsl(43, 95%, 47%)',
          '600': 'hsl(38, 98%, 40%)',
          '700': 'hsl(33, 94%, 33%)',
          '800': 'hsl(29, 82%, 29%)',
          '900': 'hsl(26, 74%, 26%)',
          '950': 'hsl(23, 86%, 14%)',
        },
      },
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
