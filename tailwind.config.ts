import plugin from 'tailwindcss/plugin'
import type { Config } from 'tailwindcss'
import radixPlugin from 'tailwindcss-radix'
import animatePlugin from 'tailwindcss-animate'
import typographyPlugin from '@tailwindcss/typography'

// from https://github.com/epicweb-dev/epic-stack/blob/main/app/utils/extended-theme.ts
const extendedTheme = {
  colors: {
    border: 'hsl(var(--border))',
    input: {
      DEFAULT: 'hsl(var(--input))',
      invalid: 'hsl(var(--input-invalid))'
    },
    ring: {
      DEFAULT: 'hsl(var(--ring))',
      invalid: 'hsl(var(--foreground-danger))'
    },
    background: 'hsl(var(--background))',
    foreground: {
      DEFAULT: 'hsl(var(--foreground))',
      danger: 'hsl(var(--foreground-danger))'
    },
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))'
    },
    secondary: {
      DEFAULT: 'hsl(var(--secondary))',
      foreground: 'hsl(var(--secondary-foreground))'
    },
    destructive: {
      DEFAULT: 'hsl(var(--destructive))',
      foreground: 'hsl(var(--destructive-foreground))'
    },
    muted: {
      DEFAULT: 'hsl(var(--muted))',
      foreground: 'hsl(var(--muted-foreground))'
    },
    accent: {
      DEFAULT: 'hsl(var(--accent))',
      foreground: 'hsl(var(--accent-foreground))'
    },
    popover: {
      DEFAULT: 'hsl(var(--popover))',
      foreground: 'hsl(var(--popover-foreground))'
    },
    card: {
      DEFAULT: 'hsl(var(--card))',
      foreground: 'hsl(var(--card-foreground))'
    }
  },
  borderRadius: {
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)'
  },
  fontSize: {
    // 1rem = 16px
    /** 80px size / 84px high / bold */
    mega: ['5rem', { lineHeight: '5.25rem', fontWeight: '700' }],
    /** 56px size / 62px high / bold */
    h1: ['3.5rem', { lineHeight: '3.875rem', fontWeight: '700' }],
    /** 40px size / 48px high / bold */
    h2: ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
    /** 32px size / 36px high / bold */
    h3: ['2rem', { lineHeight: '2.25rem', fontWeight: '700' }],
    /** 28px size / 36px high / bold */
    h4: ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700' }],
    /** 24px size / 32px high / bold */
    h5: ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
    /** 16px size / 20px high / bold */
    h6: ['1rem', { lineHeight: '1.25rem', fontWeight: '700' }],

    /** 32px size / 36px high / normal */
    'body-2xl': ['2rem', { lineHeight: '2.25rem' }],
    /** 28px size / 36px high / normal */
    'body-xl': ['1.75rem', { lineHeight: '2.25rem' }],
    /** 24px size / 32px high / normal */
    'body-lg': ['1.5rem', { lineHeight: '2rem' }],
    /** 20px size / 28px high / normal */
    'body-md': ['1.25rem', { lineHeight: '1.75rem' }],
    /** 16px size / 20px high / normal */
    'body-sm': ['1rem', { lineHeight: '1.25rem' }],
    /** 14px size / 18px high / normal */
    'body-xs': ['0.875rem', { lineHeight: '1.125rem' }],
    /** 12px size / 16px high / normal */
    'body-2xs': ['0.75rem', { lineHeight: '1rem' }],

    /** 18px size / 24px high / semibold */
    caption: ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],
    /** 12px size / 16px high / bold */
    button: ['0.75rem', { lineHeight: '1rem', fontWeight: '700' }]
  },
  keyframes: {
    'accordion-down': {
      from: { height: '0' },
      to: { height: 'var(--radix-accordion-content-height)' }
    },
    'accordion-up': {
      from: { height: 'var(--radix-accordion-content-height)' },
      to: { height: '0' }
    }
  },
  animation: {
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out'
  }
} satisfies Config['theme']

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,ts,jsx,tsx,mdx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  important: true,
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      /**
       * @see https://uicolors.app/create
       */
      colors: {
        // light mode
        tremor: {
          brand: {
            faint: '#eff6ff', // blue-50
            muted: '#bfdbfe', // blue-200
            subtle: '#60a5fa', // blue-400
            DEFAULT: '#3b82f6', // blue-500
            emphasis: '#1d4ed8', // blue-700
            inverted: '#ffffff' // white
          },
          background: {
            muted: '#f9fafb', // gray-50
            subtle: '#f3f4f6', // gray-100
            DEFAULT: '#ffffff', // white
            emphasis: '#374151' // gray-700
          },
          border: {
            DEFAULT: '#e5e7eb' // gray-200
          },
          ring: {
            DEFAULT: '#e5e7eb' // gray-200
          },
          content: {
            subtle: '#9ca3af', // gray-400
            DEFAULT: '#6b7280', // gray-500
            emphasis: '#374151', // gray-700
            strong: '#111827', // gray-900
            inverted: '#ffffff' // white
          }
        },
        // dark mode
        'dark-tremor': {
          brand: {
            faint: '#0B1229', // custom
            muted: '#172554', // blue-950
            subtle: '#1e40af', // blue-800
            DEFAULT: '#3b82f6', // blue-500
            emphasis: '#60a5fa', // blue-400
            inverted: '#030712' // gray-950
          },
          background: {
            muted: '#131A2B', // custom
            subtle: '#1f2937', // gray-800
            DEFAULT: '#111827', // gray-900
            emphasis: '#d1d5db' // gray-300
          },
          border: {
            DEFAULT: '#1f2937' // gray-800
          },
          ring: {
            DEFAULT: '#1f2937' // gray-800
          },
          content: {
            subtle: '#4b5563', // gray-600
            DEFAULT: '#6b7280', // gray-500
            emphasis: '#e5e7eb', // gray-200
            strong: '#f9fafb', // gray-50
            inverted: '#000000' // black
          }
        },
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
          '950': 'hsl(112, 100%, 10%)'
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
          '950': 'hsl(0, 82%, 15%)'
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
          '950': 'hsl(23, 86%, 14%)'
        },
        ...extendedTheme.colors
      },
      boxShadow: {
        // light
        'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        // dark
        'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'dark-tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'dark-tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      },
      borderRadius: {
        'tremor-small': '0.375rem',
        'tremor-default': '0.5rem',
        'tremor-full': '9999px'
      },
      fontSize: {
        'tremor-label': ['0.75rem', {}],
        'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
        'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
        'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }]
      },
      safelist: [
        {
          pattern:
            /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
          variants: ['hover', 'ui-selected']
        },
        {
          pattern:
            /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
          variants: ['hover', 'ui-selected']
        },
        {
          pattern:
            /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
          variants: ['hover', 'ui-selected']
        },
        {
          pattern:
            /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
        },
        {
          pattern:
            /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
        },
        {
          pattern:
            /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
        }
      ],
      ...extendedTheme.borderRadius,
      ...extendedTheme.fontSize,
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-ibm-plex-mono)']
      },
      animation: {
        ...extendedTheme.animation,
        'spin-slow': 'spin 2s linear infinite'
      },
      keyframes: {
        ...extendedTheme.keyframes,
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      }
    }
  },
  plugins: [
    radixPlugin,
    animatePlugin,
    typographyPlugin,
    plugin(({ addVariant }) => {
      addVariant('radix-side-top', '&[data-side="top"]')
      addVariant('radix-side-bottom', '&[data-side="bottom"]')
    })
  ]
} satisfies Config
