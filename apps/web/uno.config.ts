import {
  presetUno,
  presetMini,
  presetIcons,
  defineConfig,
  presetWebFonts,
  presetTypography,
  presetAttributify,
  transformerDirectives,
} from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export default defineConfig({
  rules: [
    //

  ],
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
    presetIcons({
      customizations: {
        customize: properties => {
          properties.width = '5em'
          properties.height = '5em'
          return properties
        },
      },
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography({
      selectorName: 'markdown',
      cssExtend: {
        code: { color: '#8b5cf6' },
        'a:hover': { color: '#f43f5e' },
        'a:visited': { color: '#14b8a6' },
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerAttributifyJsx(), transformerVariantGroup()],
  extendTheme: [],
})
