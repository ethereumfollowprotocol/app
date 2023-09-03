import {
  presetUno,
  presetMini,
  defineConfig,
  presetWebFonts,
  presetTypography,
  presetAttributify,
  transformerDirectives,
} from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  theme: {
    screen: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
  },
  presets: [
    presetUno(),
    presetMini(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter:200,400,900',
        serif: 'IBM Plex Sans:100,400,700',
        mono: ['JetBrains', 'JetBrains Mono:200,400,800'],
      },
    }),
    presetAttributify(),
    presetTypography(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
