// import plugin from 'tailwindcss/plugin'
// import type { Config } from 'tailwindcss'
// import TailwindThemer from 'tailwindcss-themer'
// import tailwindAnimate from 'tailwindcss-animate'
// import defaultTheme from 'tailwindcss/defaultTheme'
// import typographyPlugin from '@tailwindcss/typography'
// import aspectRatioPlugin from '@tailwindcss/aspect-ratio'
// import containerQueriesPlugin from '@tailwindcss/container-queries'

// const { colors, fontFamily, fontSize, keyframes, animation, spacing, screens } = {
//   screens: {
//     '3xl': '1850px',
//     '3xs': '390px',
//     xxs: '420px',
//     xs: '500px',
//     ...defaultTheme.screens,
//   },
//   colors: {
//     yellow: '#FFF500',
//     pink: '#FF79C9',
//     followButton: '#FFE066',
//     darkGrey: '#333333',
//     addition: '#A1F783',
//     deletion: '#FF7C7C',
//     'text-neutral': '#999999',
//   },
//   fontFamily: {
//     sans: ['inter', ...defaultTheme.fontFamily.sans],
//     // mono: ['var(--font-ibm-plex-mono)']
//   },
//   fontSize: {
//     // 1rem = 16px
//     'text-md': ['1rem', { lineHeight: '1.5rem' }],
//     /** 80px size / 84px high / bold */
//     mega: ['5rem', { lineHeight: '5.25rem', fontWeight: '700' }],
//     /** 56px size / 62px high / bold */
//     h1: ['3.5rem', { lineHeight: '3.875rem', fontWeight: '700' }],
//     /** 40px size / 48px high / bold */
//     h2: ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
//     /** 32px size / 36px high / bold */
//     h3: ['2rem', { lineHeight: '2.25rem', fontWeight: '700' }],
//     /** 28px size / 36px high / bold */
//     h4: ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700' }],
//     /** 24px size / 32px high / bold */
//     h5: ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
//     /** 16px size / 20px high / bold */
//     h6: ['1rem', { lineHeight: '1.25rem', fontWeight: '700' }],

//     /** 32px size / 36px high / normal */
//     'body-2xl': ['2rem', { lineHeight: '2.25rem' }],
//     /** 28px size / 36px high / normal */
//     'body-xl': ['1.75rem', { lineHeight: '2.25rem' }],
//     /** 24px size / 32px high / normal */
//     'body-lg': ['1.5rem', { lineHeight: '2rem' }],
//     /** 20px size / 28px high / normal */
//     'body-md': ['1.25rem', { lineHeight: '1.75rem' }],
//     /** 16px size / 20px high / normal */
//     'body-sm': ['1rem', { lineHeight: '1.25rem' }],
//     /** 14px size / 18px high / normal */
//     'body-xs': ['0.875rem', { lineHeight: '1.125rem' }],
//     /** 12px size / 16px high / normal */
//     'body-2xs': ['0.75rem', { lineHeight: '1rem' }],

//     /** 18px size / 24px high / semibold */
//     caption: ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],
//     /** 12px size / 16px high / bold */
//     button: ['0.75rem', { lineHeight: '1rem', fontWeight: '700' }],
//   },
//   keyframes: {
//     wiggle: {
//       '0%, 100%': { transform: 'rotate(-3deg)' },
//       '50%': { transform: 'rotate(3deg)' },
//     },
//     'accordion-down': {
//       from: { height: '0' },
//       to: { height: 'var(--radix-accordion-content-height)' },
//     },
//     'accordion-up': {
//       from: { height: 'var(--radix-accordion-content-height)' },
//       to: { height: '0' },
//     },
//     loading: {
//       '0%': {
//         'background-position': '200% 0',
//       },
//       '50%': {
//         'background-position': '0% 0',
//       },
//       '100%': {
//         'background-position': '-200% 0',
//       },
//     },
//     spinY: {
//       '0%': {
//         transform: 'rotateY(0deg)',
//       },
//       '100%': {
//         transform: 'rotateY(360deg)',
//       },
//     },
//   },
//   animation: {
//     'accordion-down': 'accordion-down 0.2s ease-out',
//     'accordion-up': 'accordion-up 0.2s ease-out',
//     'spin-slow': 'spin 2s linear infinite',
//     loading: 'loading 5s ease-in-out infinite',
//     'spin-y': 'spinY 5s ease-in-out infinite',
//   },
//   spacing: {
//     '68': '17rem',
//     '76': '19rem',
//     '86': '22rem',
//     '92': '24rem',
//     '100': '26rem',
//     '108': '28rem',
//     '116': '30rem',
//     '128': '32rem',
//     '144': '36rem',
//   },
// } satisfies Config['theme']

// export default {
//   content: ['./src/**/*.{js,ts,jsx,tsx}', './src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
//   darkMode: 'class',
//   important: true,
//   future: { hoverOnlyWhenSupported: true },
//   theme: {
//     screens,
//     extend: {
//       spacing,
//       colors,
//       fontSize,
//       fontFamily,
//       animation,
//       keyframes,
//     },
//   },
//   plugins: [
//     TailwindThemer({
//       themes: [
//         {
//           name: 'light',
//           extend: {
//             colors: {
//               text: '#000000',
//               neutral: '#ffffff',
//               grey: '#E4E4E7',
//               navItem: '#b4b4b4',
//             },
//           },
//         },
//         {
//           name: 'dark',
//           extend: {
//             colors: {
//               text: '#ffffff',
//               neutral: '#333333',
//               grey: '#71717A',
//               navItem: '#94a3b822',
//             },
//           },
//         },
//       ],
//     }),
//     tailwindAnimate,
//     typographyPlugin,
//     aspectRatioPlugin,
//     containerQueriesPlugin,
//     plugin(({ addVariant, addUtilities, matchUtilities, theme }) => {
//       matchUtilities(
//         { 'animation-delay': (value) => ({ 'animation-delay': value }) },
//         { values: theme('transitionDelay') }
//       )
//       addVariant('optional', '&:optional')
//       addVariant('hocus', ['&:hover', '&:focus'])
//       addVariant('inverted-colors', '@media (inverted-colors: inverted)')
//       addUtilities({
//         '.content-auto': { 'content-visibility': 'auto' },
//         '.content-hidden': { 'content-visibility': 'hidden' },
//         '.content-visible': { 'content-visibility': 'visible' },
//       })
//     }),
//     /** @type {import('tailwindcss/types/config').PluginCreator} */
//     ({ addVariant }: any) => {
//       addVariant('starting', '@starting-style')
//     },
//   ],
// } satisfies Config
